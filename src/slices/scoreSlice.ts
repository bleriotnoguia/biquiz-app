import { createSlice } from '@reduxjs/toolkit';

interface score {
  category_id: string;
  stars: number;
}

interface scoresState {
  loading: boolean;
  error: Error | null;
  data: score[]
}

const defaultScoresState : scoresState= {
  loading: false,
  error: null,
  data: localStorage.scores ? JSON.parse(localStorage.scores) : []
}

const scoresSlice = createSlice({
	initialState: defaultScoresState,
	name: 'scores',
	reducers: {
		setScore: (state, data) => {
      if(!state.data.length){
        state.data = data.payload
        localStorage.scores = JSON.stringify([data.payload])
      }else{
        var myScores = [...state.data]
        var selectedScore = myScores.find(score => score.category_id === data.payload.category_id)
        var myNewScores = myScores.filter(score => score.category_id !== selectedScore?.category_id)

        if(selectedScore){
          selectedScore.stars = data.payload.stars
          state.data = [selectedScore, ...myNewScores]
        }else{
          state.data = [data.payload, ...state.data]
        }
        localStorage.scores = JSON.stringify(state.data)
      }
      /**
       * Persist data in the localStorage
       * In the future we might use the "redux-persist" package to handle this stuff
       * */
    },
  }
});

//actions
export const {
    setScore,
} = scoresSlice.actions;

export const scoresReducer = scoresSlice.reducer