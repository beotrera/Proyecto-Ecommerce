import mongoose, { ConnectionOptions } from 'mongoose';
import logger from '../logger';
import Config from '../../config';

export async function connectToDatabase(): Promise<typeof mongoose | null> {
    const opts: ConnectionOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        ignoreUndefined: true,
    };
    const mongooseConnection = await mongoose.connect(Config.MONGO_DB_URI as string, opts);
    if (!mongooseConnection.connection) {
        logger.error('Couldn\'t connect to mongo');
        return null;
    }
    return mongooseConnection;
}

export default mongoose;
