import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Question } from '../../../db/data';
import question from '../../../db/data';

interface QuestionsState {
  data: Question[];
  currentStep: number;
}

const initialState: QuestionsState = {
  data: question,
  currentStep: parseInt(localStorage.getItem('step') ?? '0'),
};

export const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    increment: (state) => {
      ++state.currentStep;
    },
    setAnswer: (state, action: PayloadAction<{ ans: string | string[]; currentStep: number }>) => {
      state.data[action.payload.currentStep].answer = action.payload.ans;
    },
  },
});

export default questionsSlice.reducer;
