import { Request, Response, NextFunction } from "express";

import logger from "../logger";
import { User } from "../models";
import { DemoCoreError } from "../common/errors";

export const createUserLogoImageS3Path = (userId: number, fileName: string) =>
  `logos/user-${userId}/${fileName
    .trim()
    .split(" ")
    .join("_")}`;

export const createUserProfileImageS3Path = (
  userId: number,
  fileName: string
) =>
  `profile-images/user-${userId}/${fileName
    .trim()
    .split(" ")
    .join("_")}`;

export const parseIpAddress = (request: Request) =>
  request.headers["x-forwarded-for"] ||
  request.headers["X-Forwarded-For"] ||
  request.connection.remoteAddress;

export function catchEndpointErrors(
  endpointHandler: (
    request: Request,
    response: Response,
    next: NextFunction
  ) => Promise<any> | any
) {
  return async function(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      await endpointHandler(request, response, next);
    } catch (error) {
      if (error instanceof DemoCoreError) {
        response
          .status(error.httpErrorStatusCode)
          .send({ message: error.httpErrorMessage });
        return;
      }
      console.error(error);
      response
        .status(500)
        .send({ message: "Internal server error. Please try again." });
      return;
    }
  };
}

export const handleAuthentication = async (
  request: Request,
  response: Response
) => {
  const { user } = request;
  if (!user) {
    request.logout();
    return returnUnauthorizedError(response);
  }

  response.send(User.sanitize(user));
};

export const isValidPassword = (password: string) => {
  const minPasswordLength = 4;
  return password && password.length >= minPasswordLength;
};

export const isValidEmailAddress = (emailAddress: string) => {
  const minEmailLength = 3;
  return emailAddress && emailAddress.length >= minEmailLength;
};

export const isValidCredentials = (emailAddress: string, password: string) => {
  return isValidEmailAddress(emailAddress) && isValidPassword(password);
};

export const sendInternalServerErrorResponse = (
  response: Response,
  error: any
) => {
  logger.error(error);
  response.status(500).send({ message: "internal server error" });
};

export const returnUnauthorizedError = (response: Response) =>
  response.status(401).send({ message: "Not authorized" });

// auth check middleware
export const requireAuthentication = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (!request.user) {
    return returnUnauthorizedError(response);
  }

  next();
};
