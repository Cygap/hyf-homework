import React from "react";

export default function TableTwoColumnHeader({ c1Name, c2Name }) {
  return (
    <h2 className="Flex-Row">
      <span>{c1Name}</span>
      {c2Name}
    </h2>
  );
}
