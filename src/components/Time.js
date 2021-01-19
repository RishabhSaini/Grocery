import React, { useState, useEffect } from "react";

const Time = () => {
  const [currentTime, setCurentTime] = useState(0);
  useEffect(() => {
    fetch("/time")
      .then((res) => res.json())
      .then((data) => {
        setCurentTime(data.time);
      });
  }, []);
  return (
    <div>
      <p>The current time is {currentTime}</p>
    </div>
  );
};

export default Time;
