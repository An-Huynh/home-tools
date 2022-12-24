import { Request, Response, NextFunction } from "express";
import { Home } from "../../db/models/home.model";
import dataSource from "../../db/data-source";

const homeRepository = dataSource.getRepository(Home);

export async function getHomes(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.user?.id !== req.query.ownerId) {
      return next({
        status: 401,
        message: `Client does not have permission to access homes with ownerId "${req.query.ownerId}"`,
      });
    }

    // Here to avoid typescript messages about possible undefined
    // field. Validator should ensure page/take fields
    // are properly set. Maybe find another way than doing this?
    const page: number = req.query.page ? +req.query.page : 1;
    const pageSize: number = req.query.pageSize ? +req.query.pageSize : 1;

    const [homes, count] = await homeRepository.findAndCount({
      order: {
        name: "DESC",
      },
      select: ["id", "name", "ownerId"],
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return res.status(200).json({
      homes,
      count,
      page,
      pageSize,
      pages: Math.ceil(count / page),
    });
  } catch (err) {
    return next(err);
  }
}

export async function addHome(req: Request, res: Response, next: NextFunction) {
  try {
    if (req.user?.id !== req.body.ownerId) {
      return next({
        status: 401,
        message: `Client does not have permission to create a home with ownerId "${req.body.ownerId}"`,
      });
    }

    const home = new Home();
    home.name = req.body.name;
    home.ownerId = req.body.ownerId;

    const { createdAt, updatedAt, ...createdHome } =
      await homeRepository.manager.save(home);
    return res.status(201).json(createdHome);
  } catch (err) {
    return next(err);
  }
}
