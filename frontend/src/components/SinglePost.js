import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { saveSortedIds } from '../actions';
import ListTemplate from './ListTemplate';
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
                <ul>
                    <ListTemplate type='post' singlePostId={this.props.id} />
                </ul>
                <div>
                    <button onClick={() => {
                        let option = this.props.sortedBy === 'voteScore' ? 'timestamp' : 'voteScore';
                        this.props.saveSortedCommentsIds({ allIds: this.sortItemsBy(option), sortedBy: option });
                    }
                    }>
                        Sorted by: {this.props.sortedBy}
                    </button>
                    <CreateComment parentId={this.props.id} postDeleted={this.props.postDeleted}></CreateComment>
                    <ListTemplate type='allComments' singlePostId={this.props.id} />

                </div>
            </div>
        )
    }
}

function mapStateToProps({ comments }) {
    return {
        commentsById: comments.byId,
        sortedBy: comments.sortedBy
    }
}

function mapDispatchToProps(dispatch) {
    return {
        saveSortedCommentsIds: (data) => dispatch(saveSortedIds(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);

