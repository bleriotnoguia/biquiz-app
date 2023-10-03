import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createClient } from '@supabase/supabase-js'
import { environment } from '../environments/environment';
import axios from 'axios';

export interface QuestionOption {
    id: number;
    name: string;
    is_correct: boolean;
}

export interface Question {
    id: number;
    name: string;
    source_text: string;
    options: QuestionOption[];
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
      // Initialize the JS client
      
      // const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
      // const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

      const supabaseUrl = environment.supabaseUrl;
      const supabaseKey = environment.supabaseKey;

      const supabase = createClient(supabaseUrl, supabaseKey)
      let { data: data_questions, error } = await supabase
      .from('questions')
      .select(`id, 
          is_active,
          source_text:question_translations(source_text, locale), 
          name:question_translations(name, locale), 
          options:question_options(id, name:question_option_translations(name, locale), is_correct)`)
      // .eq('question_translations.locale', 'en')
      .eq('question_category_id', arg.category_id)

      // const lang = localStorage.language ? localStorage.language : 'fr'
      // const res = await axios.get(`https://biquiz.herokuapp.com/api/${lang}/question-category/${arg.category_id}`)
      // return res.data

      const questions = data_questions?.map((ques: any) => {
        let ques_source_text = ques.source_text as Array<any>;
        let source_text = ques_source_text.find((item) => item.locale === 'en').source_text;
        let ques_name = ques.name as Array<any>;
        let name = ques_name.find((item) => item.locale === 'en').name;
        ques.is_active = ques.is_active ? 1 : 0;
        let options = ques.options?.map((opt: any) => {
          let opt_name = opt.name as Array<any>;
          let name = opt_name.find((item: any) => item.locale === 'en').name;
          return {...opt, name};
        }) ?? [];
        return {...ques, name, source_text, options};
      });
      return {data: questions};
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
        // tate.questions = action.payload.data.questions;
        state.questions = action.payload.data;
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