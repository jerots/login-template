import { Request, Response } from "express-serve-static-core";

import * as _ from "lodash";
import { sql } from "../../models/sql";
import { getUser, updateUser } from "../../models/user";

export default {
  async getProfile(req: Request, res: Response) {
    const { username } = _.get(req, "user");
    if (!username) {
      return res.status(400).send({ error: "Missing username" });
    }
    const user = await getUser(username);
    if (!user) {
      return res.sendStatus(401);
    }
    res.status(200).send(user);
  },
  async updateProfile(req: Request, res: Response) {
    const { username } = _.get(req, "user");
    if (!username){
      res.sendStatus(401);
    }

    const { email, first_name, last_name, profile_picture_url } = req.body;

    if (!email || typeof email !== "string") {
      return res.status(400).send({ error: "Email is missing/invalid!" });
      // TODO: validate email format
    }

    if (!first_name || typeof first_name !== "string") {
      return res.status(400).send({ error: "First name is missing!" });
    }
    if (!last_name || typeof last_name !== "string") {
      return res.status(400).send({ error: "Last name is missing!" });
    }
    if (profile_picture_url && typeof profile_picture_url !== "string") {
      return res.status(400).send({ error: "Profile picture is invalid!" });
      // TODO: validate profile picture url
    }
    const user = {
      username,
      email,
      firstName: first_name,
      lastName: last_name,
      profilePictureURL: profile_picture_url
    };
    await updateUser(user);

  }
};
