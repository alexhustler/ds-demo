import AWS from "aws-sdk";
import express from "express";

import config from "../../config";
import {
  catchEndpointErrors,
  createUserProfileImageS3Path,
  createUserLogoImageS3Path,
  requireAuthentication,
} from "./common";
import { User } from "../models";
import { BadRequestErrors } from "../common/errors";

const s3 = new AWS.S3({
  accessKeyId: config.aws.accessKeyId,
  secretAccessKey: config.aws.secretAccessKey,
});

const usersRouter = express.Router();

usersRouter.put(
  "/",
  requireAuthentication,
  catchEndpointErrors(async (request, response) => {
    const { userId } = request.body;

    if (request.user.id !== userId) {
      response
        .status(401)
        .send({ message: "user is not authorized to edit user settings" });
      return;
    }
    const user = await User.updateUserSettings(request.user.id);
    response.send(User.sanitize(user));
  })
);

/**
 * Generates presigned s3 url that the frontend uses to upload files+
 */
usersRouter.post(
  "/s3-url",
  requireAuthentication,
  catchEndpointErrors(async (request, response) => {
    const { user } = request;
    const { fileName, fileType } = request.body;
    const filePurpose:
      | "directMailTemplateBackgroundImage"
      | "userAutoDialerRecording"
      | "userLogoImage"
      | "userProfileImage" = request.body.filePurpose;
    if (!fileName || !fileType || !filePurpose) {
      throw new BadRequestErrors.MissingFields(
        "missing fileName or fileType or filePurpose"
      );
    }

    const key =
      filePurpose === "userLogoImage"
        ? createUserLogoImageS3Path(user.id, fileName)
        : filePurpose === "userProfileImage"
        ? createUserProfileImageS3Path(user.id, fileName)
        : "";

    if (!key) {
      throw new BadRequestErrors.MissingFields("missing filePurpose");
    }

    const url = s3.getSignedUrl("putObject", {
      Bucket: config.aws.s3BucketName,
      Key: key,
      ContentType: fileType,
      Expires: 60, // seconds
      ACL: "public-read",
    });

    response.send({ url });
  })
);

export default usersRouter;
