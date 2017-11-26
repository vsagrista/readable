import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { saveSortedCommentsIds, createComment, fetchComments } from '../actions';
import Comment from './Comment';
import Post from './Post';
import CreateComment from './CreateComment';
import * as HelperMethods from '../helpers/HelperMethods';
import * as APIMethods from '../helpers/APIMethods';


class SinglePost extends Component {

    constructor() {
        super();
        this.state = {
            commentsEnabled: false
        }
    }

    componentDidMount() {
        this.props.fetchComments(this.props.id);
        this.setState({
            commentsEnabled: this.commentsAreEnabled()
        });
    }

    sortItemsBy = (option) => {
        return HelperMethods.sortIdsBy(this.props.commentsById, option)
    }

    commentsAreEnabled = () => {
        let totalComments = [];
        this.props.allCommentsIds.map(id => !this.props.commentsById[id].deleted && totalComments.push(id))
        return totalComments.length > 1 && this.props.postsById[this.props.id];
    }

    render() {
        return (
            <div className='display-wrapper'>
            
            {/*List Post*/}
                {this.props.postsById[this.props.id] && 
                !this.props.postsById[this.props.id].deleted &&
                    <Post post={this.props.postsById[this.props.id]} singlePostView='true'></Post>}
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
                                    <Comment key={`comment-${id}-${index}`} comment={this.props.commentsById[id]} />
                            })
                        }
                    </div>

            {/*Sort Comments*/}
                    <div className='sort-btn-div'>
                        {this.props.allCommentsIds.length > 1 &&
                            this.state.commentsEnabled &&
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
        createComment: (data) => dispatch(createComment(data)),
        fetchComments: (postId) => dispatch(fetchComments(postId))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);

