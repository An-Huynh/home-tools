import { Request, Response, NextFunction } from "express";
import { Home } from "../../db/models/home.model";
import dataSource from "../../db/data-source";
import { Not } from "typeorm";

const homeRepository = dataSource.getRepository(Home);

export async function getHomes(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.user?.id !== req.query.ownerId) {
      return next({
        status: 403,
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
        status: 403,
        message: `Client does not have permission to create a home with ownerId "${req.body.ownerId}"`,
      });
    }

    const existingHome = await homeRepository.exist({
      where: {
        name: req.body.name,
        ownerId: req.body.ownerId,
      },
    });
    if (existingHome) {
      return next({
        status: 400,
        message: `Home with name "${req.body.name}" and ownerId "${req.body.ownerId}" already exists.`,
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

export async function deleteHome(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const home = await homeRepository.findOneBy({
      id: req.params.id,
    });

    if (!home) {
      return res.status(404).json({
        message: `Home with id "${req.params.id}" cannot be deleted because it does not exist.`,
      });
    }

    if (home.ownerId !== req.user?.id) {
      return res.status(403).json({
        message: `Client does not have permission to delete home with id "${req.params.id}".`,
      });
    }

    await homeRepository.remove(home);

    return res.sendStatus(204);
  } catch (err) {
    return next(err);
  }
}

export async function updateHome(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const home = await homeRepository.findOneBy({
      id: req.params.id,
    });

    if (!home) {
      return res.status(404).json({
        message: `Home with id "${req.params.id}" does not exist.`,
      });
    }

    if (home.ownerId !== req.user?.id) {
      console.log(`${home.ownerId} - ${req.user?.id}`);
      console.log(JSON.stringify(req.user));
      return res.status(403).json({
        message: `Client does not have permission to modify home with id "${home.id}"`,
      });
    }

    // Return error if the request is to change the owner.
    // Eventually, we'll support changing the other to someone
    // else with their permission but that'll come later.
    if (req.body.ownerId !== req.user?.id) {
      return res.status(403).json({
        message: `Client does not have permission to change owner of Home "${home.name}".`,
      });
    }

    const existingHome = await homeRepository.exist({
      where: {
        id: Not(req.params.id),
        name: req.body.name,
        ownerId: req.body.ownerId,
      },
    });
    if (existingHome) {
      return next({
        status: 400,
        message: `Home with name "${req.body.name}" and ownerId "${req.body.ownerId}" already exists.`,
      });
    }

    home.name = req.body.name;

    const { updatedAt, createdAt, ...updatedHome } = await homeRepository.save(home);

    return res.status(200).json(updatedHome);
  } catch (err) {
    return next(err);
  }
}
