import { useContext } from "react";
import { UserContext } from "../providers/UserContextProvider";

export default function UserList() {
  const { users, userName, setUserName, loading } = useContext(UserContext);
  console.log("%cUserList.tsx line:6 loading", "color: #007acc;", loading);
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
          {users.map((user) => (
            <li key={user.id}>{user.login}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
