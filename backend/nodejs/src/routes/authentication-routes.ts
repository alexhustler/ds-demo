import express from "express";
import passport from "passport";

import logger from "../logger";
import { User } from "../models";
import {
  catchEndpointErrors,
  handleAuthentication,
  requireAuthentication,
  returnUnauthorizedError,
} from "./common";

const authenticationRouter = express.Router();

authenticationRouter.post(
  "/logout",
  catchEndpointErrors((req, res) => {
    req.logout();
    res.send({ message: "success" });
  })
);

authenticationRouter.post("/validate", handleAuthentication);

authenticationRouter.post(
  "/login",
  passport.authenticate("local"),
  handleAuthentication
);

authenticationRouter.put(
  "/password",
  requireAuthentication,
  catchEndpointErrors(async (req, res) => {
    const { userId, currentPassword, newPassword } = req.body;
    if (userId !== req.user.id) {
      return returnUnauthorizedError(res);
    }
    // valid current passwoard
    const isValidPassword = await User.comparePassword(
      currentPassword,
      req.user.password
    );
    if (!isValidPassword) {
      return returnUnauthorizedError(res);
    }

    await User.updatePassword(userId, newPassword);
    res.send({ message: "Success" });
  })
);

authenticationRouter.post(
  "/register",
  requireAuthentication,
  catchEndpointErrors(async (req, res, next) => {
    const { emailAddress, password, firstName, lastName } = req.body;

    if (!emailAddress || !password || !firstName || !lastName) {
      logger.error("Invalid registration: ", emailAddress, firstName, lastName);
      res.status(400).send("missing parameters");
      return;
    }

    // insert new user
    await User.insertUser(emailAddress, password, firstName, lastName);

    next();
  }),
  passport.authenticate("local"),
  handleAuthentication
);

export default authenticationRouter;
