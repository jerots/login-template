import { Request, Response } from "express-serve-static-core";
import { NextFunction } from "connect";
import { JWT_SECRET } from "../env";

import jwt from "jsonwebtoken";
import { sql } from "../models/sql";

export const verifyToken = function(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.sendStatus(401);
    }
    const token = authorization.split(" ")[1];
    jwt.verify(token, JWT_SECRET, function(err, payload)  {
      if (err) {
        return res.status(401).send({ error: err.message });
      }
      if (!payload || typeof payload === "string") {
        return res.sendStatus(401);
      }
      if (payload) {
        sql.query(
          "SELECT * FROM user WHERE username = ?",
          // @ts-ignore
          [payload.username],
          (error, results, fields) => {
            if (error) {
              return res.status(500).send({ error: error.message });
            }
            if (results.length === 0) {
              return res.sendStatus(401);
            }
            Object.assign(req, { user: payload });
            next();
          }
        );
      }
    });
  } catch (e) {
    res.sendStatus(401);
  }
};
