import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class TaskSearchControl extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword: ''
        }
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
    }

    onSearch = () => {
        this.props.onSearch(this.state.keyword);
    }

    render() {
        var { keyword } = this.state;
        return (
            <div className="flex w-full">
                <input className="w-full text-sm bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal"
                    type="search"
                    name="keyword"
                    placeholder="Nhập từ khóa"
                    value={keyword}
                    onChange={this.onChange}>
                </input>
                <button className="bg-blue-600 delay-100 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                    onClick={this.onSearch}>
                    Tìm
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSearch: (keyword) => {
            dispatch(actions.searchTask(keyword));
        }
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(TaskSearchControl);;