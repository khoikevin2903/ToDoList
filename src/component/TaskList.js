import React, { Component } from 'react';
import Taskitem from './TaskItem';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class TaskList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterName: '',
            filterStatus: -1
        }
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        var filter = {
            name: name === 'filterName' ? value : this.state.filterName,
            status: name === 'filterStatus' ? value : this.state.filterStatus
        };

        this.props.onFilterTable(filter);
        this.setState({
            [name]: value
        });
    }

    render() {
        var { tasks, filterTable, keyword, sort } = this.props;

        //filter on table
        if (filterTable) {
			if (filterTable.name) {
				tasks = tasks.filter((task) => {
					return task.name.toLowerCase().indexOf(filterTable.name.toLowerCase()) !== -1;
				})
			}
			tasks = tasks.filter((task) => {
				if (filterTable.status === -1) return task;
				else return task.status === (filterTable.status === 0 ? true : false);
			});
        }

        //search 
        if (keyword) {
			tasks = tasks.filter((task) => {
				return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
			})
        }
        
        // sort
		if (sort.by === 'name') {
			tasks.sort((a, b) => {
				if (a.name.toLowerCase() > b.name.toLowerCase()) return sort.value;
				else if (a.name.toLowerCase() < b.name.toLowerCase()) return -sort.value;
				else return 0;
			})
		} else {
			tasks.sort((a, b) => {
				if (a.status > b.status) return -sort.value;
				else if (a.status < b.status) return sort.value;
				else return 0;
			})
        }
        
        var { filterName, filterStatus } = this.state;
        var elmTasks = tasks.map((task, index) => {
            return <Taskitem
                key={task.id}
                index={index}
                task={task}
            />
        });
        return (
            <div>
                <table className="border-separate border-2 border-gray-500">
                    <thead>
                        <tr>
                            <th className="border border-gray-400 px-4 py-2 text-gray-800">STT</th>
                            <th className="border border-gray-400 px-4 py-2 text-gray-800 w-2/5">Tên</th>
                            <th className="border border-gray-400 px-4 py-2 text-gray-800 w-1/4">Trạng Thái</th>
                            <th className="border border-gray-400 px-4 py-2 text-gray-800 w-2/5">Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-gray-200">
                            <td className="border border-gray-400 px-4 py-2"></td>
                            <td className="border border-gray-400 px-2 py-1">
                                <input type="text"
                                    name="filterName"
                                    value={filterName}
                                    onChange={this.onChange}
                                    className="w-full border-2 rounder-md p-1 pl-2" />
                            </td>
                            <td className="border border-gray-400 px-2 py-1">
                                <div className="inline-block relative w-full">
                                    <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-sm"
                                        name="filterStatus"
                                        value={filterStatus}
                                        onChange={this.onChange}>
                                        <option value={-1}>Tất cả</option>
                                        <option value={0}>Kích Hoạt</option>
                                        <option value={1}>Ẩn</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>
                            </td>
                            <td className="border border-gray-400 px-4 py-2"></td>
                        </tr>
                        {elmTasks}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        filterTable: state.filterTask,
        keyword: state.search,
        sort: state.sort
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onFilterTable: (filter) => {
            dispatch(actions.filterTask(filter));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList)