import bcrypt from "bcrypt";
import Sequelize from "sequelize";
import _ from "lodash";

import { isDefined } from "../common/utils";
import { UserInterface } from "../common/interfaces";

const db = require("../db");

const saltRounds = 10;

const normalizeEmailAddress = (emailAddress: string): string =>
  emailAddress.toLowerCase();

const User = db.sequelize.define(
  "user",
  {
    id: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    isAdmin: {
      defaultValue: false,
      type: Sequelize.BOOLEAN,
    },
    firstName: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    lastName: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    emailAddress: {
      // unique
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    deletedAt: {
      allowNull: true,
      type: Sequelize.DATE,
    },
  },

  { paranoid: true }
);

const sanitize = (user: typeof User) => {
  user.password = null;
  return user;
};

const findByEmailAddress = (emailAddress: string): any => {
  return User.findOne({
    where: { emailAddress: normalizeEmailAddress(emailAddress) },
  });
};

const findById = (id: string): any => {
  return User.findOne({
    where: { id },
  });
};

const hashPassword = (plainTextPassword: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(plainTextPassword, saltRounds, (err: any, hash: string) => {
      if (err) {
        return reject(err);
      }
      resolve(hash);
    });
  });
};

const insertUser = async (
  emailAddress: string,
  password: string,
  firstName: string,
  lastName: string
): Promise<UserInterface> => {
  const hashedPassword: string = await hashPassword(password);
  return User.create({
    firstName,
    lastName,
    emailAddress: normalizeEmailAddress(emailAddress),
    password: hashedPassword,
    isAdmin: false,
  });
};

const comparePassword = (
  plaintextPassword: string,
  hash: string
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plaintextPassword, hash, (err: any, res: boolean) => {
      if (err) {
        return reject(err);
      }
      resolve(res);
    });
  });
};

const updateUserForAdmin = async (user: any, updatedUserForm: any) => {
  const {
    isAdmin,
    firstName,
    lastName,
    emailAddress,
    newPassword,
    confirmNewPassword,
  } = updatedUserForm;

  if (newPassword && confirmNewPassword && newPassword === confirmNewPassword) {
    const hashedPassword: string = await hashPassword(newPassword);
    user.password = hashedPassword;
  }

  if (isDefined(isAdmin)) user.isAdmin = isAdmin;
  if (isDefined(firstName)) user.firstName = firstName;
  if (isDefined(lastName)) user.lastName = lastName;
  if (isDefined(emailAddress)) user.emailAddress = emailAddress;

  await user.save();
  return user;
};

User.insertUser = insertUser;
User.findByEmailAddress = findByEmailAddress;
User.findById = findById;
User.comparePassword = comparePassword;
User.sanitize = sanitize;
User.updateUserForAdmin = updateUserForAdmin;

export default User;
