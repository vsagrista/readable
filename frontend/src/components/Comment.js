import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { flagCommentDeleted, voteComment, fetchPosts, fetchComments } from '../actions';
import * as HelperMethods from '../helpers/HelperMethods';

var moment = require('moment');

class Comment extends Component {

    sortItemsBy(option) {
        return HelperMethods.sortIdsBy(this.props.commentsById, option)
    }

    saveVote = (id, option,  e) => {
        e.preventDefault();
        this.props.voteComment(id, option);
        this.sortItemsBy(this.props.commentsSortedBy);
    }

    deleteComment = (commentId, parentId) => {
        
        this.props.flagCommentDeleted(commentId, this.props.comment.parentId)
        this.props.fetchPosts().then(() => this.props.fetchComments());   
    }

    render() {
        return (
            
            <div key={this.props.key}>
                <ul key={this.props.comment.id}>
                    <li key={this.props.comment.body}>
                        Body: {this.props.comment.body}
                    </li>
                    <li key={this.props.comment.author}>
                        Author: {this.props.comment.author}
                    </li>
                    <li key={this.props.comment.voteScore}>
                        Vote Score: {this.props.comment.voteScore}
                    </li>
                    <li key={this.props.comment.timestamp}>
                        Date: {moment(this.props.comment.timestamp).format("DD/MM/YYYY")}
                    </li>
                    <li>
                        <Link key={`edit-${this.props.comment.id}`} to={`/comments/${this.props.comment.id}`}>
                            Edit
                        </Link>
                        
                    </li>
                        <button title='upvote' onClick={(e) => {
                            this.saveVote(this.props.comment.id, {option: 'upVote'}, e)
                        }
                        } className='btn btn-default'><i className='glyphicon glyphicon-hand-right'></i></button>
                        <button title='upvote' onClick={(e) => {
                            this.saveVote(this.props.comment.id, {option: 'downVote'}, e)
                        }
                        } className='btn btn-default'><i className='glyphicon glyphicon-thumbs-down'></i></button>
                        <button title='remove' onClick={(e) => {
                            this.deleteComment(this.props.comment.id, this.props.comment.parentId)
                        }} className='btn btn-danger'>X</button>
                </ul>
                <hr></hr>
            </div>
        )
    }

}


function mapStateToProps({ comments }) {
    return {
        commentsById: comments.byId
    }
}


function mapDispatchToProps(dispatch) {
    return {
        voteComment: (id, option) => dispatch(voteComment(id, option)),
        flagCommentDeleted: (commentId, parentId) => dispatch(flagCommentDeleted(commentId, parentId)),
        fetchPosts: () => dispatch(fetchPosts()),
        fetchComments: () => dispatch(fetchComments())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);

