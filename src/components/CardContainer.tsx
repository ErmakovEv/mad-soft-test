import { useAppSelector } from "../1. App/storeProvider/hooks/redux";
import { Cards } from "../db/data";
import CardCheckbox from "./CardCheckbox";
import CardInput from "./CardInput";
import CardRadio from "./CardRadio";
import CardTextarea from "./CardTextarea";

function CardContainer() {
  const { data, currentStep } = useAppSelector((state) => state.questionsSlice);

  const getCard = () => {
    if (currentStep === data.length) return <>КОНЕЦ!!!</>;
    const currentQuestion = data[currentStep];
    switch (currentQuestion.type) {
      case Cards.CHECKBOX:
        return <CardCheckbox question={currentQuestion} />;
      case Cards.RADIO:
        return <CardRadio question={currentQuestion} />;
      case Cards.INPUT:
        return <CardInput question={currentQuestion} />;
      case Cards.TEXTAREA:
        return <CardTextarea question={currentQuestion} />;
      default:
        return <>Вопрос не найден</>;
    }
  };

  return <div className="card-container">{getCard()}</div>;
}

export default CardContainer;
