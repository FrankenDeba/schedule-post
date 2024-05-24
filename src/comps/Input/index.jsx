import { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Store from "../../store";
import Datepicker from "../Datepicker";
// import { dispatch } from "../../store";
import "./Input.css";
import Header from "../Header";

export default function Input({ setNote }) {
  const currentTimeStr = `${new Date().getDate()}:${new Date().getMonth()}:${new Date().getFullYear()}:${new Date().getHours()}:${new Date().getMinutes()}`;
  const [timeState, setTimeState] = useState("");
  const store = useContext(Store);

  const { dispatch, state } = store;

  useEffect(() => {
    console.log({ state });
  }, [state]);
  const [text, setText] = useState("");

  function setTime(time) {
    console.log({ time }, "<-- set time via date picker");
    let timeStr = `${new Date(time).getDate()}:${new Date(
      time
    ).getMonth()}:${new Date(time).getFullYear()}:${new Date(
      time
    ).getHours()}:${new Date(time).getMinutes()}`;

    setTimeState(timeStr);
    console.log(
      "formatted time: ",
      timeStr
      // `${new Date(time).getDate()}:${new Date(time).getHours()}:${new Date(
      //   time
      // ).getMinutes()}`
    );
    // timeRef.current = timeStr;
    // console.log({ time: timeRef.current });
  }
  return (
    <div className="input_cont">
      <Header text="Share your thoughts..." />
      <ToastContainer />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your notes here..."
      />
      <Datepicker setTime={setTime} />
      <button
        disabled={!text || !timeState}
        onClick={() => {
          // TODO: this toast is breaking the app, commenting for now!
          // toast.success(
          //   "Thanks for submitting your post, it will be live in the provided time!"
          // );
          dispatch({
            type: "add",
            payload: {
              id: uuidv4(),
              text,
              time: timeState,
              shouldShow: false,
            },
          });

          setText("");
          setTimeState("");
        }}
      >
        Submit
      </button>
    </div>
  );
}
