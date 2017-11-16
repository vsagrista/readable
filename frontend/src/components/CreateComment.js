import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import {
    createComment
} from '../actions';
import Category from './Category';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';

class CreateComment extends Component {

    constructor() {
        super();
        this.state = {
            newComment: {
                id: "",
                timestamp: Date.now(),
                parentId: "",
                body: "",
                author: "",
                category: "",
                voteScore: 0,
                parentDeleted: false
            }
        }
    }

    componentDidMount() {
        let newComment = this.state.newComment;
        newComment.parentId = this.props.parentId;
        newComment.parentDeleted = this.props.parentDeleted;
        this.setState({
            state: newComment
        })
    }

    handleInputChange = (newCommentInput) => {
        this.setState(state => ({
            ...state,
            newComment: {
                ...state.newComment,
                ...newCommentInput
            }
        }))
    }

    savePost = (e) => {
        e.preventDefault();
        // add 1 to last ID from ID's array
        this.state.newComment.id = this.props.allCommentsIds.length === 0 ? "0" : (parseInt(this.props.allCommentsIds[this.props.allCommentsIds.length - 1]) + 1).toString();
        this.props.createComment(this.state.newComment);
    }

    render() {
        // const { newComment } = this.state;
        return (
            <div>
                <div>
                    <h3>Add comment</h3>
                    <form onSubmit={this.savePost}>
                        <input key="author"
                            name="author"
                            placeholder="author"
                            value={this.state.newComment.author}
                            onChange={e => this.handleInputChange({ author: e.target.value })}
                        />
                        <input key="body"
                            name="body"
                            placeholder="body"
                            value={this.state.newComment.body}
                            onChange={e => this.handleInputChange({ body: e.target.value })}
                        />
                        <button type='submit'>Add</button>
                    </form>
                </div>

            </div>
        )
    }
}

function mapStateToProps({ categories, comments }) {
    return {
        commentsById: comments.byId, allCommentsIds: comments.allIds
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createComment: (data) => dispatch(createComment(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateComment);;
