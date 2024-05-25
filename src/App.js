import React, { useReducer, useRef, useState } from "react";
import "./App.css";
import { useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
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
