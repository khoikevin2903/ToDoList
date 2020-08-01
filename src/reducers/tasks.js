import * as types from './../constants/ActionTypes'


var data = JSON.parse(localStorage.getItem('tasks'));
var inititalState = data ? data : [];

var s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

var randomID = () => {
    return s4() + s4() + '-' + s4() + '-' + s4() +
        '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() +
        '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() +
        '-' + s4() + '-' + s4() + '-' + s4();
}


var findIndex = (tasks, id) => {
    var result = -1;
    tasks.forEach((task, index) => {
        if (task.id === id) result = index;
    });
    return result;
}

var id = '';
var index = -1;

var myReducer = (state = inititalState, action) => {
    switch (action.type) {
        case types.LIST_ALL:
            return state;

        case types.SAVE_TASK:
            if(action.task.id){
                index = findIndex(state,action.task.id);
                state[index] = {
                    id: action.task.id,
                    name: action.task.name,
                    status: action.task.status
                }
            }else {
                var newTask = {
                    id: randomID(),
                    name: action.task.name,
                    status: action.task.status
                }
                state.push(newTask);
            }
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];

        case types.UPDATE_STATUS_TASK:
            id = action.id;
            index = findIndex(state, id);
            state[index] = {
                ...state[index],
                status: !state[index].status
            }
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];

        case types.DELETE_TASK:
            id = action.id;
            index = findIndex(state, id);
            state.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        default:
            return state;
    }
}

export default myReducer;