import { createSlice } from '@reduxjs/toolkit';

interface SettingState {
  isEasy: boolean;
  isDarkMode: boolean;
}

const defaultSettingState: SettingState = {
    isEasy: localStorage.isEasy ? JSON.parse(localStorage.isEasy) : true,
    isDarkMode: localStorage.isDarkMode ? JSON.parse(localStorage.isDarkMode) : false
}

const settingSlice = createSlice({
	initialState: defaultSettingState,
	name: 'setting',
	reducers: {
		setIsEasy: (state, data) => {
      state.isEasy = data.payload
      /**
       * Persist data in the localStorage
       * In the future we might use the "redux-persist" package to handle this stuff
       * */
      localStorage.isEasy = data.payload
    },
    setIsDarkMode: (state, data) => {
      state.isDarkMode = data.payload
      localStorage.isDarkMode = data.payload
      document.body.classList.toggle("dark", data.payload);
    }
  }
});

//actions
export const {
    setIsEasy,
    setIsDarkMode
} = settingSlice.actions;

export const settingReducer = settingSlice.reducer