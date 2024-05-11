import { config } from 'dotenv';
config();

export const settings = {
  PORT: process.env.PORT as string | 3000,
  DB_URI: process.env.DB_URI as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
};
