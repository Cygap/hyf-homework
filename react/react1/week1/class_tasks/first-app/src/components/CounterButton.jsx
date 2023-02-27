import React from "react";
export default function Counter({ clicks, setClicks }) {
  return (
    <button onClick={() => setClicks(clicks + 1)}>
      Clicked {clicks} times!
    </button>
  );
}
