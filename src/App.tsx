import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import CardContainer from "./components/CardContainer";
import ProgressBar from "./components/ProgressBar";

const TIME = 15;

function App() {
  const [timer, setTimer] = useState<number>(
    parseInt(localStorage.getItem("timer") ?? "0")
  );
  const [start, setStart] = useState<boolean>(false);

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

  const buttonStartHandler = () => {
    setStart(true);
    setTimer(TIME);
  };

  return (
    <div className="App">
      <div className="wrapper">
        <div className="main-header">
          <div className="main-header__name">Тестирование</div>
          {start ? (
            <div className="main-header__clock">
              {timer > 0 ? timer : "Время вышло!"}
            </div>
          ) : null}
        </div>
        <div className="main-body">
          {localStorage.getItem("timer") === null && !timer ? (
            <Button
              onClick={buttonStartHandler}
              variant="contained"
              sx={{
                background: "#d92424",
                "&:hover": {
                  background: "#ff0000",
                },
              }}>
              Начать тест
            </Button>
          ) : (
            <div>
              <ProgressBar />
              <CardContainer />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
