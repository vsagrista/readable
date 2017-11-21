import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { createComment } from '../actions';
const uuidv1 = require('uuid/v1');

class CreateComment extends Component {

    constructor() {
        super();
        this.state = {
            newComment: {
                id: '',
                timestamp: Date.now(),
                parentId: "",
                body: "",
                author: "",
                category: "",
                voteScore: 0,
                parentDeleted: false,
                deleted: false
            }
        }
        this.baseState = this.state;
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
        newCommentInput.id = uuidv1();
        this.setState(state => ({
            ...state,
            newComment: {
                ...state.newComment,
                ...newCommentInput
            }
        }))
    }

    saveComment = (e) => {
        e.preventDefault();
        this.props.createComment(this.state.newComment);
        this.resetForm();
    }

    resetForm = () => {
        this.setState(this.baseState);
    }

    render() {
        return (
            <div>
                <div>
                    <h3>Add comment</h3>
                    <form onSubmit={this.saveComment}>
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
