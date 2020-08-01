import React, { Component } from 'react';
import TaskSearchControl from './TaskSearchControl'
import TaskSortControl from './TaskSortControl'

class TaskControl extends Component {
    render() {
        return (
            <div className="flex mr-20">
                <div className="w-1/2">
                    <TaskSearchControl />
                </div>
                <div className="ml-10 w-1/3">
                    <TaskSortControl />
                </div>
            </div>
        );
    }
}

export default TaskControl;