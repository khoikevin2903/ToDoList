import React, { Component } from 'react';
import Close from './../icon/close.svg';
import Closebtn from './../icon/closebtn.svg';
import Plus from './../icon/add.svg';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            status: false
        }
    }

    onCloseForm = () => {
        this.props.onCloseForm();
        this.onClear();
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if (name === 'status') {
            value = target.value === 'true' ? true : false;
        }
        this.setState({
            [name]: value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSaveTask(this.state);
        this.onClear();
        this.onCloseForm();
    }

    onClear = () => {
        this.setState({
            name: '',
            status: false
        });
    }

    UNSAFE_componentWillMount() {
        if (this.props.itemEditing && this.props.itemEditing.id !== null) {
            this.setState({
                id: this.props.itemEditing.id,
                name: this.props.itemEditing.name,
                status: this.props.itemEditing.status
            });
        }
        else {
            this.onClear();
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.itemEditing) {
            this.setState({
                id: nextProps.itemEditing.id,
                name: nextProps.itemEditing.name,
                status: nextProps.itemEditing.status
            });
        }
        else {
            this.onClear();
        }
    }

    render() {
        return (
            <div className="border border-gray-300" >
                <div className="flex justify-between border-b px-4 py-2 bg-green-200 text-green-700">
                    <h3>{this.state.id === '' ? 'Thêm công việc' : 'Chỉnh sửa công việc'}</h3>
                    <img src={Close} alt="" width={16} onClick={this.onCloseForm} />
                </div>

                <form className="p-4">
                    <div className="mb-4">
                        <label className="block text-black-500 font-bold text-sm">
                            Tên :
                        </label>
                        <input type="text"
                            name="name"
                            value={this.state.name}
                            onChange={this.onChange}
                            className="w-full border-2 mt-2 pl-4" />
                    </div>

                    <div>
                        <label className="block text-black-500 font-bold text-sm">
                            Trạng Thái :
                        </label>
                        <div className="inline-block relative w-full">
                            <select name="status"
                                value={this.state.status}
                                onChange={this.onChange}
                                className="mt-2 block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline text-sm">
                                <option value={true}>Kích Hoạt</option>
                                <option value={false}>Ẩn</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-center">
                            <button type="submit" onClick={this.onSubmit}
                                className="mr-2 bg-yellow-500 delay-100 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                                <img src={Plus} alt="" width={13} className="fill-current w-4 h-4 mr-2" />
                                <span>lưu Lại</span>
                            </button>
                            <button type="button" onClick={this.onClear}
                                className="ml-2 bg-red-600 delay-100 hover:bg-red-800 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                                <img src={Closebtn} alt="" width={13} className="fill-current w-4 h-4 mr-2" />
                                <span>Hủy Bỏ</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        itemEditing: state.itemEditing
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSaveTask: (task) => {
            dispatch(actions.saveTask(task))
        },
        onCloseForm: () => {
            dispatch(actions.closeForm())
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm)