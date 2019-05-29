import * as env from 'env-var';


export const SQL_DB: string = env.get('SQL_BB').required().toString();
export const SQL_USERNAME: string = env.get('SQL_USERNAME').required().toString();
export const SQL_PASSWORD: string = env.get('SQL_PASSWORD').required().toString();
export const SQL_HOST: string = env.get('SQL_HOST').required().toString();
export const JWT_SECRET: string = env.get('JWT_SECRET').required().toString();


