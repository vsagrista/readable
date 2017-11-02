import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import {
    createPost
} from '../actions';

class ListTemplate extends Component {

    constructor() {
        super();
        console.log(this.props);
    }

    render() {
        console.log(this.props);
        return (
            <div>
                Hello List
                {this.props.allIds.map(id => (
                    <ul>
                        <li key={this.props.byId[id].title}>
                            Title: {this.props.byId[id].title}
                        </li>
                        <li key={this.props.byId[id].body}>
                            Body: {this.props.byId[id].body}
                        </li>
                        <li key={this.props.byId[id].author}>
                            Author: {this.props.byId[id].author}
                        </li>
                        <li key={this.props.byId[id].voteScore}>
                            Vote Score: {this.props.byId[id].voteScore}
                        </li>
                        <li key={this.props.byId[id].category}>
                            Category: {this.props.byId[id].category}
                        </li>
                        <li key={this.props.byId[id].timestamp}>
                            Time: {this.props.byId[id].category}
                        </li>
                    </ul>
                )
                )}
            </div>
        )
    }

}

function mapStateToProps({ posts, comments }) {
    return {
        byId: posts.byId, allIds: posts.allIds
    }
}


export default connect(mapStateToProps)(ListTemplate);;
