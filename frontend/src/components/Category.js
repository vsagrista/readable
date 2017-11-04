import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import ListTemplate from './ListTemplate';


class Category extends Component {
    render() {
        return (
            <div>
                <h1>{this.props.name} Category</h1>  
                <ListTemplate type='allPosts'/>     
            </div>
        );
    }
}


function mapStateToProps({ posts, comments }) {
    return {
        byId: posts.byId, allIds: posts.allIds
    }
}


export default connect(mapStateToProps)(Category);;