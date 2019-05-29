import { Request, Response } from "express-serve-static-core";

import * as _ from "lodash";
import { sql } from "../../sql";

export default {
  async getProfile(req: Request, res: Response) {
    const user = _.get(req, "user");
    sql.query(
      "SELECT username, email, first_name, last_name, profile_picture_url FROM user WHERE username = ?",
      [user.username],
      (error, results, fields) => {
        if (error) {
          return res.status(500).send({ error: error.message });
        }
        if (results.length === 0) {
          return res.sendStatus(401);
        }
        const userResult = results[0];
        res.status(200).send(userResult);
      }
    );
  },
  async updateProfile(req: Request, res: Response) {
    const user = _.get(req, "user");

    const { email, first_name, last_name, profile_picture_url } = req.body;

    if (!email) {
      return res.status(400).send({ error: "Email is missing!" });
    }
    // TODO: validate email format

    if (!first_name) {
      return res.status(400).send({ error: "First name is missing!" });
    }
    if (!last_name) {
      return res.status(400).send({ error: "Last name is missing!" });
    }

    sql.query(
      "UPDATE user SET email=?, first_name=?, last_name=?, profile_picture_url=? WHERE username=?",
      [email, first_name, last_name, profile_picture_url, user.username],
      (error, results, fields) => {
        if (error) {
          return res.status(500).send({ error: error.message });
        }
        return res.sendStatus(200);
      }
    );
  }
};
