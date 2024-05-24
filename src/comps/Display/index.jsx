import { useContext, useEffect } from "react";
import Note from "../Note";
import Store from "../../store";
import "./Display.css";
import Header from "../Header";

export default function Display() {
  const store = useContext(Store);

  const { dispatch, state } = store;
  let { notes } = state;

  useEffect(() => {
    console.log({ state });
  }, [state]);

  function timeChecker() {
    console.log("pppp");
    const t = setInterval(() => {
      let currTime = `${new Date().getDate()}:${new Date().getMonth()}:${new Date().getFullYear()}:${new Date().getHours()}:${new Date().getMinutes()}`;
      console.log(
        "ttt",
        { notes },
        JSON.stringify(currTime)
        // JSON.stringify(notes[0]?.time)
      );
      notes = notes.map((note) => {
        console.log("your time has not come:", {
          currTime,
          nextTime: note.time,
        });
        console.log("note.time", note.time);
        if (currTime === note.time) {
          console.log("your time has come: ", { note });
          note.shouldShow = true;
          dispatch({
            type: "show",
            payload: note,
          });
        }
        return note;
      });
    }, 60 * 1000);

    return t;
  }

  useEffect(() => {
    const t = timeChecker();
    return () => clearInterval(t);
  }, [state]);

  return (
    <div className="display_cont">
      <Header text={"Your posts..."} />
      {notes.map((note) => (
        <Note note={note} />
      ))}
    </div>
  );
}
