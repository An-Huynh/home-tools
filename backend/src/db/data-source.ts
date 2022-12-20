import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const dataSource = new DataSource({
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  migrations: [],
  type: "mssql",
  entities: [],
});

export default dataSource;
