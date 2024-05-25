import { useContext, useEffect, useState } from "react";
import Note from "../Note";
import Store from "../../store";
import "./Display.css";
import Header from "../Header";

export default function Display({ database }) {
  const store = useContext(Store);

  const { dispatch, state } = store;
  let { notes } = state;
  const [notesState, setNotesState] = useState(notes);

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

  useEffect(() => {
    setNotesState(
      notes.sort(
        (postA, postB) =>
          new Date(postB.time).getTime() - new Date(postA.time).getTime()
      )
    );
  }, [notes]);

  function timeChecker() {
    const t = setInterval(() => {
      let currTime = formatTime();
      notes = notes.map((note) => {
        const postScheduleTime = formatTime(note.time);
        if (currTime === postScheduleTime) {
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
      <div className="notes_cont">
        {notesState.length ? (
          notesState.map((note) => <Note note={note} />)
        ) : (
          <p className="loader">Loading...</p>
        )}
      </div>
    </div>
  );
}
