import { useEffect } from 'react';
import { Button } from '@mui/material';
import CardContainer from './components/CardContainer';
import ProgressBar from './components/ProgressBar';
import { appSlice, TestStatus } from './1. App/storeProvider/reducers/appSlice';
import { useAppDispatch, useAppSelector } from './1. App/storeProvider/hooks/redux';

const TIME = 1500;

function App() {
  const { testStatus, timer } = useAppSelector((state) => state.appSlice);
  const { decrementTimer, runTestToggle, setTimer } = appSlice.actions;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const intervalId = setTimeout(() => {
      if (timer > 0 && testStatus === TestStatus.RUN) {
        dispatch(decrementTimer());
        localStorage.setItem('timer', `${timer - 1}`);
      }
    }, 1000);

    return () => clearTimeout(intervalId);
  }, [decrementTimer, dispatch, testStatus, timer]);

  useEffect(() => {
    const val = localStorage.getItem('timer');
    if (val !== null) {
      dispatch(setTimer(parseInt(val)));
      dispatch(runTestToggle(TestStatus.RUN));
    }
  }, [dispatch, runTestToggle, setTimer]);

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
              background: '#d92424',
              '&:hover': {
                background: '#ff0000',
              },
            }}
          >
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

      const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
      const formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;

      return `${formattedMinutes} : ${formattedSeconds}`;
    } else {
      dispatch(runTestToggle(TestStatus.STOP));
    }
  };

  return (
    <div className="App">
      <div className="wrapper">
        <div className="main-header">
          <div className="main-header__name">Тестирование</div>
          {testStatus === TestStatus.RUN ? <div className="main-header__clock">{timerHandler()}</div> : null}
        </div>
        <div className="main-body">{getNode()}</div>
      </div>
    </div>
  );
}

export default App;
