import React from "react";
export default function ResetButton({ clicks, setClicks }) {
  return <button onClick={() => setClicks(0)}>Reset counter to 0</button>;
}
