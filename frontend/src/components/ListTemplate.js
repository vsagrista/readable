import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import {
    createPost
} from '../actions';

class ListTemplate extends Component {
    
    render() {
        console.log(this.props);
        return (
            <div>
                Hello List
            </div>
        )
    }

}

function mapDispatchToProps(dispatch) {
    return {
        createPost: (data) => dispatch(createPost(data))
    }
}


export default connect(null, mapDispatchToProps)(ListTemplate);;
