import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const dataSource = new DataSource({
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  migrations: [__dirname + "/migrations/*.ts"],
  entities: [__dirname + "/models/*.{js,ts}"],
  type: "mssql",
  synchronize: false,
});

export default dataSource;
