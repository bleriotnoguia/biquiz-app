import { configureStore } from '@reduxjs/toolkit';
import { categoriesReducer } from './slices/categoriesSlice';
import { currentQuizReducer } from './slices/currentQuizSlice';
import { settingReducer } from './slices/settingSlice';

export const store = configureStore({
	reducer: {
    categories: categoriesReducer,
    currentQuiz: currentQuizReducer,
    setting: settingReducer
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch