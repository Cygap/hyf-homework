import React from "react";
export default function UserItemExp({
  id,
  fullName = "No full name",
  address = "No address",
  age,
  hegiht = "no height",
  languages = ["no language data"]
}) {
  return (
    <li key={id}>
      <p>
        id: {id} User full name: {fullName}, adress is {address}, age is {age},
        hegiht is {hegiht}, languages user speaks: {languages.join(", ")}
      </p>
    </li>
  );
}
