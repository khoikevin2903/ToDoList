import * as types from '../constants/ActionTypes'

var inititalState = false;

var myReducer = (state = inititalState, action) => {
    switch (action.type) {
        case types.TOGGLE_FORM:
            return !state;
        case types.OPEN_FORM:
            return true;
        case types.CLOSE_FORM:
            return false;
        default:
            return state;
    }
}

export default myReducer;