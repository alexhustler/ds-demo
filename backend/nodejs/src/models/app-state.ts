import Sequelize from "sequelize";

const db = require("../db");

const workerProcessLockKey = "worker-process-lock";
const defaultUserIdKey = "default-user-id";

const AppState = db.sequelize.define("app_state", {
  id: {
    type: Sequelize.BIGINT,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  key: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  value: {
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
});

const trueString = "true";
const falseString = "false";

const loadAllAppStates = async () => {
  const appStates = await AppState.findAll({ where: {} });
  return appStates.map((appState: typeof AppState) => {
    if (appState.value === trueString) {
      appState.value = true;
    } else if (appState.value === falseString) {
      appState.value = false;
    }
    return appState;
  });
};

const initializeWorkerProcessLock = async () => {
  const lockRow = await AppState.findOne({
    where: { key: workerProcessLockKey },
  });
  if (!lockRow) {
    await AppState.create({ key: workerProcessLockKey, value: falseString });
  }
};

const lockWorkerProcess = async (): Promise<void> => {
  await AppState.update(
    { value: trueString },
    { where: { key: workerProcessLockKey } }
  );
};

const unlockWorkerProcess = async (): Promise<void> => {
  await AppState.update(
    { value: falseString },
    { where: { key: workerProcessLockKey } }
  );
};

const isWorkerProcessLocked = async (): Promise<boolean> => {
  const lock = await AppState.findOne({
    where: { key: workerProcessLockKey },
  });
  return lock && lock.value === trueString;
};

AppState.loadAllAppStates = loadAllAppStates;
AppState.lockWorkerProcess = lockWorkerProcess;
AppState.isWorkerProcessLocked = isWorkerProcessLocked;
AppState.initializeWorkerProcessLock = initializeWorkerProcessLock;
AppState.unlockWorkerProcess = unlockWorkerProcess;

export default AppState;
