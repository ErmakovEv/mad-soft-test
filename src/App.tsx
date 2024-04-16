import { useEffect, useState } from "react";

function App() {
  const [timer, setTimer] = useState<number>(
    parseInt(localStorage.getItem("timer") ?? "0")
  );

  console.log(timer);

  useEffect(() => {
    const intervalId = setTimeout(() => {
      if (timer > 0) {
        setTimer((timer) => timer - 1);
        localStorage.setItem("timer", `${timer - 1}`);
      }
    }, 1000);

    return () => clearTimeout(intervalId);
  }, [timer]);

  useEffect(() => {
    const val = localStorage.getItem("timer");
    if (val !== null) {
      setTimer(parseInt(val));
    }
  }, []);

  return (
    <div>
      <h1>{timer > 0 ? timer : "Время вышло!"}</h1>
      {localStorage.getItem("timer") === null && !timer ? (
        <button onClick={() => setTimer(15)}>Start</button>
      ) : null}
    </div>
  );
}

export default App;
