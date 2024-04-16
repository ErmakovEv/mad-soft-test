import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface TimerState {
    value: number | null;
}

const initialState: TimerState = {
    value: null,
};

export const timerSlice = createSlice({
    name: 'timer',
    initialState,
    reducers: {
        incrementTimer: (state) => {
            state.value ? state.value-- : null

        },
        setTimer: (state, action: PayloadAction<number>) => {
            state.value = action.payload
        }
    },
});

export default timerSlice.reducer;