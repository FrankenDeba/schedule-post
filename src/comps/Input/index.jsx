import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Store from "../../store";
import Datepicker from "../Datepicker";
import "./Input.css";
import Header from "../Header";

export default function Input({ database }) {
  const [timeState, setTimeState] = useState("");
  const store = useContext(Store);

  const { dispatch } = store;

  async function addToDB({ id, text, timeState }) {
    try {
      const { error } = await database.from("posts").insert([
        {
          post_content: text,
          post_id: id,
          post_schedule: timeState,
        },
      ]);

      if (error) {
        throw new Error("Database error: ", error);
      }
    } catch (err) {
      console.error(err);
    }
  }

  const [text, setText] = useState("");

  function setTime(time) {
    setTimeState(time);
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
          const id = uuidv4();
          addToDB({
            id,
            text,
            timeState,
          });

          dispatch({
            type: "add",
            payload: {
              id,
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
