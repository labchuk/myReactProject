import { combineReducers } from 'redux'
import authReducer from './reducerAuth'
import createReducer from './reducerCreator'
import quizReducer from './reducerQuiz'
import myResultsReducer from "./reducerMyResults";

export default combineReducers({
  quiz: quizReducer,
  create: createReducer,
  auth: authReducer,
  results: myResultsReducer
})
