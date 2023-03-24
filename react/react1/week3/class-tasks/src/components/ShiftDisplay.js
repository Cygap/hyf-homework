import React, { useEffect, useState } from "react";
import AddShift from "./AddShift";
import ShiftList from "./ShiftList";

export default function ShiftDisplay() {
  const [shifts, setShifts] = useState([]);
  const [visible, setVisible] = useState(false);
  const addShift = (newShift) => {
    const today = new Date();

    today.setHours(Number(newShift.start.slice(0, 2)));
    today.setMinutes(Number(newShift.start.slice(-2)));
    newShift.start = today.toISOString();

    today.setHours(Number(newShift.end.slice(0, 2)));
    today.setMinutes(Number(newShift.end.slice(-2)));
    newShift.end = today.toISOString();

    setShifts([...shifts, newShift]);
  };
  useEffect(() => {
    (async () => {
      const res = await fetch(
        "https://gist.githubusercontent.com/benna100/5fd674171ea528d7cd1d504e9bb0ca6f/raw"
      );
      const json = await res.json();

      setShifts(json);
    })();
  }, []);
  return (
    <>
      {visible ? (
        <AddShift hide={() => setVisible(!visible)} addShift={addShift} />
      ) : (
        ""
      )}

      <ShiftList shifts={shifts} setVisible={() => setVisible(!visible)} />
    </>
  );
}
