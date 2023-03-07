import React, { useEffect, useState } from "react";
export default function ShiftList({ shifts, setVisible }) {
  const [filter, setFilter] = useState("");
  const [totalCost, setTotal] = useState(0);
  useEffect(() => {
    const total = shifts
      .filter((shift) =>
        shift.name.toLowerCase().includes(filter.toLowerCase())
      )
      .reduce((total, shift) => {
        return (total +=
          (new Date(shift.end).getTime() - new Date(shift.start).getTime()) /
          1000 /
          60);
      }, 0);
    setTotal(total * 10);
  }, [filter, shifts]);
  return (
    <div>
      <section>
        <input
          type="text"
          placeholder="filter shifts by name"
          value={filter}
          onChange={({ target }) => {
            setFilter(target.value);
          }}
        />
        <p>Total cost: {totalCost} kr.</p>
        <button onClick={setVisible}>Add shift</button>
      </section>
      <ul>
        {shifts
          .filter((shift) =>
            shift.name.toLowerCase().includes(filter.toLowerCase())
          )
          .map((shift) => {
            const duration =
              (new Date(shift.end).getTime() -
                new Date(shift.start).getTime()) /
              1000 /
              60;
            return (
              <li key={shift.name}>
                <p>{shift.name}</p> <p>Started at: {shift.start}</p>
                <p>Finished at: {shift.end}</p>
                <p>
                  Shift duration:
                  {Math.floor(duration / 60)} hours {duration % 60} minutes
                </p>
                <p>Shift cost: {duration * 10} kr.</p>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
