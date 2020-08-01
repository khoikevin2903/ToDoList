import React, { Component } from 'react';
import Swap from './../icon/sort.svg';
import SortAz from './../icon/az.svg';
import SortZa from './../icon/za.svg';
import Tick from './../icon/tick.svg';
import ClassNames from 'classnames';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class TaskSortControl extends Component {

    constructor(props) {
        super(props);
        this.state = {
            onMenu: false,
            onTick: {
                by: 'name',
                value: 1
            }
        }
    }

    onMenu = () => {
        this.setState({
            onMenu: !this.state.onMenu
        });
    }

    onClick = (sortBy, sortValue) => {
        this.setState({
            onMenu: false,
            onTick: {
                by: sortBy,
                value: sortValue
            }
        });
        this.props.onSort({
            by: sortBy,
            value: sortValue
        });
    }

    render() {  
        return (
            <div>
                <div className="inline-block relative w-full">
                    <div>
                        <button className="bg-blue-600 hover:bg-blue-800 font-bold py-2 px-4 rounded inline-flex items-center relative"
                            onClick={this.onMenu}>
                            <span className="text-white">Sắp Xếp</span>
                            <img src={Swap} alt="" className="fill-current w-4 h-4 ml-2" />
                        </button>
                        <ul className={ClassNames(
                            'absolute pl-2 border border-gray-500 mt-1 z-50 bg-gray-100',
                            {
                                'hidden': this.state.onMenu === false
                            }
                        )}>
                            <li className="flex mt-2 hover:bg-gray-400 p-2 mr-2"
                                onClick={() => this.onClick('name', 1)}>
                                <img src={SortAz} alt="" width={16} className="ml-1 mr-2" />
                                <span>Từ A-Z </span>
                                <img src={(this.state.onTick.by === 'name' && this.state.onTick.value === 1 ? Tick : '')}
                                    alt="" width={16} className="ml-4" />
                            </li>
                            <li className="flex p-2 mr-2 hover:bg-gray-400"
                                onClick={() => this.onClick('name', -1)}>
                                <img src={SortZa} alt="" width={16} className="ml-1 mr-2" />
                                <span>Từ Z-A </span>
                                <img src={(this.state.onTick.by === 'name' && this.state.onTick.value === -1 ? Tick : '')}
                                    alt="" width={16} className="ml-4" />
                            </li>
                            <li className="flex p-2 mr-2 mt-2 hover:bg-gray-400"
                                onClick={() => this.onClick('status', 1)}>
                                <span>Trạng Thái Kích Hoạt </span>
                                <img src={(this.state.onTick.by === 'status' && this.state.onTick.value === 1 ? Tick : '')}
                                    alt="" width={16} className="ml-4" />
                            </li>
                            <li className="flex p-2 mr-2 mb-2 hover:bg-gray-400"
                                onClick={() => this.onClick('status', -1)}>
                                <span>Trạng Thái Ẩn </span>
                                <img src={(this.state.onTick.by === 'status' && this.state.onTick.value === -1 ? Tick : '')}
                                    alt="" width={16} className="ml-4" />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch, props) => {
	return {
        onSort: (sort) => {
            dispatch(actions.sortTask(sort));
        }
	};
};



export default connect(mapStateToProps, mapDispatchToProps)(TaskSortControl);