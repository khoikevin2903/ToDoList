import * as types from './../constants/ActionTypes'

var initialState = {
   by: 'name',
   value: 1
};

var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SORT:
            console.log(action)
            return {
                by: action.sort.by,
                value: action.sort.value
            };
        default:
            return state;
    }
}

export default myReducer;

