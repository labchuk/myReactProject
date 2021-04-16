import axios from 'axios'
import {
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZ_SUCCESS,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  QUIZ_SET_STATE,
  RETRY_QUIZ,
} from './actionTypes'

export function fetchQuizes() {
  return async (dispatch) => {
    dispatch(fetchQuizesStart())
    try {
      const response = await axios.get(
        'https://reactcourse-4fc5b-default-rtdb.firebaseio.com/quizes.json'
      )
      const data = response.data
      const quizes = []
      console.log(data)
      Object.keys(response.data).forEach((key, index) => {
        console.log(data[key].info.name)
        quizes.push({
          id: key,
          user: data[key].user,
          name: data[key].info.name,
          type: data[key].info.testType,
          date: data[key].info.date
        })
      })
      dispatch(fetchQuizesSuccess(quizes))
    } catch (e) {
      dispatch(fetchQuizesError(e))
    }
  }
}
// export function fetchMyQuizes() {
//   const token = localStorage.getItem('userId')
//   return async (dispatch) => {
//     dispatch(fetchQuizesStart())
//     try {
//       const response = await axios.get(
//           `https://reactcourse-4fc5b-default-rtdb.firebaseio.com/users/${token}.json`
//       )
//       const data = response.data
//       const myQuizes = []
//       console.log(data)
//       Object.keys(response.data).forEach((key, index) => {
//         console.log(data[key].info.name)
//         myQuizes.push({
//           id: key,
//           name: data[key].info.name,
//           type: data[key].info.testType
//         })
//       })
//       console.log(myQuizes)
//       dispatch(fetchMyQuizesSuccess(myQuizes))
//     } catch (e) {
//       dispatch(fetchQuizesError(e))
//     }
//   }
// }

export function fetchQuizById(quizId) {
  return async (dispatch) => {
    dispatch(fetchQuizesStart())
    try {
      const response = await axios.get(
        `https://reactcourse-4fc5b-default-rtdb.firebaseio.com/quizes/${quizId}.json`
      )
      const quiz = response.data.quizitem
      const info = response.data.info

      dispatch(fetchQuizSuccess(quiz,info))
    } catch (e) {
      dispatch(fetchQuizesError(e))
    }
  }
}
// export function fetchMyQuizById(quizId) {
//   const token = localStorage.getItem('userId')
//   return async (dispatch) => {
//     dispatch(fetchQuizesStart())
//     try {
//       const response = await axios.get(
//           `https://reactcourse-4fc5b-default-rtdb.firebaseio.com/users/${token}/${quizId}.json`
//       )
//       const myQuiz = response.data
//       console.log(myQuiz)
//
//       dispatch(fetchMyQuizSuccess(myQuiz))
//     } catch (e) {
//       dispatch(fetchQuizesError(e))
//     }
//   }
// }


export function fetchQuizSuccess(quiz,info) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz,
    info
  }
}
// export function fetchMyQuizSuccess(myQuiz) {
//   return {
//     type: FETCH_MY_QUIZ_SUCCESS,
//     myQuiz,
//   }
// }

export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START,
  }
}

export function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes,
  }
}
// export function fetchMyQuizesSuccess(myQuizes) {
//   return {
//     type: FETCH_MY_QUIZES_SUCCESS,
//     myQuizes,
//   }
// }

export function fetchQuizesError(e) {
  return {
    type: FETCH_QUIZES_ERROR,
  }
}

export function quizSetState(answerState, result) {
  return {
    type: QUIZ_SET_STATE,
    answerState,
    result,
  }
}

export function finishQuiz(result,name) {
  return {
    type: FINISH_QUIZ,
    isFinished: true,
    result,
    name
  }
}

export function quizNextQuestion(number) {
  return {
    type: QUIZ_NEXT_QUESTION,
    number,
  }
}

export function quizAnswerClick(answerId,name) {
  return async (dispatch, getState) => {
    const state = getState().quiz
    if (state.answerState) {
      const key = Object.keys(state.answerState)[0]
      if (state.answerState[key] === 'success') {
        return
      }
    }

    const question = state.quiz[state.activeQuestion]
    const result = state.result

    if (question.rightAnswerId === answerId) {
      if (!result[question.id]) {
        result[question.id] = 'success'
      }
      dispatch(quizSetState({ [answerId]: 'success' }, result))

      const timeout = window.setTimeout(() => {
        if (isQuizFinished(state)) {
          dispatch(finishQuiz())
          const token = localStorage.getItem('userId')
          const count = Object.keys(result).reduce((total, key) => {
            if (result[key] === 'success') {
              total++
            }
            return total
          }, 0)
          const percent = Math.round((100*count)/Object.keys(result).length)
            return (axios.post(
                `https://reactcourse-4fc5b-default-rtdb.firebaseio.com/users/${token}.json`,
                {result: percent, name: name, date: Date.now()}
            )
            )
        } else {
          dispatch(quizNextQuestion(state.activeQuestion + 1))
        }

        window.clearTimeout(timeout)
      }, 1000)
    } else {
      result[question.id] = 'error'
      dispatch(quizSetState({ [answerId]: 'error' }, result))
    }
  }
}

export function retryQuiz() {
  return {
    type: RETRY_QUIZ,
  }
}

function isQuizFinished(state) {
  return state.activeQuestion + 1 === state.quiz.length
}
