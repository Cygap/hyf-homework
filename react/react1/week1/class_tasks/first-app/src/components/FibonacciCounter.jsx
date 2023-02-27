import React from "react";
import { useState } from "react";
export default function FibonacciCounter({ fibSequence, setFibSequence }) {
  const [number, setNumber] = useState([0, 1]);
  return (
    <button
      onClick={() => {
        setNumber([number[1], number[0] + number[1]]);
        setFibSequence(fibSequence.concat(number[1]));
      }}>
      Get new FibonacciNumber starting from {number[0]} = {number[1]}
    </button>
  );
}
