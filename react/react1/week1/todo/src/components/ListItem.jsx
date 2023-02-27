import React from "react";
export default function Task({ task }) {
  return (
    <li>
      <p className="Flex-Row">
        <span>{task.name},</span> <span>{task.deadline}</span>
      </p>
    </li>
  );
}
