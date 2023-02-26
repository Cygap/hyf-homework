import React from "react";
import { useEffect, useState } from "react";

export default function Timer(params: object) {
  const [count, setCount] = useState(0);
  const [plusMinus, setPlusMinus] = useState(1);
  const [pause, setPause] = useState(false);
  const [speed, setSpeed] = useState(1000);

  useEffect(() => {
    const timerID = pause
      ? undefined
      : setTimeout(() => {
          setCount((prev) => prev + plusMinus);
        }, speed);
    return () => clearTimeout(timerID);
  }, [count, pause, plusMinus, speed]);

  const speedHandler = (e) => {
    const currentSpeed = Number(e.target.value);
    if (isNaN(currentSpeed)) {
      setPause(true);
    } else {
      setSpeed(currentSpeed);
    }
  };
  return (
    <div>
      <div>{count}</div>
      <button onClick={() => setPlusMinus(plusMinus === 1 ? -1 : 1)}>
        change count direction
      </button>
      <button onClick={() => setCount(0)}>reset to 0</button>
      <button onClick={() => setPause(!pause)}>
        {pause ? "start" : "pause"}
      </button>
      <input
        type="text"
        placeholder="timer speed, milliseconds"
        onChange={(e) => speedHandler(e)}
        value={speed}
      />
    </div>
  );
}
