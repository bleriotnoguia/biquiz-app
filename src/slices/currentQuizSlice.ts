import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export interface QuestionOption {
    id: number;
    name: string;
    is_correct: boolean;
}

export interface Question {
    id: number;
    name: string;
    options: QuestionOption[]
    question_category_id: number;
}

export interface Choice {
    question_id: number;
    choice_id: number;
}

interface  CurrentQuizState {
  questions: Question[];
  choices: Choice[];
  loading: boolean;
  error: Error | null;
}

const defaultCurrentQuizState:CurrentQuizState = {
    error: null,
    loading: false,
    questions: [],
    choices: []
}

export const fetchQuestions = createAsyncThunk("questions/fetch", async (arg: {category_id: string}) => {
    const res = await axios.get(`http://localhost:8000/api/question-category/${arg.category_id}`)
    return res.data
    }
  );

const currentQuizSlice = createSlice({
	initialState: defaultCurrentQuizState,
	name: 'currentQuiz',
	reducers: {
        addChoice: (state, data) => {
            var newChoices = [data.payload, ...state.choices]
			      state.choices = newChoices
        },
        deleteChoices: (state) => {
            state.choices = []
        }
    },
    extraReducers: {
      [fetchQuestions.pending.type]: (state) => {
        state.loading = true;
      },
      [fetchQuestions.fulfilled.type]: (state, action) => {
        state.questions = action.payload.data.questions;
        state.loading = false;
      },
      [fetchQuestions.rejected.type]: (state, action) => {
        console.error(action);
        state.loading = false;
      },
    },
});

//actions
export const {
    deleteChoices,
    addChoice
} = currentQuizSlice.actions;

export const currentQuizReducer = currentQuizSlice.reducer