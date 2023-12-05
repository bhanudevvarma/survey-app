import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  surveys: [],
  selectedSurvey: null,
  answers: [],
};

const surveySlice = createSlice({
  name: 'surveydata',
  initialState,
  reducers: {
    setSurveys: (state, action) => {
      state.surveys = action.payload;
    },
    setSelectedSurvey: (state, action) => {
      state.selectedSurvey = action.payload;
      console.log('select survey:', state.selectedSurvey);
    },
    setAnswers: (state, action) => {
      state.answers = action.payload;
    },
  },
});

export const { setSurveys, setSelectedSurvey, setAnswers } = surveySlice.actions;

export default surveySlice.reducer;
