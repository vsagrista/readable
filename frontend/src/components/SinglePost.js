import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import ListTemplate from './ListTemplate';



class SinglePost extends Component {

    render() {
        return (
            <div>
                Single Post
                <ListTemplate type='post' singlePostId={this.props.id}/>
            </div>
        )
    }

}


export default SinglePost;
