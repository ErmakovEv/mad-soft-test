import { Button, TextField, createTheme, ThemeProvider } from '@mui/material';
import { Question } from '../db/data';
import { questionsSlice } from '../1. App/storeProvider/reducers/questionsSlice';
import { useAppDispatch, useAppSelector } from '../1. App/storeProvider/hooks/redux';
import { ChangeEvent, useState } from 'react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#d92424', // Установите желаемый цвет здесь
    },
  },
});

const CardInput = ({ question }: { question: Question }) => {
  const [inputText, setInputText] = useState('');
  const dispatch = useAppDispatch();
  const { increment, setAnswer } = questionsSlice.actions;
  const currentStep = useAppSelector((state) => state.questionsSlice.currentStep);

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const buttonHandler = () => {
    dispatch(increment());
    dispatch(
      setAnswer({
        ans: inputText,
        currentStep,
      })
    );
    localStorage.setItem('step', `${currentStep + 1}`);
  };

  return (
    <div className="test-card">
      <div className="test-question">{question.question}</div>
      <div className="test-answer">
        <ThemeProvider theme={theme}>
          <TextField
            id="outlined-basic"
            label="Введите ответ"
            variant="outlined"
            onChange={inputHandler}
            value={inputText}
            inputProps={{ style: { fontSize: 16 } }}
            InputLabelProps={{
              style: {
                color: '#252525',
                fontSize: '12px',
              },
            }}
          />
        </ThemeProvider>
      </div>
      <Button
        onClick={buttonHandler}
        variant="contained"
        sx={{
          background: '#d92424',
          '&:hover': {
            background: '#ff0000',
          },
        }}
      >
        Ответить
      </Button>
    </div>
  );
};

export default CardInput;
