import axios from "axios";
import { readFileSync } from "fs";

import { env } from "./envValidator"; // import env

interface OriginalUser {
  id: string;
  first_name: string;
  last_name: string;
  email_addresses: { email_address: string }[];
}

interface ClerkUser {
  external_id: string;
  first_name: string;
  last_name: string;
  email_address: string[];
}

const transformUser = (user: OriginalUser): ClerkUser => {
  return {
    external_id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email_address: user.email_addresses.map((email) => email.email_address), // Assuming all emails need to be migrated
  };
};

const createUsers = async (users: OriginalUser[]) => {
  const axiosInstance = axios.create({
    baseURL: env.CLERK_BASE_URL,
    headers: {
      Authorization: `Bearer ${env.CLERK_API_KEY}`,
      "Content-Type": "application/json",
    },
  });

  for (const user of users) {
    const transformedUser = transformUser(user);

    try {
      await axiosInstance.post("/v1/users", transformedUser);
      console.log(`User created: ${user.id}`);
      await new Promise((resolve) =>
        setTimeout(resolve, env.RATE_LIMIT_PAUSE_MS / 20)
      ); // Respect rate limit
    } catch (error) {
      if (error instanceof Error) {
        // This checks if it's a standard JavaScript Error object
        console.error(`Error creating user ${user.id}:`, error.message);
      } else if (axios.isAxiosError(error)) {
        // This checks if it's an AxiosError, which has the 'response' property
        console.error(
          `Error creating user ${user.id}:`,
          error.response?.data || "Axios error without response data"
        );
      } else {
        // Fallback for any other types of errors
        console.error(
          `Error creating user ${user.id}:`,
          "An unexpected error occurred"
        );
      }
    }
  }
};

// Reads 'users.json' from the root directory
const usersData: OriginalUser[] = JSON.parse(
  readFileSync("./users.json", "utf-8")
);
createUsers(usersData).then(() =>
  console.log("User creation process completed.")
);
