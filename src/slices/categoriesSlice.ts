import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { createClient } from '@supabase/supabase-js'
import { environment } from '../environments/environment';

export interface CategoryConfig{
    id: number;
    name: string;
    level: number;
    is_active: number;
    parent_id: number | null;
  }

interface  CategoriesState {
  loading: boolean;
  error: Error | null;
  data: CategoryConfig[]
}

const defaultCategoriesState: CategoriesState = {
  error: null,
  loading: false,
  data: [],
}

export const fetchCategories = createAsyncThunk("categories/fetch", async () => {
  // Initialize the JS client

  // const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
  // const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
  console.log("supabaseUrl", process.env.REACT_APP_SUPABASE_URL);

  const supabaseUrl = environment.supabaseUrl;
  const supabaseKey = environment.supabaseKey;

  const supabase = createClient(supabaseUrl, supabaseKey)
  let { data: question_categories, error } = await supabase
  .from('question_categories')
  .select('id,level,is_active,parent_id, name:question_category_translations(name)')
  .eq('question_category_translations.locale', 'en')
  // const lang = localStorage.language ? localStorage.language : 'fr'
  // const res = await axios.get(`https://biquiz.herokuapp.com/api/${lang}/question-categories`)
  // return res.data
  const categories = question_categories?.map(cat => {
    let [cat_name] = cat.name as any;
    cat.is_active = cat.is_active ? 1 : 0
    return {...cat, ...cat_name};
  });
  return {data: categories}
  }
);

const categoriesSlice = createSlice({
	initialState: defaultCategoriesState,
	name: 'categories',
	reducers: {},
  extraReducers: {
    [fetchCategories.pending.type]: (state) => {
      state.loading = true;
    },
    [fetchCategories.fulfilled.type]: (state, action) => {
      state.data = action.payload.data;
      state.loading = false;
    },
    [fetchCategories.rejected.type]: (state, action) => {
      console.error(action);
      state.error = action.error
      state.loading = false;
    },
  },
});


export const categoriesReducer = categoriesSlice.reducer