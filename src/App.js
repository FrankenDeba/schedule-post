import React, { useReducer, useRef, useState } from "react";
import "./App.css";
// import { useShouldUpdate } from "./utils/useShouldUpdate";
import { useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import Datepicker from "./comps/Datepicker";
import Store from "./store";

import { reducer } from "./store/reducer";
import Input from "./comps/Input";
import Display from "./comps/Display";
import Divider from "./comps/Divider";
import { DATABASE_KEY, DATABASE_URL } from "./utils/constants";

function App() {
  const [notes, setNotes] = useState([]);
  const [showables, setShowables] = useState({});
  const [state, dispatch] = useReducer(reducer, {
    notes,
    showables,
  });

  useEffect(() => {
    console.log("notes from database: ", { notes, showables });
    dispatch({
      type: "init",
      payload: {
        notes,
        showables,
      },
    });
  }, [notes, showables]);

  const database = createClient(DATABASE_URL, DATABASE_KEY);

  async function getDatabase() {
    try {
      const { data, error } = await database.from("posts").select();
      if (error) {
        throw new Error("Database select error");
      }

      console.log({ data }, "supabase");
      const postMap = new Map();
      data.forEach((post) => postMap.set(post.post_id, post));
      const uniquePosts = Array.from(postMap.values());
      const postsState = uniquePosts
        .map((post) => ({
          id: post.post_id,
          time: post.post_schedule,
          shouldShow: post.should_show,
          text: post.post_content,
        }))
        .sort(
          (postA, postB) =>
            new Date(postB.time).getTime() - new Date(postA.time).getTime()
        );

      const showables_obj = {};
      postsState.forEach((post) => {
        showables_obj[post.id] = post.shouldShow;
      });
      setShowables(showables_obj);
      setNotes(postsState);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getDatabase();
  }, []);

  // const {store}
  // const upd = useShouldUpdate(
  //   1,
  //   `${new Date().getDate()}:${new Date().getHours()}:${new Date().getMinutes()}`
  // );

  useEffect(() => {
    console.log({ store: Store.store });
  }, [Store]);

  // let time = React.createRef();

  // let timeRef = useRef(
  //   `${new Date().getDate()}:${new Date().getHours()}:${new Date().getMinutes()}`
  // );

  // function setTime(time) {
  //   console.log({ time });
  //   let timeStr = `${new Date(time).getDate()}:${new Date(
  //     time
  //   ).getMonth()}:${new Date(time).getFullYear()}:${new Date(
  //     time
  //   ).getHours()}:${new Date(time).getMinutes()}`;
  //   console.log(
  //     "formatted time: ",
  //     time
  //     // `${new Date(time).getDate()}:${new Date(time).getHours()}:${new Date(
  //     //   time
  //     // ).getMinutes()}`
  //   );
  //   timeRef.current = timeStr;
  //   console.log({ time: timeRef.current });
  // }

  // useEffect(() => {
  //   const t = setInterval(() => {
  //     let currTime = `${new Date().getDate()}:${new Date().getHours()}:${new Date().getMinutes()}`;
  //     if (JSON.stringify(currTime) === JSON.stringify(timeRef.current)) {
  //       console.log("now!");
  //     } else {
  //       console.log(
  //         "not now!",
  //         JSON.stringify(currTime),
  //         JSON.stringify(timeRef.current)
  //       );
  //     }
  //   }, 60 * 1000);

  // if ()
  // console.log(upd);
  // }, [timeRef.current]);

  return (
    <div className="App">
      <Store.Provider
        value={{
          dispatch,
          state,
        }}
      >
        <main className="main_cont">
          <Input database={database} />
          <Divider />
          <Display database={database} />
        </main>
      </Store.Provider>
    </div>
  );
}

export default App;
