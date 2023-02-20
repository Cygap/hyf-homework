import React from "react";
export default function Task({ taskName, dueDate }) {
  return (
    <li>
      <p className="Flex-Row">
        <span>{taskName},</span> <span>{dueDate}</span>
      </p>
    </li>
  );
}
