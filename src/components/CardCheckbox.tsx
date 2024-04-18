import {
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import { Question } from "../db/data";
import { questionsSlice } from "../store/reducers/questionsSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks/redux";
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

  const buttonHandler = () => {
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
    localStorage.setItem("step", `${currentStep + 1}`);
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
                  className="test-answer_checkbox"
                  sx={{ fontSize: 10 }}
                  control={
                    <Checkbox
                      checked={checkedItems[item]}
                      onChange={() => handleCheckboxChange(item)}
                      sx={{
                        "& .MuiSvgIcon-root": { fontSize: 16 },
                        color: "#252525",
                        "&.Mui-checked": {
                          color: "#d92424",
                        },
                      }}
                    />
                  }
                  label={<Typography variant="subtitle2">{item}</Typography>}
                />
              ))
            : null}
        </FormGroup>
      </div>
      <Button
        onClick={buttonHandler}
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
