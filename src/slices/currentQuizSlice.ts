import { createSlice } from '@reduxjs/toolkit';
import quizzes from '../data/quizzes.json'

export interface QuestionOption {
    id: number;
    name: string;
    is_correct: boolean;
}

export interface Question {
    id: number;
    name: string;
    options: QuestionOption[]
    category_id: number;
}

export interface Choice {
    question_id: number;
    choice_id: number;
}

interface  CurrentQuizState {
  questions: Question[];
  choices: Choice[];
}

const defaultCurrentQuizState:CurrentQuizState = {
    questions: [],
    choices: []
}

const currentQuizSlice = createSlice({
	initialState: defaultCurrentQuizState,
	name: 'currentQuiz',
	reducers: {
		fetchQuestions: (state, data) => {
            // TODO : Get the questions belongsTo data.payload.category_id
			state.questions = quizzes
        },
        addChoice: (state, data) => {
            var newChoices = [data.payload, ...state.choices]
			state.choices = newChoices
        },
        deleteChoices: (state) => {
            state.choices = []
        }
    }
});

//actions
export const {
    fetchQuestions,
    deleteChoices,
    addChoice
} = currentQuizSlice.actions;

export const currentQuizReducer = currentQuizSlice.reducer