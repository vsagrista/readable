import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import {
    upvotePost,
    upvoteComment
} from '../actions';
import { Link } from 'react-router-dom';
import * as HelperMethods from '../helpers/HelperMethods';
import * as APIMethods from '../helpers/APIMethods';
var moment = require('moment');

class Post extends Component {

    upvote = (id, e) => {
        e.preventDefault();
        let voteScore = this.props.postsById[id].voteScore + 1;
        this.props.upvotePost({ id, voteScore })
    }

    render() {
        return (
            <ul>
                <li key={this.props.post.id}>
                    ID: {this.props.post.id}
                </li>
                <li key={this.props.post.title}>
                    Title: {this.props.post.title}
                </li>
                <li key={this.props.post.body}>
                    Body: {this.props.post.body}
                </li>
                <li key={this.props.post.author}>
                    Author: {this.props.post.author}
                </li>
                <li key={this.props.post.voteScore}>
                    Vote Score: {this.props.post.voteScore}
                </li>
                <li key={this.props.post.category}>
                    Category: {this.props.post.category}
                </li>
                <li key={this.props.post.timestamp}>
                    Date: {moment(this.props.post.timestamp).format("DD/MM/YYYY")}
                </li>
                {
                    this.props.singlePostView &&
                    < button onClick={(e) => { this.upvote(this.props.post.id, e) }} className='btn btn-default'><i className='glyphicon glyphicon-hand-right'></i></button>
                }

            </ul >
        )
    }

}


function mapStateToProps({ posts }) {
    return {
        postsById: posts.byId, 
    }
}


function mapDispatchToProps(dispatch) {
    return {
        upvotePost: (data) => dispatch(upvotePost(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Post);
