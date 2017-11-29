import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import {
    savePost,
    saveSortedIds,
    fetchCategories,
    fetchPosts
} from '../actions';

import CreatePost from './CreatePost';
import EditPost from './EditPost';
import EditComment from './EditComment';
import Category from './Category';
import SinglePost from './SinglePost';
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
            <div>
                <nav>
                    <Link to='/' className="navbar-brand">
                        <p><i className='glyphicon glyphicon-home'></i>Home</p>
                    </Link>
                    <Link to='/createpost' className="navbar-brand" href="#">
                        <p><i className='glyphicon glyphicon-list-alt'></i>New Post</p>
                    </Link>
                </nav>
                <Route exact path='/' render={() => (
                    <div className="App">
                        <div className='root-categories'>
                            <h2 className='header-main'>Categories</h2>
                            <HomePageListTemplate key='template-categories' type='category' items={this.props.categories} allIds={this.props.allPostsId} byId={this.props.postsById}></HomePageListTemplate>
                            <div className='sort-btn-wrapper'>
                                <div className='sort-info'>
                                    Posts
                                </div>
                            </div>
                        </div>
                        
                        <div className='root-posts'>
                            <h2 className='header-main'>All Posts</h2>
                            <HomePageListTemplate key='template-posts' type='post' items={this.props.allPostsId} allIds={this.props.allPostsId} byId={this.props.postsById}></HomePageListTemplate>
                            <div className='sort-btn-wrapper'>
                                <button onClick={() => {
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
                                    : 'Date' }
                                </div>
                            </div>
                        </div>
                    </div>
                )} />
                <div>
                    <Route exact path='/:category' render={(props) => (
                        <Category name={props.match.params.category} />
                    )} />
                    <Route exact path='/createpost' render={() => (
                        <CreatePost />
                    )} />
                    <Route exact path='/editpost/:postid' render={(props) => (
                        <EditPost postId={props.match.params.postid} />
                    )} />
                    <Route exact path="/post/:id" render={(props) => (
                        <SinglePost id={props.match.params.id} />
                    )} />
                    <Route exact path="/comments/:id" render={(props) => (
                        <EditComment id={props.match.params.id} />
                    )} />
                </div>
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