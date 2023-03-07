import React, { useState } from "react";
export default function AddShift({ hide, addShift }) {
  const [shiftData, setShiftData] = useState({ name: "", start: "", end: "" });
  const changeHandler = ({ target }) => {
    setShiftData({ ...shiftData, [target.name]: target.value });
  };
  return (
    <div
      className="modal"
      onClick={(e) => {
        if (!e.target.type) {
          hide(e);
        }
      }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addShift(shiftData);
          hide();
        }}>
        <input
          type="text"
          name="name"
          value={shiftData.name}
          onChange={changeHandler}
        />
        <input
          type="time"
          name="start"
          value={shiftData.start}
          onChange={changeHandler}
        />
        <input
          type="time"
          name="end"
          value={shiftData.end}
          onChange={changeHandler}
        />
        <button type="submit">Save Shift</button>
      </form>
    </div>
  );
}
