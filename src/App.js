import React, { Component } from 'react';
import Taskform from './component/TaskForm';
import Plus from './icon/add.svg';
import Control from './component/TaskControl';
import Listitem from './component/TaskList';
import ClassNames from 'classnames';
import { connect } from 'react-redux';
import * as actions from './actions/index';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			keyword: '',
			sort: {
				by: 'name',
				value: 1
			}
		}
	}

	onToggleForm = () => {
		var {itemEditing} = this.props;
		if(itemEditing && itemEditing.id !== ''){
			
		}else {
			this.props.onToggleForm();
		}
		this.props.onClearTask({
			id: '',
			name: '',
			status: false
		});
	}

	render() {
		var { isDisplayForm } = this.props;
		return (
			<div className="w-4/5 ml-auto mr-auto font-sans mt-10">
				<div className="flex justify-center text-3xl pb-4 mb-6 border-b border-gray-500">
					<h1>Quản Lý Công Việc</h1>
				</div>
				<div className="w-full flex">
					<div className={ClassNames(
						'w-1/3',
						{
							'hidden': isDisplayForm === false
						}
					)}>
						<Taskform />
					</div>
					<div className={ClassNames(
						{
							'w-2/3 ml-10': isDisplayForm === true
						},
						{
							'w-full': isDisplayForm === false
						}
					)}>
						<div className="">
							<div>
								<button className="bg-blue-600 delay-100 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded inline-flex items-center"
									onClick={this.onToggleForm}>
									<img src={Plus} alt="" width={13} className="fill-current w-4 h-4 mr-2" />
									<span>Thêm công việc</span>
								</button>
							</div>
							<div className="w-full mt-4">
								<Control />
							</div>
						</div>
						<div className="w-full mt-4">
							<Listitem />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isDisplayForm: state.isDisplayForm,
		itemEditing: state.itemEditing
	};
};

const mapDispatchToProps = (dispatch, props) => {
	return {
		onToggleForm: () => {
			dispatch(actions.toggleForm())
		},
		onClearTask: (task) => {
            dispatch(actions.updateContent(task))
        }
	};
};



export default connect(mapStateToProps, mapDispatchToProps)(App);
