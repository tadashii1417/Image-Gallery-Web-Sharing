import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isLoading: true
};

export default function uiReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.AUTH_SUCCESS:
            return {...state, isLoading: false}

        case actionTypes.AUTH_FAIL:
            return {...state, isLoading: false}

        default:
            return state;
    }
}