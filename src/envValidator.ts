import { config } from 'dotenv';

config();

interface Env {
  CLERK_API_KEY: string;
  CLERK_BASE_URL: string;
  RATE_LIMIT_PAUSE_MS: number;
}

const validateEnv = (): Env => {
  const { CLERK_API_KEY, CLERK_BASE_URL, RATE_LIMIT_PAUSE_MS } = process.env;

  if (!CLERK_API_KEY || !CLERK_BASE_URL || !RATE_LIMIT_PAUSE_MS) {
    throw new Error("Missing required environment variables. Please check your .env file.");
  }

  return {
    CLERK_API_KEY,
    CLERK_BASE_URL,
    RATE_LIMIT_PAUSE_MS: parseInt(RATE_LIMIT_PAUSE_MS, 10),
  };
};

export const env = validateEnv();
