import { writeFile } from "fs/promises";
import UserList1 from "../users_list_1.json"; // add it manualy ( dev users )
import UserList2 from "../users_list_2.json"; // add it manualy ( prod users )

interface User {
  first_name: string | null;
  last_name: string | null;
  email: string;
  last_active_at: string;
}

const mergeUsers = (list1: User[], list2: User[]): User[] => {
  const emailMap = new Map<string, User>();

  const addOrUpdateUsers = (list: User[]) => {
    list.forEach((user) => {
      const existingUser = emailMap.get(user.email);
      if (existingUser) {
        existingUser.first_name =
          user.first_name || existingUser.first_name || "Unknown";
        existingUser.last_name =
          user.last_name || existingUser.last_name || "Unknown";
      } else {
        emailMap.set(user.email, {
          email: user.email,
          first_name: user.first_name || "Unknown", // Handle null here
          last_name: user.last_name || "Unknown", // Handle null here
          last_active_at: user.last_active_at,
        });
      }
    });
  };

  addOrUpdateUsers(list1);
  addOrUpdateUsers(list2);

  return Array.from(emailMap.values());
};

const formattedUsers = mergeUsers(UserList1, UserList2).map((user) => ({
  first_name: user.first_name || "Unknown",
  last_name: user.last_name || "Unknown",
  email: user.email,
  last_active_at: user.last_active_at,
}));

const saveFormattedUsers = async (users: User[]) => {
  try {
    await writeFile("./formatted_users.json", JSON.stringify(users, null, 2));
    console.log("Formatted user data saved successfully.");
  } catch (error) {
    console.error("Failed to save formatted user data:", error);
  }
};

saveFormattedUsers(formattedUsers);
