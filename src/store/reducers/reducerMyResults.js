import {
    FETCH_MY_RESULTS_SUCCESS
} from '../actions/actionTypes'

const initialState = {
    myResults: null
}

export default function myResultsReducer (state = initialState, action) {
    switch (action.type) {
        case FETCH_MY_RESULTS_SUCCESS:
            return {
                ...state,
                myResults: action.results
            }
        default:
            return state
    }
}