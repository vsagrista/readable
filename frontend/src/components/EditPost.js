import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { updatePost } from '../actions';
import * as APIMethods from '../helpers/APIMethods';

class EditPost extends Component {

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

    componentDidMount() {
        let post = this.props.postsById[this.props.postId];
        if (post) {
            this.bindPostToState(post)
        } else { // make api call only if necessary
            APIMethods.getPost(this.props.postId).then((data) => this.bindPostToState(data))
        }
    }

    bindPostToState(post) {
        this.setState(state => ({
            ...state,
            newPost: {
                ...state.newPost,
                ...post
            }
        }))
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

    handleUpdatePost = (saved) => {
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
        let message = ok ? 'Post updated! ' : 'Error: the server must have some problem ';
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
        //APIMethods.updatePost(this.state.newPost.id, this.state.newPost).then((data) => {
            this.props.updatePost(this.state.newPost);
            this.handleUpdatePost(true);
            // console.log('edited', data)
        //    APIMethods.getPost(data.id).then((data) => console.log('post: ', data))
        //})
    }


    render() {
        // const { newPost } = this.state;
        return (
            <div>
                <div>
                    <h3>Edit post</h3>
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
                        <button disabled={this.state.isFetching} type='submit'>Save</button>
                        <p>{this.state.notification.message} <i className={this.state.notification.iconClassName}></i></p>
                    </form>
                </div>

            </div>
        )
    }
}

function mapStateToProps({ posts, categories }) {
    return {
        categories: categories,
        postsById: posts.byId,
        allPostsIds: posts.allIds
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updatePost: (data) => dispatch(updatePost(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditPost);;
