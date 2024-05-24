import { useContext, useEffect } from "react";
import "./Note.css";
import Store from "../../store";

export default function Note({ note }) {
  const { state } = useContext(Store);
  const { showables } = state;
  const { text } = note;

  useEffect(() => {
    console.log({ showables });
  }, [showables]);

  return <>{showables[note.id] && <div className="note_cont">{text}</div>}</>;
}
