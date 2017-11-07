import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import ListTemplate from './ListTemplate';



class SinglePost extends Component {

    render() {
        return (
            <div>
                Single Post
                <ul>
                    <ListTemplate type='post' singlePostId={this.props.id} />
                </ul>
            </div>
        )
    }

}


export default SinglePost;
