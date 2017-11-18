import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { saveSortedCommentsIds } from '../actions';
import ListTemplate from './ListTemplate';
import Comment from './Comment';
import Post from './Post';
import CreateComment from './CreateComment';
import * as HelperMethods from '../helpers/HelperMethods';


class SinglePost extends Component {


    sortItemsBy(option) {
        return HelperMethods.sortIdsBy(this.props.commentsById, option)
    }

    render() {
        return (
            <div>
                Single Post
                <Post post={this.props.postsById[this.props.id]} singlePostView='true'></Post>
                <div>
                    <CreateComment parentId={this.props.id} postDeleted={this.props.postDeleted}></CreateComment>
                    {  
                        this.props.allCommentsIds.map((id) => {
                            if (this.props.commentsById[id].parentId === this.props.id)
                                return <Comment sorteBy={this.props.commentsSortedBy} comment={this.props.commentsById[id]}></Comment>
                        })                    
                    }
                    {this.props.allCommentsIds.length > 1 && 
                        <button onClick={() => {
                                    var option = this.props.commentsSortedBy === 'voteScore' ? 'timestamp' : 'voteScore';
                                    this.props.saveSortedCommentsIds({ allIds: this.sortItemsBy(option), commentsSortedBy: option });
                                }
                        }>Sort by votes</button>
                    }
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
        commentsSortedById: comments.sorteBy
    }
}

function mapDispatchToProps(dispatch) {
    return {
        saveSortedCommentsIds: (data) => dispatch(saveSortedCommentsIds(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);

