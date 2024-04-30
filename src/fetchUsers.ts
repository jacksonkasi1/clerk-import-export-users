import axios from 'axios';
import { writeFile } from 'fs/promises';
import { env } from './envValidator'; // Import environment variables validator

interface ClerkApiResponse {
  id: string;
  first_name: string;
  last_name: string;
  email_addresses: { email_address: string }[];
  last_active_at: number; // Unix timestamp in milliseconds
}

interface ProcessedUser {
  first_name: string;
  last_name: string;
  email: string;
  last_active_at: string;
}

const formatDate = (timestamp: number): string => {
  return new Date(timestamp).toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  });
};

const processUserData = (users: ClerkApiResponse[]): ProcessedUser[] => {
  return users.map(user => ({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email_addresses[0]?.email_address, // Assumes the first email is the primary email
    last_active_at: formatDate(user.last_active_at)
  }));
};

const fetchUsers = async (): Promise<ClerkApiResponse[]> => {
  try {
    const response = await axios.get(env.CLERK_BASE_URL + '/v1/users', {
      headers: {
        Authorization: `Bearer ${env.CLERK_API_KEY}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return [];
  }
};

const saveUsersToFile = async (users: ProcessedUser[]) => {
  try {
    await writeFile('./users.json', JSON.stringify(users, null, 2));
    console.log('User data saved successfully.');
  } catch (error) {
    console.error('Error saving user data to file:', error);
  }
};

const main = async () => {
  const users = await fetchUsers();
  const processedUsers = processUserData(users);
  await saveUsersToFile(processedUsers);
};

main();
