import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { saveSortedCommentsIds, createComment } from '../actions';
import ListTemplate from './ListTemplate';
import Comment from './Comment';
import Post from './Post';
import CreateComment from './CreateComment';
import * as APIMethods from '../helpers/APIMethods';
import * as HelperMethods from '../helpers/HelperMethods';


class SinglePost extends Component {

    constructor() {
        super();
        this.state = {
            commentsParentIds: []
        }
    }

    componentDidMount() {
        let commentsParentIds = [];
        APIMethods.getComments(this.props.id).then((data) => {
            data.map(comment => {
                this.props.allCommentsIds.indexOf(comment.id) === -1 && this.props.createComment(comment)
                commentsParentIds.push(comment.parentId)
            });
            console.log(this.props.allCommentsIds, 'here')
            
        }).then(() => {
            this.setState({
                commentsParentIds: commentsParentIds
            });
        });
    }

    sortItemsBy(option) {
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
                    {this.state.commentsParentIds.length > 0 &&
                        this.props.allCommentsIds.map((id) => {
                            return this.state.commentsParentIds.indexOf(this.props.commentsById[id].parentId) > -1 &&
                            <Comment commentsSortedBy={this.props.commentsSortedBy} comment={this.props.commentsById[id]}></Comment>
                            
                            })
                    }
                    {this.props.allCommentsIds.length > 1 &&
                        <button onClick={() => {
                            var option = this.props.commentsSortedBy === 'voteScore' ? 'timestamp' : 'voteScore';
                            this.props.saveSortedCommentsIds({ allIds: this.sortItemsBy(option), commentsSortedBy: option });
                        }}>Sort by votes</button>}
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

