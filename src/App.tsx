import { useEffect } from "react";
import { Button } from "@mui/material";
import CardContainer from "./components/CardContainer";
import ProgressBar from "./components/ProgressBar";
import { appSlice, TestStatus } from "./store/reducers/appSlice";
import { useAppDispatch, useAppSelector } from "./store/hooks/redux";
import Header from "./components/Header";

const TIME = 15;

function App() {
  const { testStatus, timer } = useAppSelector((state) => state.appSlice);
  const { decrementTimer, runTestToggle, setTimer } = appSlice.actions;
  const dispatch = useAppDispatch();
  const { data, currentStep } = useAppSelector((state) => state.questionsSlice);

  useEffect(() => {
    let intervalId: number;
    if (timer > 0 && currentStep < data.length) {
      dispatch(runTestToggle(TestStatus.RUN));
      intervalId = setTimeout(() => {
        dispatch(decrementTimer());
        localStorage.setItem("timer", `${timer - 1}`);
      }, 1000);
    } else if (localStorage.getItem("timer") === null) {
      dispatch(runTestToggle(TestStatus.START));
    } else {
      dispatch(runTestToggle(TestStatus.STOP));
    }
    return () => clearTimeout(intervalId);
  }, [
    currentStep,
    data.length,
    decrementTimer,
    dispatch,
    runTestToggle,
    testStatus,
    timer,
  ]);

  const buttonStartHandler = () => {
    dispatch(runTestToggle(TestStatus.RUN));
    dispatch(setTimer(TIME));
  };

  const getNode = () => {
    switch (testStatus) {
      case TestStatus.START:
        return (
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
        );
      case TestStatus.RUN:
        return (
          <div>
            <ProgressBar />
            <CardContainer />
          </div>
        );
      case TestStatus.STOP:
        return <div className="main-header__name">завершено!</div>;
      default:
        return <>Error!</>;
    }
  };

  const timerHandler = () => {
    if (timer > 0) {
      const minutes = Math.floor(timer / 60);
      const remainingSeconds = timer % 60;

      const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
      const formattedSeconds =
        remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;

      return `${formattedMinutes} : ${formattedSeconds}`;
    }
  };

  return (
    <div className="App">
      <div className="wrapper">
        <div className="main-header">
          <Header />
          {testStatus === TestStatus.RUN ? (
            <div className="main-header__clock">{timerHandler()}</div>
          ) : null}
        </div>
        <div className="main-body">{getNode()}</div>
      </div>
    </div>
  );
}

export default App;
