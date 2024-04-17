import { useEffect, useState } from 'react';
import { Button } from '@mui/material';

const TIME = 15;

function App() {
  const [timer, setTimer] = useState<number>(parseInt(localStorage.getItem('timer') ?? '0'));
  const [start, setStart] = useState<boolean>(false);

  useEffect(() => {
    const intervalId = setTimeout(() => {
      if (timer > 0) {
        setTimer((timer) => timer - 1);
        localStorage.setItem('timer', `${timer - 1}`);
      }
    }, 1000);

    return () => clearTimeout(intervalId);
  }, [timer]);

  useEffect(() => {
    const val = localStorage.getItem('timer');
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
          {start ? <div className="main-header__clock">{timer > 0 ? timer : 'Время вышло!'}</div> : null}
        </div>
        <div className="main-body">
          <div className="progress-bar">
            <div className="progress-bar_item check"></div>
            <div className="progress-bar_item check"></div>
            <div className="progress-bar_item check"></div>
            <div className="progress-bar_item check"></div>
            <div className="progress-bar_item check"></div>
            <div className="progress-bar_item current"></div>
            <div className="progress-bar_item"></div>
          </div>
          {localStorage.getItem('timer') === null && !timer ? (
            <Button onClick={buttonStartHandler} variant="contained" sx={{ background: '#d92424' }}>
              Начать тест
            </Button>
          ) : null}
          <div className="test-card">
            <div className="test-question">Что должен знать фронтенд-разработчик? Назовите три ключевых технологии</div>
            <div className="test-answer"></div>
            <div className="test-button">Ответить</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
