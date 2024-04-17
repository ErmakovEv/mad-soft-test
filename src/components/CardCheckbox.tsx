import { Button, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { Question } from "../db/data";
import { questionsSlice } from "../1. App/storeProvider/reducers/questionsSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../1. App/storeProvider/hooks/redux";
import { useState } from "react";

const CardCheckbox = ({ question }: { question: Question }) => {
  const [checkedItems, setCheckedItems] = useState(() =>
    question.options
      ? question.options.reduce(
          (acc: { [key: string]: boolean }, curr: string) => {
            acc[curr] = false;
            return acc;
          },
          {}
        )
      : {}
  );
  const dispatch = useAppDispatch();
  const { increment, setAnswer } = questionsSlice.actions;
  const currentStep = useAppSelector(
    (state) => state.questionsSlice.currentStep
  );

  const handleCheckboxChange = (itemName: string) => {
    setCheckedItems((prevState) => ({
      ...prevState,
      [itemName]: !prevState[itemName],
    }));
  };

  return (
    <div className="test-card">
      <div className="test-question">{question.question}</div>
      <div className="test-answer">
        <FormGroup>
          {question.options
            ? question.options.map((item, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={checkedItems[item]}
                      onChange={() => handleCheckboxChange(item)}
                    />
                  }
                  label={item}
                />
              ))
            : null}
        </FormGroup>
      </div>
      <Button
        onClick={() => {
          const ans = Object.entries(checkedItems)
            .filter(([, value]) => value === true)
            .map(([key]) => key);
          dispatch(increment());
          dispatch(
            setAnswer({
              ans,
              currentStep,
            })
          );
        }}
        variant="contained"
        sx={{
          background: "#d92424",
          "&:hover": {
            background: "#ff0000",
          },
        }}>
        Ответить
      </Button>
    </div>
  );
};

export default CardCheckbox;
