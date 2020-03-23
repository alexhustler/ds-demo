import express from "express";
import passport from "passport";
import morgan from "morgan";
import path from "path";

const LocalStrategy = require("passport-local").Strategy;

import logger from "../logger";
import config from "../../config";
import { UserInterface } from "../common/interfaces";
import { AppState, User } from "../models";

import { adminRouter, authenticationRouter, usersRouter } from "../routes";

const { port, sessionSecret } = config.server;

const pathToClientBuild =
  config.nodeEnv === "local"
    ? "../../../web-client/build"
    : "../../../../web-client/build";
const webClientPublicDir: string = path.join(__dirname, pathToClientBuild);
const server: express.Application = express();

/* Redirect http to https */
server.get("*", (req, res, next) => {
  if (
    config.nodeEnv !== "local" &&
    req.headers["x-forwarded-proto"] !== "https"
  ) {
    res.redirect("https://" + req.hostname + req.url);
  } else {
    next(); /* Continue to other routes if we're not redirecting */
  }
});

// middlewares
server.use(require("cookie-parser")());

server.use(express.static(webClientPublicDir));
// limit tweaked to 10mb to account for large datasets import. See:
// https://gist.github.com/Maqsim/857a14a4909607be13d6810540d1b04f
server.use(
  require("body-parser").urlencoded({ extended: true, limit: "10mb" })
);
server.use(express.json({ limit: "10mb" }));
server.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

// session middleware
server.use(
  require("express-session")({
    secret: sessionSecret,
    resave: true,
    saveUninitialized: true,
    // cookie: { secure: true },
  })
);

// set up passport
server.use(passport.initialize());
server.use(passport.session());

passport.use(
  new LocalStrategy(
    { usernameField: "emailAddress", passwordField: "password" },
    (emailAddress: string, password: string, cb: Function) => {
      User.findByEmailAddress(emailAddress)
        .then((user: UserInterface) => {
          if (!user) {
            return cb(null, false);
          }
          return User.comparePassword(password, user.password).then(
            (success: boolean) => {
              if (!success) {
                return cb(null, false);
              }
              return cb(null, user);
            }
          );
        })
        .catch((err: Error) => {
          return cb(err);
        });
    }
  )
);

passport.serializeUser((user: UserInterface, cb: Function) => {
  cb(null, user.id);
});

passport.deserializeUser((id: string, cb) => {
  User.findById(id)
    .then((user: UserInterface) => {
      cb(null, user);
    })
    .catch((error: Error) => {
      return cb(error);
    });
});

// routes
const apiEndpoint = "/api";
server.use(`${apiEndpoint}/admin`, adminRouter);
server.use(`${apiEndpoint}/authentication`, authenticationRouter);
server.use(`${apiEndpoint}/users`, usersRouter);

// bootstrap
const bootStrapApp = async () => {
  logger.info("bootstrapping app...");
  await Promise.all([AppState.initializeWorkerProcessLock()]);
};

// catch-all route
server.get("*", (req, res) => {
  const indexPath = webClientPublicDir;
  res.sendFile(path.join(indexPath, "index.html"));
});

// start server
server.listen(port, async () => {
  await bootStrapApp();
  logger.info(`Demo api is listening on port ${port}!`);
});
