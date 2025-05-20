import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { body } from "express-validator";
import { env } from "@/config/index";
import { logger } from "@/config/logger";

const morganStream = {
  write: (message: any) => logger.http(message),
};

const skip = () => {
  return env.NODE_ENV !== "development";
};

const morganMiddleware = morgan("dev", {
  stream: morganStream,
  skip,
});

export { body, cors, helmet, morganMiddleware as morgan, compression };
