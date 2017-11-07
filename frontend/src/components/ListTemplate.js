import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as HelperMethods from '../helpers/HelperMethods';
var moment = require('moment');

class ListTemplate extends Component {

    constructor() {
        super();
        console.log(this.props);
    }

    listContent = (type) => {
        switch (type) {
            case 'categories':
                return this.renderCategories();
            case 'post': // single post view
                return this.postTemplate(this.props.postsById[this.props.singlePostId]);
            case 'allPosts': // Root view
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
        this.props.allPostsId.map(id => (
            this.postTemplate(this.props.postsById[id], true)
        ));
    }

    postTemplate = (post, link) => {
        return (
            <div>
                <ul>
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
                    {link ?
                        <div>
                            <Link to={'/post/' + post.id}>View</Link>
                            {console.log('link to: ', '/posts/' + post.id)}
                        </div>
                        : ''}
                </ul>

            </div>
        )
    }

    renderComments = () => {
        return this.props.allCommentsById.map(id => (
            this.commentTemplate(this.props.commentsById[id])
        ));
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
                </ul>
            </div>
        )
    }

    render() {
        console.log(this.props);
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
    }
}


export default connect(mapStateToProps)(ListTemplate);;
