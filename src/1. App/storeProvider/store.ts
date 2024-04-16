import { combineReducers, configureStore } from '@reduxjs/toolkit';
import timerSlice from './reducers/timerSlice';

const rootReducer = combineReducers({
  timerSlice,

});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
