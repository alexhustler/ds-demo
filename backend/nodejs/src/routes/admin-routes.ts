import express from "express";

import { AppState, User } from "../models";
import { catchEndpointErrors, requireAuthentication } from "./common";
import { BadRequestErrors, ResourceNotFoundErrors } from "../common/errors";

const adminRouter = express.Router();

adminRouter.get("/users", requireAuthentication, async (req, res) => {
  const users = await User.findAll({});
  res.json(
    users.map((user: any) => ({
      id: user.id,
      isAdmin: user.isAdmin,
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.emailAddress,
    }))
  );
});

adminRouter.put(
  "/user",
  requireAuthentication,
  catchEndpointErrors(async (req, res) => {
    const { updatedUserForm } = req.body;
    const userId = req.user.id;

    if (!updatedUserForm || !updatedUserForm.id) {
      throw new BadRequestErrors.MissingFields("missing id for edited user");
    }

    const userToUpdate = await User.findById(updatedUserForm.id);

    if (!userToUpdate) {
      throw new ResourceNotFoundErrors.UserNotFound();
    }

    if (
      userId === updatedUserForm.id &&
      updatedUserForm.isAdmin !== userToUpdate.isAdmin
    ) {
      throw new Error(
        "User is not allowed to change its own Admin permissions"
      );
    }

    const updatedUser = await User.updateUserForAdmin(
      userToUpdate,
      updatedUserForm
    );

    res.send({ updatedUser });
  })
);

adminRouter.get(
  "/app-states",
  requireAuthentication,
  catchEndpointErrors(async (_, res) => {
    const appStates = await AppState.loadAllAppStates();
    res.send(appStates);
  })
);

export default adminRouter;
