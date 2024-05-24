import { useState, useEffect } from "react";

export const useShouldUpdate = (id, time) => {
  const [shouldUpdate, setShouldUpdate] = useState({
    [id]: false,
  });

  function checkForUpdate() {
    let currTime;
    const timer = setInterval(() => {
      currTime = `${new Date().getDate()}:${new Date().getHours()}:${new Date().getMinutes()}`;
      console.log({ currTime });

      if (currTime === time) {
        setShouldUpdate({
          [id]: true,
        });
      }

      return {
        timer,
      };
    }, 60 * 1000);
  }

  useEffect(() => {
    const timer = checkForUpdate();

    return () => clearInterval(timer);
  }, []);

  return shouldUpdate;
};
