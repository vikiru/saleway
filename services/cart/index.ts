import morgan from "morgan";

import { env } from "./config/index";
import { logger } from "./config/logger";

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
