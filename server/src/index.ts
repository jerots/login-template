import express from "express";
import { initSQL, sql } from "./models/sql";


import * as _ from "lodash";
import bodyParser = require("body-parser");
import { PORT } from "./env";
import authController from "./controllers/auth";
import profileController from "./controllers/profile";
import { handleOptions } from "./middlewares/handleOptions";
import { verifyToken } from "./middlewares/verifyToken";
import { cors } from "./middlewares/cors";

async function main() {
  await initSQL();
  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors);
  app.options("/*", handleOptions);
  app.post("/login", bodyParser.json(), authController.login);

  // middleware to check token
  app.use(verifyToken);

  app.get("/profile", profileController.getProfile);

  app.post("/update_profile", profileController.updateProfile);

  app.get("/", function(req, res) {
    res.sendStatus(200);
  });

  app.listen(PORT);
  console.log(`Server listening on port ${PORT}`);
}

main();
