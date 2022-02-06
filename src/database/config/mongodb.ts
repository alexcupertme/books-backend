const isDev = process.env.NODE_ENV == 'development';
export const MongoDBConfig = {
  host: isDev ? process.env.MONGODB_HOST_DEV : process.env.MONGODB_HOST,
  port: process.env.MONGODB_PORT,

  username: isDev
    ? process.env.MONGODB_USERNAME_DEV
    : process.env.MONGODB_USERNAME,
  password: isDev
    ? process.env.MONGODB_PASSWORD_DEV
    : process.env.MONGODB_PASSWORD,
  database: isDev ? process.env.DATABASE_NAME_DEV : process.env.DATABASE_NAME,
};
