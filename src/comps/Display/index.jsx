import { useContext, useEffect } from "react";
import Note from "../Note";
import Store from "../../store";
import "./Display.css";
import Header from "../Header";

export default function Display({ database }) {
  const store = useContext(Store);

  const { dispatch, state } = store;
  let { notes } = state;

  useEffect(() => {
    console.log({ state });
  }, [state]);

  async function updateShowableInDB(id) {
    try {
      const { error } = await database
        .from("posts")
        .update({ should_show: "true" })
        .eq("post_id", id);
      if (error) {
        throw new Error("Database update error!");
      }
    } catch (err) {
      console.error(err);
    }
  }

  function formatTime(time = new Date()) {
    return `${new Date(time).getDate()}:${new Date(time).getMonth()}:${new Date(
      time
    ).getFullYear()}:${new Date(time).getHours()}:${new Date(
      time
    ).getMinutes()}`;
  }

  function timeChecker() {
    console.log("pppp");
    const t = setInterval(() => {
      let currTime = formatTime();
      console.log("ttt", { notes }, JSON.stringify(currTime));
      notes = notes.map((note) => {
        console.log("your time has not come:", {
          currTime,
          nextTime: note.time,
        });
        console.log("note.time", note.time);
        const postScheduleTime = formatTime(note.time);
        if (currTime === postScheduleTime) {
          console.log("your time has come: ", { note });
          note.shouldShow = true;
          updateShowableInDB(note.id);
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
      <div
        className="notes_cont"
        // style={{
        //   maxHeight: "100vh",
        // }}
      >
        {!notes.length ? (
          <p className="loader">Loading...</p>
        ) : (
          notes.map((note) => <Note note={note} />)
        )}
      </div>
    </div>
  );
}
