import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ListTemplate from './ListTemplate';
import PostTemplate from './PostTemplate';
import * as HerperMethods from '../helpers/HelperMethods'

class Category extends Component {
    render() {
        return (
            <div>
                <h1>{HerperMethods.capitalizeFirstLetter(this.props.name)} Category</h1>
                {console.log("opening post component: ", this.props.postsById)}
                {this.props.allPostsIds.map((id) => {
                    return this.props.postsById[id].category === this.props.name ?
                        <div key={id}>                     
                            <PostTemplate post={this.props.postsById[id]}></PostTemplate>
                            <Link to={'/post/' + this.props.postsById[id].id}>
                                <li key={ this.props.postsById[id].id } className='list-group-item text-left'>
                                    view
                                </li>
                            </Link>
                        </div>
                        :
                        null
                })
                }
            </div>
        );
    }
}

function mapStateToProps({ posts, comments }) {
    return {
        postsById: posts.byId, allIds: posts.allIds,
        allPostsIds: posts.allIds,
    }
}


export default connect(mapStateToProps)(Category);;