import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { updateComment } from '../actions';

class EditComment extends Component {

    constructor() {
        super();
        this.state = {
            editedComment: {},
            notification: {
                message: '',
                className: ''
            }
        }
        this.baseState = this.state;
    }

    componentDidMount() {
        this.setState(state => ({
            ...state,
            editedComment: {
                ...state.editedComment,
                ...this.props.commentsById[this.props.id]
            }
        }))
    }

    handleInputChange = (editedCommentInput) => {
        this.setState(state => ({
            ...state,
            editedComment: {
                ...state.editedComment,
                ...editedCommentInput
            }
        }))
    }

    saveComment = (e) => {
        e.preventDefault();
        this.props.updateComment(this.state.editedComment);
        this.notify();
        setTimeout(function () {
            this.resetForm();
        }.bind(this), 2000);
    }

    notify = () => {
        let iconClassName = 'glyphicon glyphicon-send';
        let message = 'Comment edited! ';
        this.setState(state => ({
            ...state,
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

    render() {
        return (
            <div className='display-wrapper'>
                <h3>Edit Comment</h3>
                <form onSubmit={this.saveComment}>
                    <input key="author"
                        name="author"
                        placeholder="author"
                        value={this.state.editedComment.author}
                        onChange={e => this.handleInputChange({ author: e.target.value })}
                    />
                    <input key="body"
                        name="body"
                        placeholder="body"
                        value={this.state.editedComment.body}
                        onChange={e => this.handleInputChange({ body: e.target.value })}
                    />
                    <button type='submit'>Save</button>
                    <p>{this.state.notification.message} <i className={this.state.notification.iconClassName}></i></p>
                </form>
            </div>
        )
    }
}

function mapStateToProps({ comments }) {
    return {
        commentsById: comments.byId
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateComment: (data) => dispatch(updateComment(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditComment);;
