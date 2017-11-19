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

    render() {
        return (
            <div>
                Single Post
                {this.props.postsById[this.props.id] &&
                    <Post post={this.props.postsById[this.props.id]} singlePostView='true'></Post>}
                <div>
                    <CreateComment parentId={this.props.id} postDeleted={this.props.postDeleted}></CreateComment>
                    <div className='list-comments'>
                        {this.props.commentsById &&
                            this.props.allCommentsIds.map((id) => {
                                return this.props.commentsById[id].parentId === 
                                this.props.id && 
                                <Comment comment={this.props.commentsById[id]} />
                            })
                         } 
                    </div>
                    <div className='sort-btn-div'>
                        {this.props.allCommentsIds.length > 1 &&
                            <button onClick={() => {
                                var option = this.props.commentsSortedBy === 'voteScore' ? 'timestamp' : 'voteScore';
                                this.props.saveSortedCommentsIds({ allIds: this.sortItemsBy(option), commentsSortedBy: option });
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

