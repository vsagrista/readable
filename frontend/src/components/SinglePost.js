import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { saveSortedCommentsIds, createComment, fetchComments, flagPostToDeleted } from '../actions';
import Comment from './Comment';
import Post from './Post';
import CreateComment from './CreateComment';
import NotFound from './NotFound';
import * as HelperMethods from '../helpers/HelperMethods';
import { Redirect } from 'react-router'



class SinglePost extends Component {

    constructor() {
        super();
        this.state = {
            commentsEnabled: false,
            postDeleted: false,
            postFetchedIsDeleted: false
        }
    }

    componentDidMount() {
        this.props.fetchComments(this.props.id).then(() => {
            let isPostDeleted = typeof this.props.postsById[this.props.id] === 'undefined';
            this.setState({
                commentsEnabled: this.commentsAreEnabled(),
                postFetchedIsDeleted: isPostDeleted
            })
        })

    }

    deletePost = (postId) => {
        this.props.flagPostToDeleted(postId)
        this.setState({
            postDeleted: true
        });
    }

    sortItemsBy = (option) => {
        return HelperMethods.sortIdsBy(this.props.commentsById, option)
    }

    commentsAreEnabled = () => {
        let totalComments = [];
        this.props.allCommentsIds.map(id => !this.props.commentsById[id].deleted && totalComments.push(id))
        return totalComments.length > 1;
    }

    render() {
        if (this.state.postDeleted) {
            return <Redirect to='/' />
        } else if (this.props.postsById[this.props.id] &&
            !this.props.postsById[this.props.id].deleted) {
            return (
                <div className='container-fluid'>
                    {/*List Post*/}
                    <Post post={this.props.postsById[this.props.id]} singlePostView='true'></Post>
                    {/* Delete */}
                    <button onClick={() => (this.deletePost(this.props.id))} className='remove-btn'>delete</button>
                    <div>

                        {/*Create Comment*/}
                        {this.props.postsById[this.props.id] &&
                            !this.props.postsById[this.props.id].deleted &&
                            <CreateComment parentId={this.props.id} postDeleted={this.props.postDeleted}></CreateComment>
                        }

                        {/*List Comments*/}
                        <div key='list-comments' className='list-comments'>
                            {this.props.commentsById &&
                                this.props.allCommentsIds.map((id, index) => {
                                    return !this.props.commentsById[id].parentDeleted &&
                                        this.props.commentsById[id].parentId === this.props.id &&
                                        !this.props.commentsById[id].deleted &&

                                        <Comment key={index} comment={this.props.commentsById[id]} />

                                })
                            }
                        </div>

                        {/*Sort Comments*/}
                        <div className='sort-btn-div'>
                            {
                                this.props.allCommentsIds.length > 1 &&
                                this.state.commentsEnabled &&
                                this.props.postsById[this.props.id] &&
                                <button onClick={() => {
                                    this.props.saveSortedCommentsIds({ allIds: this.sortItemsBy('voteScore'), commentsSortedBy: 'voteScore' });
                                }}>Sort by votes</button>
                            }
                        </div>
                    </div>

                </div>
            )
        } else if (this.state.postFetchedIsDeleted) {
            return <NotFound />;
        } else {
            return <div>Loading...</div>
        }
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
        createComment: (data) => dispatch(createComment(data)),
        fetchComments: (postId) => dispatch(fetchComments(postId)),
        flagPostToDeleted: (postId) => dispatch(flagPostToDeleted(postId))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);

