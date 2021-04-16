import {
    FETCH_MY_RESULTS_SUCCESS
} from './actionTypes'
import axios from 'axios'
import {fetchQuizesError, fetchQuizesStart, fetchQuizesSuccess} from "./actionsQuiz";

export function fetchMyResults () {
    const token = localStorage.getItem('userId')
    return async (dispatch) => {
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get(
                `https://reactcourse-4fc5b-default-rtdb.firebaseio.com/users/${token}.json`
            )
            const data = response.data
            const results = []
            console.log(data)
            Object.keys(response.data).forEach((key, index) => {
                console.log(data[key].result)
                results.push({
                    id: key,
                    name: data[key].name,
                    result: data[key].result,
                    date: data[key].date
                })
                console.log(results)
            })
            dispatch(fetchMyResultsSuccess(results))
        } catch (e) {
            dispatch(fetchQuizesError(e))
        }
    }
}
export function fetchMyResultsSuccess(results) {
    return {
        type: FETCH_MY_RESULTS_SUCCESS,
        results
    }
}