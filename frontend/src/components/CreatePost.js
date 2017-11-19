import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import {
    createPost
} from '../actions';
import * as APIMethods from '../helpers/APIMethods';

class CreatePost extends Component {

    constructor() {
        super();
        this.state = {
            newPost: {
                id: "",
                timestamp: Date.now(),
                title: "",
                body: "",
                author: "",
                category: "",
                voteScore: 0,
                deleted: null
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
        setTimeout(function() {
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
        // add 1 to last ID from ID's array
        this.state.newPost.id = this.props.allPostsIds.length === 0 ? "0" : (parseInt(this.props.allPostsIds[this.props.allPostsIds.length - 1]) + 1).toString();
        APIMethods.addPost(this.state.newPost).then((data) => {
            console.log('data: ', data)
            this.props.createPost(this.state.newPost);
            this.handleSavePost(true);
        }).then(()=> APIMethods.getPosts().then((data)=> console.log('posts: ', data)))
    }


    render() {
        // const { newPost } = this.state;
        return (
            <div>
                <div>
                    <h3>Create new post</h3>
                    <form onSubmit={this.savePost}>
                        <input key="title"
                            name="title"
                            placeholder="title"
                            value={this.state.newPost.title}
                            onChange={e => this.handleInputChange({ title: e.target.value })}
                        />
                        <input key="body"
                            name="body"
                            placeholder="body"
                            value={this.state.newPost.body}
                            onChange={e => this.handleInputChange({ body: e.target.value })}
                        />
                        <input key="author"
                            name="author"
                            placeholder="author"
                            value={this.state.newPost.author}
                            onChange={e => this.handleInputChange({ author: e.target.value })}
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

            </div>
        )
    }
}

function mapStateToProps({ categories, posts }) {
    return {
        categories: categories,
        postsById: posts.postsById, allPostsIds: posts.allIds
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createPost: (data) => dispatch(createPost(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);;
