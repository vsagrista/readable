import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import {
    savePost,
    saveSortedIds,
    fetchCategories,
    fetchPosts
} from '../actions';

import HomePageListTemplate from './HomePageListTemplate';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';

import * as HelperMethods from '../helpers/HelperMethods';


class App extends Component {

    componentDidMount() {
        this.props.fetchCategories();
        this.props.fetchPosts()
            .then(() => {
                this.props.saveSortedPostsIds({
                    allIds: this.sortItemsBy('voteScore'),
                    sortedBy: 'voteScore'
                });
            });
    }

    sortItemsBy(option) {
        return HelperMethods.sortIdsBy(this.props.byId, option)
    }

    render() {
        return (
            <div className='container-fluid'>
                <nav>
                    <Link to='/' className="navbar-brand">
                        <p><i className='glyphicon glyphicon-home'></i>Home</p>
                    </Link>
                    <Link to='/posts/createpost' className="navbar-brand" href="#">
                        <p><i className='glyphicon glyphicon-list-alt'></i>New Post</p>
                    </Link>
                </nav>
                <Route exact path='/' render={() => (
                    <div className="App">
                        <div className='root-categories'>
                            <h4 className='header-main'>Categories</h4>
                            <HomePageListTemplate key='template-categories' type='category' items={this.props.categories} allIds={this.props.allPostsId} byId={this.props.postsById}></HomePageListTemplate>
                            <div className='sort-btn-wrapper'>
                                <div className='sort-info'>
                                    Posts
                                </div>
                            </div>
                        </div>

                        <div className='root-posts'>
                            <h4 className='header-main'>All Posts</h4>
                            <HomePageListTemplate key='template-posts' type='post' items={this.props.allPostsId} allIds={this.props.allPostsId} byId={this.props.postsById}></HomePageListTemplate>
                            <div className='sort-btn-wrapper'>
                                <button className='btn btn-default' onClick={() => {
                                    let option = this.props.sortedBy === 'voteScore'
                                        ? 'timestamp'
                                        : 'voteScore';
                                    this.props.saveSortedPostsIds({ allIds: this.sortItemsBy(option), sortedBy: option });
                                }
                                }>
                                    <i className='glyphicon glyphicon-sort'></i>
                                    Sort
                                </button>
                                <div className='sort-info'>Sorted by: {
                                    this.props.sortedBy === 'voteScore'
                                        ? 'Votes'
                                        : 'Date'}
                                </div>
                            </div>
                        </div>
                    </div>
                )} />
            </div>
        );
    }
}


function mapStateToProps({ categories, posts }) {
    return {
        postsById: posts.byId,
        allPostsId: posts.allIds,
        categories: categories.names,
        byId: posts.byId,
        allIds: posts.allIds,
        sortedBy: posts.sortedBy
    }
}

function mapDispatchToProps(dispatch) {
    return {
        savePost: (data) => dispatch(savePost(data)),
        saveSortedPostsIds: (data) => dispatch(saveSortedIds(data)),
        fetchCategories: () => dispatch(fetchCategories()),
        fetchPosts: () => dispatch(fetchPosts())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);