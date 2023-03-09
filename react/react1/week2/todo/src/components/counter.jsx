import React from "react";
import { useState, useEffect } from "react";

export default function Counter(props: object) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCount((count) => count + 1);
    }, 1000);
  }, [count]);

  return <span>{count}</span>;
}
