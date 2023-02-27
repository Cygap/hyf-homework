import React from "react";

export default function FibonacciDisplay({ fibSequence }) {
  return <div> Here is your Fibonacci sequence: {fibSequence.join("; ")}</div>;
}
