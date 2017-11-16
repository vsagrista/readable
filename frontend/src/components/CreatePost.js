import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import {
    createPost
} from '../actions';
import Category from './Category';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';

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
            }
        }
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

    savePost = (e) => {
        e.preventDefault();
        // add 1 to last ID from ID's array
        this.state.newPost.id = this.props.allPostsIds.length === 0 ? "0" : (parseInt(this.props.allPostsIds[this.props.allPostsIds.length - 1]) + 1).toString();
        this.props.createPost(this.state.newPost);
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
                        <button type='submit'>Create</button>
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
