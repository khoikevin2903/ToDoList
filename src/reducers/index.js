import { combineReducers } from 'redux';
import tasks from './tasks';
import isDisplayForm from './isDisplayForm';
import itemEditing from './itemEditing';
import filterTask from './filterTask';
import search from './search';
import sort from './sort';

const myReducer = combineReducers({
    tasks, // tasks: tasks
    isDisplayForm, // isDisplayForm: isDisplayForm
    itemEditing, // itemEditing: itemEditting
    filterTask, // filterTask:filterTask
    search, // searchTask: searchTask
    sort
})

export default myReducer;