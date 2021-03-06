import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { votePost } from '../actions';
import { Link } from 'react-router-dom';

var moment = require('moment');

class Post extends Component {

    saveVote = (id, option, e) => {
        e.preventDefault();
        this.props.votePost(id, option);
    }

    render() {
        return (
            <ul>
                <li key={this.props.post.id}>
                    ID: {this.props.post.id}
                </li>
                <li key={this.props.post.title}>
                    Title: {this.props.post.title}
                </li>
                <li key={this.props.post.body}>
                    Body: {this.props.post.body}
                </li>
                <li key={this.props.post.author}>
                    Author: {this.props.post.author}
                </li>
                <li key={this.props.post.voteScore}>
                    Vote Score: {this.props.post.voteScore}
                </li>
                <li key={this.props.post.category}>
                    Category: {this.props.post.category}
                </li>
                <li key={this.props.post.timestamp}>
                    Date: {moment(this.props.post.timestamp).format("DD/MM/YYYY")}
                </li>
                {
                    this.props.singlePostView &&
                    <div>
                        <button title='Upvote' onClick={(e) => {
                            this.saveVote(this.props.post.id, { option: 'upVote' }, e)
                        }
                        } className='btn btn-default'><i className='glyphicon glyphicon-hand-right'></i></button>
                        <button title='Upvote' onClick={(e) => { 
                            this.saveVote(this.props.post.id, { option: 'downVote' }, e) }} className='btn btn-default'><i className='glyphicon glyphicon-thumbs-down'></i></button>
                        <Link to={`/editpost/${this.props.post.id}`}>
                            <button className='btn btn-info' title='Edit'><i className='glyphicon glyphicon-pencil'></i></button>
                        </Link>
                    </div>
                }

            </ul >
        )
    }

}


function mapStateToProps({ posts }) {
    return {
        postsById: posts.byId,
    }
}


function mapDispatchToProps(dispatch) {
    return {
        votePost: (id, option) => dispatch(votePost(id, option))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Post);
