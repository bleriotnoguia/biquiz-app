import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export interface CategoryConfig{
    id: number;
    name: string;
    level: number;
    description: string;
    is_active: number;
    parent_id: number | null;
    slug: string;

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
  const lang = localStorage.language ? localStorage.language : 'fr'
  const res = await axios.get(`http://localhost:8000/api/${lang}/question-categories`)
  return res.data
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
      state.loading = false;
    },
  },
});


export const categoriesReducer = categoriesSlice.reducer