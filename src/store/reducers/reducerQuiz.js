import {
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZ_SUCCESS,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  QUIZ_SET_STATE,
  RETRY_QUIZ,
  // FETCH_MY_QUIZES_SUCCESS,
  // FETCH_MY_QUIZ_SUCCESS,

} from '../actions/actionTypes'

const initialState = {
  loading: false,
  quizes: [],
  myQuizes: [],
  result: {},
  isFinished: false,
  activeQuestion: 0,
  answerState: null,
  quiz: null,
  info: null,
  myQuiz: null,
}

export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_QUIZES_START:
      return {
        ...state,
        loading: true,
      }
    case FETCH_QUIZES_SUCCESS:
      return {
        ...state,
        loading: false,
        quizes: action.quizes,
      }
    // case FETCH_MY_QUIZES_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     myQuizes: action.myQuizes,
    //   }
    case FETCH_QUIZES_ERROR:
      return {
        ...state,
        loading: false,
      }
    case FETCH_QUIZ_SUCCESS:
      return {
        ...state,
        loading: false,
        quiz: action.quiz,
        info: action.info
      }
    // case FETCH_MY_QUIZ_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     myQuiz: action.myQuiz.quizitem,
    //   }
    case QUIZ_SET_STATE:
      return {
        ...state,
        answerState: action.answerState,
        result: action.result,
      }
    case FINISH_QUIZ:
      return {
        ...state,
        isFinished: true,
      }
    case QUIZ_NEXT_QUESTION:
      return {
        ...state,
        activeQuestion: action.number,
        answerState: null,
      }
    case RETRY_QUIZ:
      return {
        ...state,
        activeQuestion: 0,
        answerState: null,
        result: {},
        isFinished: false,
      }
    default:
      return state
  }
}
