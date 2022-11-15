import { configureStore } from '@reduxjs/toolkit';
import { categoriesReducer } from './slices/categoriesSlice';
import { currentQuizReducer } from './slices/currentQuizSlice';

export const store = configureStore({
	reducer: {
    categories: categoriesReducer,
    currentQuiz: currentQuizReducer
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch