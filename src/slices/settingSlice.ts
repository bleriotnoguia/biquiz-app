import { createSlice } from '@reduxjs/toolkit';

interface SettingState {
  isEasy: boolean;
  isDarkMode: boolean;
  language: string;
  displaySource: boolean;
}

const defaultSettingState: SettingState = {
    isEasy: localStorage.isEasy ? JSON.parse(localStorage.isEasy) : true,
    language: localStorage.language ? localStorage.language : 'fr',
    isDarkMode: localStorage.isDarkMode ? JSON.parse(localStorage.isDarkMode) : false,
    displaySource: localStorage.displaySource ? JSON.parse(localStorage.displaySource) : true
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
    },
    setDisplaySource: (state, data) => {
      state.displaySource = data.payload
      localStorage.displaySource = data.payload
    },
    setLanguage: (state, data) => {
      state.language = data.payload
      localStorage.language = data.payload
    }
  }
});

//actions
export const {
    setIsEasy,
    setIsDarkMode,
    setLanguage,
    setDisplaySource
} = settingSlice.actions;

export const settingReducer = settingSlice.reducer