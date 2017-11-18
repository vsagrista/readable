import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import {
    createPost,
    saveSortedIds,
    saveCategories
} from '../actions';
import CreatePost from './CreatePost';
import Category from './Category';
import SinglePost from './SinglePost';
import HomePageListTemplate from './HomePageListTemplate';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import * as APIMethods from '../helpers/APIMethods';
import * as HelperMethods from '../helpers/HelperMethods';


class App extends Component {

    componentDidMount() {
        APIMethods.getCategories().then((data) => {
            let categories = [];
            data.categories.map((category) => categories.push(category.name))
            this.props.saveCategories({ names: categories })
        });

        APIMethods.getPosts().then((data) => {
            data.map(post => (
                this.props.createPost(post)
            ))
        }).then(() => {
            this.props.saveSortedPostsIds({
                allIds: this.sortItemsBy('voteScore'),
                sortedBy: 'voteScore'
            }
            );
        });
    }

    sortItemsBy(option) {
        return HelperMethods.sortIdsBy(this.props.byId, option)
    }

    render() {
        return (
            <div>
                <Route exact path='/' render={() => (
                    <div className="App">
                        <div className='root-categories'>
                            <h1>Categories</h1>
                            <HomePageListTemplate type='category' items={this.props.categories} allIds={this.props.allPostsId} byId={this.props.postsById}></HomePageListTemplate>
                        </div>
                        <div className='root-posts'>
                            <h1>All Posts sorted by: {this.props.sortedBy === 'voteScore' ? 'timestamp' : 'voteScore'}</h1>
                            <HomePageListTemplate type='post' items={this.props.allPostsId} allIds={this.props.allPostsId} byId={this.props.postsById}></HomePageListTemplate>
                            <button onClick={() => {
                                let option = this.props.sortedBy === 'voteScore' ? 'timestamp' : 'voteScore';
                                this.props.saveSortedPostsIds({ allIds: this.sortItemsBy(option), sortedBy: option });
                            }
                            }>
                                Sort by: {this.props.sortedBy}
                            </button>
                        </div>
                        <Link to='/createpost'>Create Post</Link>
                    </div>
                )} />
                <div>
                    <Route exact path='/category/:name' render={(props) => (
                        <Category name={props.match.params.name} />
                    )} />
                    <Route exact path='/createpost' render={() => (
                        <CreatePost />
                    )} />
                    <Route exact path="/post/:id" render={(props) => (
                        <SinglePost id={props.match.params.id} />
                    )} />

                </div>
            </div>
        );
    }
}


function mapStateToProps({ categories, posts }) {
    return {
        postsById: posts.byId, allPostsId: posts.allIds,
        categories: categories.names,
        byId: posts.byId,
        allIds: posts.allIds,
        sortedBy: posts.sortedBy
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createPost: (data) => dispatch(createPost(data)),
        saveSortedPostsIds: (data) => dispatch(saveSortedIds(data)),
        saveCategories: (data) => dispatch(saveCategories(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);