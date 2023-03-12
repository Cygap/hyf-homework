import { useContext } from "react";
import { UserContext } from "../providers/UserContextProvider";

export default function UserList() {
  const users = useContext(UserContext);
  console.log("%cUserList.tsx line:6 users", "color: #007acc;", users);
  return (
    <div>
      <input type="text" />
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.login}</li>
        ))}
      </ul>
    </div>
  );
}
