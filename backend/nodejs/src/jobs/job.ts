import { createRandomString } from "../common/utils";
import logger from "../logger";

export const runJob = async () => {
  const jobId = createRandomString();
  try {
    //
  } catch (error) {
    logger.error(`Job error runJob ${jobId}:`, error);
  }
};
