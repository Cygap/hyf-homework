import { useContext } from "react";
import { UserContext } from "../providers/UserContextProvider";

export default function UserList() {
  const { users, userName, setUserName, loading } = useContext(UserContext);
  console.log("%cUserList.tsx line:6 users", "color: #007acc;", users);
  return (
    <div>
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Type user login here"
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {users.length ? (
            users.map((user) => <li key={user.id}>{user.login}</li>)
          ) : (
            <li>No users to show</li>
          )}
        </ul>
      )}
    </div>
  );
}
