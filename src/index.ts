import http from 'http';
import app from './app';
import { connectToDatabase } from './utils/mongo';
import logger from './utils/logger';
import Config from './config';

connectToDatabase().then(() => {
    const server = http.createServer(app);
    server.listen(Config.APP_PORT, () => {
        logger.info(`Started at port ${Config.APP_PORT} in ${Config.NODE_ENV} environment...`);
    });
}).catch((err) => {
    console.log(err)
    logger.info('Shutting off as coulnd\'t connect to DB.');
});

