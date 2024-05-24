import React, { useReducer, useRef } from "react";
import "./App.css";
import { useShouldUpdate } from "./utils/useShouldUpdate";
import { useEffect } from "react";
import Datepicker from "./comps/Datepicker";
import Store from "./store";

import { reducer } from "./store/reducer";
import Input from "./comps/Input";
import Display from "./comps/Display";
import Divider from "./comps/Divider";

function App() {
  const [state, dispatch] = useReducer(reducer, {
    notes: [],
    showables: {},
  });

  // const {store}
  const upd = useShouldUpdate(
    1,
    `${new Date().getDate()}:${new Date().getHours()}:${new Date().getMinutes()}`
  );

  useEffect(() => {
    console.log({ store: Store.store });
  }, [Store]);

  // let time = React.createRef();

  let timeRef = useRef(
    `${new Date().getDate()}:${new Date().getHours()}:${new Date().getMinutes()}`
  );

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

  useEffect(() => {
    const t = setInterval(() => {
      let currTime = `${new Date().getDate()}:${new Date().getHours()}:${new Date().getMinutes()}`;
      if (JSON.stringify(currTime) === JSON.stringify(timeRef.current)) {
        console.log("now!");
      } else {
        console.log(
          "not now!",
          JSON.stringify(currTime),
          JSON.stringify(timeRef.current)
        );
      }
    }, 60 * 1000);

    // if ()
    // console.log(upd);
  }, [timeRef.current]);

  return (
    <div className="App">
      <Store.Provider
        value={{
          dispatch,
          state,
        }}
      >
        <main className="main_cont">
          <Input />
          <Divider />
          <Display />
        </main>
      </Store.Provider>
    </div>
  );
}

export default App;