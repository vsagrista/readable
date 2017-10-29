import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import {
    createPost
} from '../actions';

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
        console.log(this.state);
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
        this.state.newPost.id = this.props.allIds.length === 0 ? "0" : (parseInt(this.props.allIds[this.props.allIds.length -1 ]) + 1).toString();
        this.props.createPost(this.state.newPost);
    }

    render() {
        // const { newPost } = this.state;
        return (
            <div>
                <div>
                    <h3>Create new post</h3>
                    <form onSubmit={this.savePost}>
                        <input
                            name="title"
                            placeholder="title"
                            value={this.state.newPost.title}
                            onChange={e => this.handleInputChange({ title: e.target.value })}
                        />
                        <button type='submit'>Create</button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        byId: state.byId, allIds: state.allIds
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createPost: (data) => dispatch(createPost(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);;
