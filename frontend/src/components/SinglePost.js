import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { saveSortedCommentsIds, createComment } from '../actions';
import Comment from './Comment';
import Post from './Post';
import CreateComment from './CreateComment';
import * as HelperMethods from '../helpers/HelperMethods';


class SinglePost extends Component {

    sortItemsBy = (option) => {
        return HelperMethods.sortIdsBy(this.props.commentsById, option)
    }

    enableUpVote = () => {
        let totalComments = [];
        this.props.allCommentsIds.map(id => !this.props.commentsById[id].deleted && totalComments.push(id))
        return totalComments.length > 1;
    }

    render() {
        return (
            <div>
                Single Post
                {this.props.postsById[this.props.id] &&
                    <Post post={this.props.postsById[this.props.id]} singlePostView='true'></Post>}
                <div>
                    <CreateComment parentId={this.props.id} postDeleted={this.props.postDeleted}></CreateComment>
                    <div key='list-comments' className='list-comments'>
                        {this.props.commentsById &&
                            this.props.allCommentsIds.map((id) => {
                                return !this.props.commentsById[id].deleted &&
                                 this.props.commentsById[id].parentId === this.props.id && 
                                <Comment key={`comment-${id}`} comment={this.props.commentsById[id]} />
                            })
                         } 
                    </div>
                    <div className='sort-btn-div'>
                        {this.props.allCommentsIds.length > 1 && 
                         this.enableUpVote() &&
                            <button onClick={() => {
                                this.props.saveSortedCommentsIds({ allIds: this.sortItemsBy('voteScore'), commentsSortedBy: 'voteScore' });
                            }}>Sort by votes</button>}
                    </div>
                </div>

            </div>
        )
    }
}

function mapStateToProps({ comments, posts }) {
    return {
        commentsById: comments.byId,
        allCommentsIds: comments.allIds,
        postsSortedBy: posts.sortedBy,
        postsById: posts.byId,
        commentsSortedById: comments.sortedBy
    }
}

function mapDispatchToProps(dispatch) {
    return {
        saveSortedCommentsIds: (data) => dispatch(saveSortedCommentsIds(data)),
        createComment: (data) => dispatch(createComment(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);

