import { Request, Response } from "express-serve-static-core";
import { NextFunction } from "connect";

export const cors = (req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
};
