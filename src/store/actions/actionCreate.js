import {
  CREATE_QUIZ_QUESTION,
  RESET_QUIZ_CREATION,
  CREATE_QUIZ_INFO,
} from './actionTypes'
import axios from 'axios'

export function createQuizQuestion(item) {
  return {
    type: CREATE_QUIZ_QUESTION,
    item,
  }
}
export function createQuizInfo(info) {
  return {
    type: CREATE_QUIZ_INFO,
    info
  }
}

export function resetQuizCreation() {
  return {
    type: RESET_QUIZ_CREATION,
  }
}

export function finishCreateQuiz() {
  const token = localStorage.getItem('userId')
  return async (dispatch, getState) => {
    // await axios.post(
    //   `https://reactcourse-4fc5b-default-rtdb.firebaseio.com/users/${token}.json`,
    //   { quizitem: getState().create.quiz, info: getState().create.info, token: token }
    // )
    await axios.post(
        `https://reactcourse-4fc5b-default-rtdb.firebaseio.com/quizes.json`,
        { quizitem: getState().create.quiz, info: getState().create.info, user: token}
    )
    dispatch(resetQuizCreation())
  }
}
