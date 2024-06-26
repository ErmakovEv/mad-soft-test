import { combineReducers, configureStore } from '@reduxjs/toolkit';
import appSlice from './reducers/appSlice';
import questionsSlice from './reducers/questionsSlice';

const rootReducer = combineReducers({
  appSlice,
  questionsSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
