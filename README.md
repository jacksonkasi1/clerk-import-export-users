# User Migration Script for Clerk

This project provides a script for migrating user data to Clerk's user management platform. The script reads user data from a JSON file, transforms it into the required format for the Clerk API, and creates users accordingly. Additionally, it includes instructions for listing all users via the Clerk Backend API.

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- A Clerk account and access to your Clerk instance's API key.

### Installation

1. Clone this repository or download the source code.
2. Navigate to the project directory and install dependencies:

```bash
pnpm install
```

3. Create a `.env` file in the root directory with the following variables:

```env
CLERK_API_KEY=your_clerk_api_key_here
CLERK_BASE_URL=https://api.clerk.dev
RATE_LIMIT_PAUSE_MS=10000
```

Replace `your_clerk_api_key_here` with your actual Clerk API key.

### Usage

1. Ensure your user data is in a JSON file named `users.json` placed at the root of the project directory. The structure of the JSON should match the expected input structure described in the provided TypeScript interfaces.

2. Compile the TypeScript files (if you're using TypeScript):

```bash
pnpm run build
```

3. Run the script to start the user migration process:

```bash
pnpm run start
```

## Listing All Users

To list all users, you can make a GET request to the Clerk Backend API. You'll need to use the Bearer Token for authorization, which is your Clerk secret key.

### Making the Request

You can use tools like cURL, Postman, or write a script using a library like Axios in Node.js to make the request. Here's an example using cURL:

```bash
curl -H "Authorization: Bearer YOUR_CLERK_SECRET_KEY" https://api.clerk.dev/v1/users
```

Replace `YOUR_CLERK_SECRET_KEY` with your actual Clerk secret key.

### Query Parameters

The GET `/v1/users` endpoint supports various query parameters for filtering, sorting, and pagination. For detailed information on each parameter, refer to the [Clerk Backend API documentation](https://clerk.com/docs/reference/backend-api/tag/Users).

## Documentation

For more details on Clerk's API and user management capabilities, visit the official [Clerk documentation](https://clerk.com/docs).

## Support

If you encounter any issues or have questions, consider reaching out to Clerk support or checking the Clerk documentation for more guidance.
