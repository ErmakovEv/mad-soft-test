import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const enum TestStatus {
  RUN,
  STOP,
  START,
}

interface AppState {
  timer: number;
  testStatus: TestStatus;
}

const initialState: AppState = {
  timer: parseInt(localStorage.getItem('timer') ?? '0'),
  // timer: 0,
  testStatus: TestStatus.START,
};

export const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    decrementTimer: (state) => {
      --state.timer;
    },
    setTimer: (state, action: PayloadAction<number>) => {
      state.timer = action.payload;
    },
    runTestToggle: (state, action: PayloadAction<TestStatus>) => {
      state.testStatus = action.payload;
    },
  },
});

export default appSlice.reducer;
