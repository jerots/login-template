import mysql from "mysql";


export async function initSQL() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "logintemplate"
  });
  return connection;
}


