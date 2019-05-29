import express from "express";
import { initSQL, sql } from "./sql";

import jwt from "jsonwebtoken";

import * as _ from "lodash";
import bodyParser = require("body-parser");
import { Connection } from "mysql";
import { JWT_SECRET } from "./env";



const PORT = 5000;




async function main() {


  await initSQL();
  const app = express();
  app.use(bodyParser.json());
  app.post("/login", );

  // middleware to check token
  app.use(function(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, JWT_SECRET, function(err, payload) {
        if (err){
          return res.status(401).send({error: err.message});
        }
        if (!payload) {
          return res.sendStatus(401);
        }
        if (payload) {
          sql.query(
            "SELECT * FROM user WHERE username = ?",
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
  });

  app.get("/profile", async function(req, res) {
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
  });

  app.post("/update_profile", async function(req, res) {
    const user = _.get(req, "user");

    const { email, first_name, last_name, profile_picture_url } = req.body;

    if (!email){
      return res.status(400).send({error: "Email is missing!"});
    }
    // TODO: validate email format
    
    if (!first_name){
      return res.status(400).send({error: "First name is missing!"});
    }
    if (!last_name){
      return res.status(400).send({error: "Last name is missing!"});
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
  });

  app.get("/", function(req, res) {
    res.sendStatus(200);
  });

  app.listen(PORT);
  console.log(`Server listening on port ${PORT}`);
}

main();
