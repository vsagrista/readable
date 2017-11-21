import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Post from './Post';
import * as HerperMethods from '../helpers/HelperMethods'
import * as APIMethods from '../helpers/APIMethods';

class Category extends Component {

    constructor() {
        super();
        this.state = {
            postsIds: []
        }
    }

    componentDidMount() {
        APIMethods.getPostsByCategory(this.props.name).then((data) => {
            let postsIds = []
            data.map(post => (
                postsIds.push(post.id)
            ));
            this.setState({ postsIds: postsIds });
        })
    }

    render() {
        return (
            <div className='display-wrapper'>
                <h2 className='header-main'>{HerperMethods.capitalizeFirstLetter(this.props.name)} Category</h2>
                {
                    this.state.postsIds.map((id) => {
                        return (
                            this.props.postsById[id] &&
                            <div key={id}>
                                <Post post={this.props.postsById[id]}></Post>
                                <Link to={'/post/' + this.props.postsById[id].id}>
                                    <li key={this.props.postsById[id].id} className='list-group-item text-left'>
                                        view
                                    </li>
                                </Link>
                            </div>
                        )
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