import { Button, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { Question } from '../db/data';
import { questionsSlice } from '../1. App/storeProvider/reducers/questionsSlice';
import { useAppDispatch, useAppSelector } from '../1. App/storeProvider/hooks/redux';
import { useState } from 'react';

const CardRadio = ({ question }: { question: Question }) => {
  const [currentAnswer, setCurrentAnswer] = useState('');

  const dispatch = useAppDispatch();
  const { increment, setAnswer } = questionsSlice.actions;
  const currentStep = useAppSelector((state) => state.questionsSlice.currentStep);
  const handleRadioChange = (item: string) => {
    setCurrentAnswer(item);
  };

  const buttonHandler = () => {
    dispatch(increment());
    dispatch(
      setAnswer({
        ans: currentAnswer,
        currentStep,
      })
    );
    localStorage.setItem('step', `${currentStep + 1}`);
  };

  return (
    <div className="test-card">
      <div className="test-question">{question.question}</div>
      <div className="test-answer">
        <RadioGroup>
          {question.options
            ? question.options.map((item, index) => (
                <FormControlLabel
                  disabled={question.id === 1 ? (index !== 2 ? true : false) : false}
                  key={index}
                  value={item}
                  control={
                    <Radio
                      onChange={() => handleRadioChange(item)}
                      sx={{
                        '& .MuiSvgIcon-root': { fontSize: 16 },
                        color: '#252525',
                        '&.Mui-checked': {
                          color: '#d92424',
                        },
                      }}
                    />
                  }
                  label={<Typography variant="subtitle2">{item}</Typography>}
                />
              ))
            : null}
        </RadioGroup>
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

export default CardRadio;
