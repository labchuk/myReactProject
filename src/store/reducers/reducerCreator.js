import {
  CREATE_QUIZ_QUESTION,
  RESET_QUIZ_CREATION,
  CREATE_QUIZ_INFO,
} from '../actions/actionTypes'

const initialState = {
  quiz: [],
  info: {}
}

export default function createReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_QUIZ_QUESTION:
      return {
        ...state,
        quiz: [...state.quiz, action.item],
      }
    case CREATE_QUIZ_INFO:
      return {
        ...state,
        info: action.info
      }
    case RESET_QUIZ_CREATION:
      return {
        ...state,
        quiz: [],
      }
    default:
      return state
  }
}
