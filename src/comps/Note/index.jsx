import { useContext, useEffect, useState } from "react";
import "./Note.css";
import Store from "../../store";

export default function Note({ note }) {
  const [postedAt, setPostedAt] = useState();
  const { state } = useContext(Store);
  const { showables } = state;
  const { text, time } = note;

  useEffect(() => {
    console.log({ showables });
    setPostedAt(
      `${Intl.DateTimeFormat(navigator.language, {
        weekday: "long",
        month: "short",
        day: "numeric",
      }).format(new Date(time))}

        ${Intl.DateTimeFormat("en", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }).format(new Date(time))}`
    );
    console.log("inside note: ");
  }, [showables]);

  return showables[note.id] ? (
    <div className="note_cont">
      <h2>{`${text}`}</h2>
      <p>{`Posted at: ${postedAt}`}</p>
    </div>
  ) : (
    <></>
  );
}
