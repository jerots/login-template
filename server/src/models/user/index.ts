import { sql } from "../sql";

export type User = {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePictureUrl?: string;
};

export const getUser = async (username: string) => {
  return new Promise<User | null>((resolve, reject) => {
    sql.query(
      "SELECT username, email, first_name, last_name, profile_picture_url FROM user WHERE username = ?",
      [username],
      (error, results, fields) => {
        if (error) {
          reject(error);
        }
        if (results.length === 0) {
          resolve(null);
        }
        const userResult = results[0];
        resolve(userResult);
      }
    );
  });
};

export const updateUser = async (user: User) => {
  return new Promise((resolve, reject) => {
    sql.query(
      "UPDATE user SET email=?, first_name=?, last_name=?, profile_picture_url=? WHERE username=?",
      [user.email, user.firstName, user.lastName, user.profilePictureUrl, user.username],
      (error, results, fields) => {
        if (error) {
          reject(error);
        }
        resolve(true);
      }
    );
  });
};
