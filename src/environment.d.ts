declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';

      SERVER_PORT: string;
      SERVER_TIMEOUT: string;

      MONGODB_PORT: string;

      MONGODB_HOST: string;
      MONGODB_USERNAME: string;
      MONGODB_PASSWORD: string;
      DATABASE_NAME: string;

      MONGODB_HOST_DEV: string;
      MONGODB_USERNAME_DEV: string;
      MONGODB_PASSWORD_DEV: string;
      DATABASE_NAME_DEV: string;

      MONGODB_CONNECTION_TIMEOUT: string;

      JWT_SECRET_KEY: string;
      JWT_EXPIRES_IN: string;
    }
  }
}
export {};
