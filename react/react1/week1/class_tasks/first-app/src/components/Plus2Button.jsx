import React from "react";
export default function Plus2Button({ clicks, setClicks }) {
  return <button onClick={() => setClicks(clicks + 2)}>Add +2 clicks!</button>;
}
