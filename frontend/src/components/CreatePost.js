import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class CreatePost extends Component {

    constructor() {
        super();
        this.state = {
            newPost: {
                title: "",
                body: "",
                author: "",
                category: "",
                voteScore: 0,
                deleted: false,
                commentCount: 0
            },
            isFetching: false,
            buttonDisabled: false,
            notification: {
                iconClassName: '',
                message: ''
            }
        }
        this.baseState = this.state;
    }

    handleInputChange = (newPostInput) => {
        this.setState(state => ({
            ...state,
            newPost: {
                ...state.newPost,
                ...newPostInput
            }
        }))
    }

    handleSavePost = (saved) => {
        if (saved) {
            this.showNotification(saved);
        }
        else {
            this.showNotification(false);
        }
        setTimeout(function () {
            this.resetForm()
        }.bind(this), 2000);
    }

    showNotification = (ok) => {
        let iconClassName = ok ? 'glyphicon glyphicon-send' : 'glyphicon glyphicon-remove-sign';
        let message = ok ? 'Post saved! ' : 'Error: the server must have some problem ';
        this.setState(state => ({
            ...state,
            isFetching: {
                ...state.isFetching,
                isFetching: true
            },
            notification: {
                ...state.notification,
                iconClassName,
                message
            }
        }))
    }

    resetForm = () => {
        this.setState(this.baseState);
    }

    savePost = (e) => {
        e.preventDefault();
        this.setState({ isFetching: true })
        this.props.createPost(this.state.newPost);
        this.handleSavePost(true);
    }


    render() {
        return (
            <div className='display-wrapper'>
                <h3>Create new post</h3>
                <form onSubmit={this.savePost}>
                    <input key="title"
                        name="title"
                        placeholder="title"
                        value={this.state.newPost.title}
                        onChange={e => this.handleInputChange({ title: e.target.value })}
                        required
                    />
                    <input key="body"
                        name="body"
                        placeholder="body"
                        value={this.state.newPost.body}
                        onChange={e => this.handleInputChange({ body: e.target.value })}
                        required
                    />
                    <input key="author"
                        name="author"
                        placeholder="author"
                        value={this.state.newPost.author}
                        onChange={e => this.handleInputChange({ author: e.target.value })}
                        required
                    />
                    <p>Category</p>
                    <select value={this.state.newPost.category}
                        onChange={e => this.handleInputChange({ category: e.target.value })}
                        required
                    >
                        <option disabled value="">-- Category --</option>
                        {this.props.categories.names.map(category => (
                            <option key={category} value={category}
                            >{category}</option>
                        )
                        )}
                    </select>
                    <button disabled={this.state.isFetching} type='submit'>Create</button>
                    <p>{this.state.notification.message} <i className={this.state.notification.iconClassName}></i></p>
                </form>
            </div>
        )
    }
}

function mapStateToProps({ categories, posts }) {
    return {
        categories: categories,
        postsById: posts.byId,
        allPostsIds: posts.allIds
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createPost: (data) => dispatch(createPost(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);;
