import React, { Component } from 'react';
import ClassNames from 'classnames';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class TaskItem extends Component {

    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id);
    }

    onDeleteTask = () => {
        this.props.onDeleteTask(this.props.task.id);
        this.props.onCloseForm();
    }

    onUpdateContent = () => {
        if (!this.props.isDisplayForm) {
            this.props.onOpenForm();
        }
        this.props.onUpdateContent(this.props.task);
    }

    render() {
        var { task, index } = this.props;
        return (
            <tr>
                <td className="border border-gray-400 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-400 px-4 py-2">{task.name}</td>
                <td className="border border-gray-400 px-4 py-2 flex justify-center">
                    <button className={ClassNames(
                        'text-white font-bold py-1 px-2 rounded',
                        {
                            'bg-red-500 hover:bg-red-700': task.status === true
                        },
                        {
                            'bg-green-500 hover:bg-green-700': task.status === false
                        }
                    )} onClick={this.onUpdateStatus} >
                        {task.status ? 'Kích hoạt' : 'Ẩn'}
                    </button>
                </td>
                <td className="border border-gray-400 px-4 py-2">
                    <div className="flex justify-center">
                        <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded inline-flex items-center mr-1"
                            onClick={this.onUpdateContent}>
                            <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
                            <span>Sửa</span>
                        </button>
                        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded inline-flex items-center ml-1"
                            onClick={this.onDeleteTask}>
                            <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
                            <span>Xóa</span>
                        </button>
                    </div>
                </td>
            </tr>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        isDisplayForm: state.isDisplayForm
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onUpdateStatus: (id) => {
            dispatch(actions.updateStatus(id))
        },
        onDeleteTask: (id) => {
            dispatch(actions.deleteTask(id))
        },
        onCloseForm: () => {
            dispatch(actions.closeForm())
        },
        onOpenForm: () => {
            dispatch(actions.openForm())
        },
        onUpdateContent: (task) => {
            dispatch(actions.updateContent(task))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);