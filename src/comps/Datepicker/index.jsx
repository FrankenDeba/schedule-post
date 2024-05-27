import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";

const Datepicker = ({ setTime }) => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className="dp_cont">
      <ToastContainer />
      <label for="dp">Post by: </label>
      <DatePicker
        id="dp"
        selected={startDate}
        onChange={(date) => {
          if (date.getTime() < new Date().getTime()) {
            alert("Invalid time!");
            // TODO: toast is breaking!
            // toast.error("Invalid date: please select a future date");
            return;
          }
          setStartDate(date);
          setTime(date);
        }}
        showTimeSelect
        dateFormat="Pp"
        timeIntervals={1}
      />
    </div>
  );
};

export default Datepicker;
