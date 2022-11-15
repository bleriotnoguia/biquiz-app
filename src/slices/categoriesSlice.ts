import { createSlice } from '@reduxjs/toolkit';
import categories from '../data/categories.json'

interface CategoryConfig{
    id: number;
    name: string;
  }

interface  CategoriesState {
  data: (CategoryConfig | null)[]
}

const defaultCategoriesState: CategoriesState = {
    data: []
}

const categoriesSlice = createSlice({
	initialState: defaultCategoriesState,
	name: 'categories',
	reducers: {
		fetchCategories: state => {
			state.data = categories
        }
    }
});

//actions
export const {
    fetchCategories,
} = categoriesSlice.actions;

export const categoriesReducer = categoriesSlice.reducer