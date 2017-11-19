import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { upvoteComment } from '../actions';
import * as HelperMethods from '../helpers/HelperMethods';

var moment = require('moment');

class Comment extends Component {

    sortItemsBy(option) {
        return HelperMethods.sortIdsBy(this.props.commentsById, option)
    }

    upvote = (type, id, e) => {
        e.preventDefault();
        let voteScore = this.props.commentsById[id].voteScore + 1;
        this.props.upvoteComment({ id, voteScore })
        this.sortItemsBy(this.props.commentsSortedBy)
    }

    render() {
        console.log(this.props)
        return (
            <div>
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
                    <li key={this.props.comment.category}>
                        Category: {this.props.comment.category}
                    </li>
                    <li key={this.props.comment.timestamp}>
                        Date: {moment(this.props.comment.timestamp).format("DD/MM/YYYY")}
                    </li>
                    <li>
                        <Link key={`edit-${this.props.comment.id}`} to={`/comments/${this.props.comment.id}`}>
                            Edit
                        </Link>
                    </li>
                    <button onClick={(e) => {
                        this.upvote('comment', this.props.comment.id, e)
                    }
                    } className='btn btn-default'><i className='glyphicon glyphicon-hand-right'></i></button>
                </ul>
                <hr></hr>
            </div>
        )
    }

}


function mapStateToProps({ posts, comments, categories }) {
    return {
        commentsById: comments.byId
    }
}


function mapDispatchToProps(dispatch) {
    return {
        upvoteComment: (data) => dispatch(upvoteComment(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);

