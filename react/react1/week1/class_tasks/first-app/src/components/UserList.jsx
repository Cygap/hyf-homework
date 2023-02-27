import React from "react";
import UserItem from "./UserItemExpanded";
// import users from "../UsersDB.json";

export default function UserList({ users }) {
  return (
    <ul>
      {users.map((user) => (
        <UserItem
          id={user.id}
          fullName={user.fullname}
          age={user.age}
          hegiht={user.height}
          languages={user.languages}
          address={user.adress}
        />
      ))}
    </ul>
  );
}
