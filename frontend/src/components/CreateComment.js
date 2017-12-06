import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { createComment, fetchPosts, fetchComments } from '../actions';
const uuidv1 = require('uuid/v1');

class CreateComment extends Component {

    constructor() {
        super();
        this.state = {
            newComment: {
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
        this.props.createComment(this.state.newComment).then(() => {
            this.props.fetchPosts().then(() => this.props.fetchComments());    
        })
        this.resetForm();
    }

    resetForm = () => {
        this.setState(this.baseState);
    }

    render() {
        return (
            <div className='container-fluid'>
                <h5 className='text-uppercase'>Add comment</h5>
                <form onSubmit={this.saveComment}>
                    <input key="author"
                        name="author"
                        placeholder="author"
                        value={this.state.newComment.author}
                        onChange={e => this.handleInputChange({ author: e.target.value })}
                        required
                    />
                    <input key="body"
                        name="body"
                        placeholder="body"
                        value={this.state.newComment.body}
                        onChange={e => this.handleInputChange({ body: e.target.value })}
                        required
                    />
                    <button type='submit'>Add</button>
                </form>
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
        createComment: (data) => dispatch(createComment(data)),
        fetchPosts: () => dispatch(fetchPosts()),
        fetchComments: () => dispatch(fetchComments())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateComment);;
