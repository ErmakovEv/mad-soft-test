import { Button } from "@mui/material";
import { Question } from "../db/data";
import { questionsSlice } from "../1. App/storeProvider/reducers/questionsSlice";
import { useAppDispatch } from "../1. App/storeProvider/hooks/redux";

const CardInput = ({ question }: { question: Question }) => {
  const dispatch = useAppDispatch();
  const { increment } = questionsSlice.actions;

  return (
    <div className="test-card">
      <div className="test-question">{question.question}</div>
      <div className="test-answer"></div>
      <Button
        onClick={() => dispatch(increment())}
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

export default CardInput;
