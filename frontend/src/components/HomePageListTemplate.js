import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { flagPostToDeleted, votePost, fetchComments } from '../actions';
import * as HelperMethods from '../helpers/HelperMethods';
var moment = require('moment');

class HomePageListTemplate extends Component {


    saveVote = (id, option, e) => {
        e.preventDefault();
        this.props.votePost(id, option);
    }


    render() {
        return (
                <ul key={`list-${this.props.type}`} className='list-group'>
                    {this.props.items.map(item => (
                        this.props.type === 'category' ?
                            <li className='list-group-item justify-content-between' key={item}>
                                <Link key={`list-${item}`} to={`/${item}`}>
                                   - {item.toUpperCase()} -
                                </Link>
                                <span key={`span-${item}`} className="badge badge-default badge-pill">
                                    {
                                        HelperMethods.countPostsByCategory(this.props.allIds, this.props.byId, item)
                                    }
                                </span>
                            </li>

                            :

                            this.props.byId[item] &&
                            !this.props.byId[item].deleted &&

                            <li className='list-group-item justify-content-between' key={item}>
                                {/* Link to item */}
                                <Link className='text-uppercase' key={`list-${item}`} to={`/${this.props.byId[item].category}/` + item}>
                                    {this.props.byId[item].title}
                                </Link>
                                {/* VoteScore */}
                                <span key={`span-${item}`} className="badge badge-default badge-pill">
                                    {
                                        this.props.sortedBy === 'voteScore'
                                            ? this.props.byId[item].voteScore
                                            : moment(this.props.byId[item].timestamp).format('DD/MM/YYYY')
                                    }
                                </span>
                                {/* Author */}
                                <div>
                                   - Author: {this.props.byId[item].author} - Comment count: {this.props.byId[item].commentCount}
                                   
                                   
                                </div>
                                <div className='post-settings'>
                                    {/* Delete */}
                                    <button onClick={() => (this.props.flagPostToDeleted(item))} className='remove-btn'>delete</button>
                                    {/* Edit */}
                                    <Link to={`/editpost/${item}`}>
                                        <button className='btn btn-default edit-btn' title='Edit'><i className='glyphicon glyphicon-pencil'></i></button>
                                    </Link>
                                    {/* Vote */}
                                    <button title='Upvote' onClick={(e) => {
                                        this.saveVote(item, { option: 'upVote' }, e)
                                    }
                                    } className='btn btn-default'><i className='glyphicon glyphicon-hand-right upvote-btn'></i></button>
                                    <button title='Downvote' onClick={(e) => {
                                        this.saveVote(item, { option: 'downVote' }, e)
                                    }} className='btn btn-default'><i className='glyphicon glyphicon-thumbs-down downvote-btn'></i></button>
                                </div>
                            </li>
                    ))}
                </ul>
        );
    }
}

function mapStateToProps({ posts, comments }) {
    return {
        sortedBy: posts.sortedBy,
        commentsById: comments.byId,
        allCommentsIds: comments.allIds
    }
}

function mapDispatchToProps(dispatch) {
    return {
        flagPostToDeleted: (postId) => dispatch(flagPostToDeleted(postId)),
        votePost: (id, option) => dispatch(votePost(id, option)),
        fetchComments: (postId) => dispatch(fetchComments(postId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePageListTemplate);;