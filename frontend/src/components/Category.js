import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import  CreatePost  from './CreatePost';
import ListTemplate from './ListTemplate';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';


class Category extends Component {
    render() {
        return (
            <div>
                <h1>Sport Category</h1>  
                <ListTemplate />     
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