import mysql, { Connection } from "mysql";
import { SQL_DB, SQL_USERNAME, SQL_HOST, SQL_PASSWORD } from "../env";

export let sql: Connection;

export async function initSQL() {
  console.log(SQL_DB)
  const connection = await mysql.createConnection({
    host: SQL_HOST,
    user: SQL_USERNAME,
    password: SQL_PASSWORD,
    database: SQL_DB
  });
  sql = connection;
  return connection;
}


