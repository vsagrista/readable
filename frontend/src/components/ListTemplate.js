import React, { Component } from 'react';
import '../App.css';
import CreateComment from './CreateComment'
import { connect } from 'react-redux';
import {
    upvotePost,
    upvoteComment
} from '../actions';
import { Link } from 'react-router-dom';
import * as HelperMethods from '../helpers/HelperMethods';
var moment = require('moment');

class ListTemplate extends Component {

    listContent = (type) => {
        switch (type) {
            case 'categories':
                return this.renderCategories();
            case 'post': // single post view
                return this.postTemplate(this.props.postsById[this.props.singlePostId]);
            case 'posts': // Root view
                return this.renderPosts();
            case 'allPostsByCategory':
                return this.renderPostsByCategory();
            case 'allComments':
                return this.renderComments();
            default:
                return <div></div>
        }
    }

    renderCategories = () => {
        return (
            this.props.categories.map(category =>
                <Link key={category.name} to={'/category/' + category}>
                    <li className='list-group-item justify-content-between' key={category}>{category.toUpperCase()}
                        <span className="badge badge-default badge-pill">
                            {HelperMethods.countPostsByCategory(this.props.allPostsId, this.props.postsById, category)}
                        </span>
                    </li>
                </Link>
            )
        );
    }

    renderPostsByCategory = () => {
        return this.props.allPostsId.map(id => (
            this.props.postsById[id].category === this.props.category ?
                this.postTemplate(this.props.postsById[id], true) :
                null
        ));
    }

    renderPosts = () => {
        return (
            this.props.allPostsId.map(id =>
                <Link to={'/post/' + this.props.postsById[id].id}>
                    <li className='list-group-item text-left'>{this.props.postsById[id].title}
                        <span className="badge badge-default badge-pill">
                            {this.props.postsById[id].voteScore}
                        </span>
                    </li>
                </Link>
            )
        )
    }

    upvote = (type, id, e) => {
        e.preventDefault();
        if (type === 'post') {
            let voteScore = this.props.postsById[id].voteScore + 1;
            this.props.upvotePost({ id, voteScore })
        } else {
            console.log(type, id)
            let voteScore = this.props.commentsById[id].voteScore + 1;
            this.props.upvoteComment({ id, voteScore })
            this.sortItemsBy(this.props.commentsSortedBy)
            console.log('this.props: ', this.props)
        }

    }

    sortItemsBy(option) {
        return HelperMethods.sortIdsBy(this.props.commentsById, option)
    }

    postTemplate = (post, isNotSingle) => {
        return (
            <div>
                <li key={post.id}>
                    ID: {post.id}
                </li>
                <li key={post.title}>
                    Title: {post.title}
                </li>
                <li key={post.body}>
                    Body: {post.body}
                </li>
                <li key={post.author}>
                    Author: {post.author}
                </li>
                <li key={post.voteScore}>
                    Vote Score: {post.voteScore}
                </li>
                <li key={post.category}>
                    Category: {post.category}
                </li>
                <li key={post.timestamp}>
                    Date: {moment(post.timestamp).format("DD/MM/YYYY")}
                </li>
                {isNotSingle ?
                    <div>
                        <Link to={'/post/' + post.id}>
                            <li className='list-group-item text-left'>
                                view
                            </li>
                        </Link>
                    </div>
                    :
                    <div>
                        <button onClick={(e) => { this.upvote('post', post.id, e) }} className='btn btn-success'>Upvote</button>
                        <div>
                            <CreateComment parentId={post.id} postDeleted={post.postDeleted}></CreateComment>
                            <div>{this.renderComments(post.id)}</div>
                        </div>
                    </div>

                }
            </div>
        )
    }

    renderComments = (parentId) => {
        return this.props.allCommentsById.map((id) => {
            if (this.props.commentsById[id].parentId === parentId)
                return this.commentTemplate(this.props.commentsById[id]);
        });
    }

    commentTemplate = (comment) => {
        return (
            <div>
                <ul>
                    <li key={comment.body}>
                        Body: {comment.body}
                    </li>
                    <li key={comment.author}>
                        Author: {comment.author}
                    </li>
                    <li key={comment.voteScore}>
                        Vote Score: {comment.voteScore}
                    </li>
                    <li key={comment.category}>
                        Category: {comment.category}
                    </li>
                    <li key={comment.timestamp}>
                        Time: {(comment.timestamp).toString()}
                    </li>
                    <button onClick={(e) => {
                        this.upvote('comment', comment.id, e)
                    }
                    } className='btn btn-success'>Upvote</button>
                </ul>
                <hr></hr>
            </div>
        )
    }

    render() {
        return (
            <div>
                Hello From list component
                {this.listContent(this.props.type)}
            </div>
        )
    }

}

function mapStateToProps({ posts, comments, categories }) {
    return {
        categories: categories.names,
        postsById: posts.byId, allPostsId: posts.allIds,
        commentsById: comments.byId, allCommentsById: comments.allIds,
        postsSortedBy: posts.sortedBy,
        commentsSortedBy: comments.sortedBy
    }
}


function mapDispatchToProps(dispatch) {
    return {
        upvotePost: (data) => dispatch(upvotePost(data)),
        upvoteComment: (data) => dispatch(upvoteComment(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ListTemplate);;
