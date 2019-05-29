require("dotenv").config();
import * as env from 'env-var';
export const SQL_DB: string = env.get('SQL_DB').required().asString();
export const SQL_USERNAME: string = env.get('SQL_USERNAME').required().asString();
export const SQL_PASSWORD: string = env.get('SQL_PASSWORD').required().asString();
export const SQL_HOST: string = env.get('SQL_HOST').required().asString();
export const JWT_SECRET: string = env.get('JWT_SECRET').required().asString();
export const PORT: number = env.get('PORT').required().asInt();


