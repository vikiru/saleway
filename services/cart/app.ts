import express from 'express';

import { apiVersionString, env } from '@/config/index';
import { logger } from '@/config/logger';
import CartRouter from '@/routes/index';

import * as middlewares from './middlewares/index';

const app = express();

app.use(middlewares.helmet());
app.use(
  middlewares.cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  })
);
app.use(middlewares.compression());
app.use(middlewares.morgan);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('trust proxy', env.NODE_ENV === 'production' ? 1 : 0);
app.use(`/api/${apiVersionString}`, CartRouter);

app.listen(env.PORT, () => {
  logger.info(`Cart Service running on http://localhost:${env.PORT}/api/${apiVersionString}`);
});

// TODO: Add data dupe similar to orders service to cart service for products, cleanup any routes
