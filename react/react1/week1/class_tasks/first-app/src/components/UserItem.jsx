import React from "react";

export default function UserItem({ id, name, age }) {
  return (
    <li>
      <p>
        User ID: {id}, User name: {name}, Age: {age}
      </p>
    </li>
  );
}
