import { useAppSelector } from "../1. App/storeProvider/hooks/redux";

const ProgressBar = () => {
  const { data, currentStep } = useAppSelector((state) => state.questionsSlice);

  const itemClassHandler = (index: number) => {
    if (currentStep > index) {
      return "check";
    } else if (currentStep === index) {
      return "current";
    } else {
      return "";
    }
  };

  return (
    <div className="progress-bar">
      {data.map((item, index) => {
        return (
          <div
            key={`progress-item-${item.id}`}
            className={`progress-bar_item ${itemClassHandler(index)}`}></div>
        );
      })}
    </div>
  );
};

export default ProgressBar;
