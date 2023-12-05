import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from './loginReducers'; 
import surveyReducer from './surveyReducers';
import errorReducer from './errorReducer';

const rootReducer = combineReducers({
  login: loginReducer,
  survey: surveyReducer,
  error: errorReducer,
});

export default rootReducer;
