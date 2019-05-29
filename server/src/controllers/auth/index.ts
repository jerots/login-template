import { Request, Response } from "express-serve-static-core";
import { sql } from "../../sql";

import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../env";


export default {

    async function(req: Request, res: Response) {
        const { username, password } = req.body;
        if (!username) {
          return res.status(400).send({ error: "Missing username parameter" });
        }
        if (!password) {
          return res.status(400).send({ error: "Missing password parameter" });
        }
        sql.query(
          "SELECT * FROM user WHERE username = ?",
          [username],
          (error, results, fields) => {
            if (error) {
              return res.status(500).send({ error: error.message });
            }
            if (results.length === 0) {
              return res.status(401).send({ error: "Invalid username/password" });
            }
    
            const user = results[0];
            // TODO: compare hashed passwords
            if (password !== user.password) {
              return res.status(401).send({ error: "Invalid username/password" });
            }
    
            const token = jwt.sign(
              {
                username: user.username,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
              },
              JWT_SECRET
            );
            return res.status(200).send({ token });
          }
        );
      }


}