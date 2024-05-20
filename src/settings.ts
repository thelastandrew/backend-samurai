import { config } from 'dotenv';
config();

export const settings = {
  PORT: process.env.PORT as string | 3000,
  DB_URI: process.env.DB_URI as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
  EMAIL_ADDRESS: process.env.EMAIL_ADDRESS as string,
  EMAIL_PASS: process.env.EMAIL_PASS as string,
};
