import { runJob } from "../jobs";
import { AppState } from "../models";
import logger from "../logger";

const jobFrequencyMs = 23 * 1000;

const main = async () => {
  logger.info("Starting worker process");

  // processing incoming confirmation codes
  setInterval(async () => {
    const isWorkerProcessLocked = await AppState.isWorkerProcessLocked();
    if (isWorkerProcessLocked) {
      return;
    }
    runJob();
  }, jobFrequencyMs);
};

logger.info("Starting worker");
main();
