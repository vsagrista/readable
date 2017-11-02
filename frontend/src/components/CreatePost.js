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
                timestamp: null,
                title: "",
                body: "",
                author: "",
                category: "",
                voteScore: null,
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
        this.state.newPost.id = this.props.allIds.length === 0 ? "0" : (parseInt(this.props.allIds[this.props.allIds.length - 1]) + 1).toString();
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
                        <select  value={this.props.Selected}>
                            {["Sport", "Politics", "Tech"].map(category => (
                                <option key={category} value={category}
                                >{category}</option>
                                )
                            )}
                        </select>
                        <button type='submit'>Create</button>
                    </form>
                </div>
                <div>
                    <Link to='/Category'>Category</Link>
                </div>
                <div>
                    <Route exact path='/Category' render={() => (
                        <Category />
                    )} />
                </div>
            </div>
        )
    }
}

function mapStateToProps({ posts }) {
    return {
        byId: posts.byId, allIds: posts.allIds
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createPost: (data) => dispatch(createPost(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);;
