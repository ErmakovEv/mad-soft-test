import { createSlice } from '@reduxjs/toolkit';
import { Question } from '../../../db/data';
import question from '../../../db/data';

interface QuestionsState {
    data: Question[];
    currentStep: number
}

const initialState: QuestionsState = {
    data: question,
    currentStep: 0
};

export const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        increment: (state) => {
            ++state.currentStep
        }
    },
});

export default questionsSlice.reducer;