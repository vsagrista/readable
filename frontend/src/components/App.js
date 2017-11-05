import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import {
    createPost,
    saveSortedIds
} from '../actions';
import CreatePost from './CreatePost';
import Category from './Category';
import SinglePost from './SinglePost';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import * as APIMethods from '../helpers/APIMethods';
import * as HelperMethods from '../helpers/HelperMethods';


class App extends Component {

    constructor() {
        super();
        this.state = {
            categories: [],
            sortedPostsIds: [],
            sortedBy: ''
        }

    }

    componentDidMount() {
        APIMethods.getCategories().then((data) => {
            this.setState({
                categories: data.categories
            })
        }
        )

        APIMethods.getPosts().then((data) => {
            data.map(post => (
                this.props.createPost(post)
            ))
        }
        ).then(() => {
            this.props.saveSortedPostsIds({
                allIds: this.sortItemsBy('timestamp'),  
                sortedBy: 'timestamp'}
            );
        });
    }

    sortItemsBy(option) {
        return  HelperMethods.sortIdsBy(this.props.byId, option)
    }

    render() {
        return (
            <div>
                <Route exact path='/' render={() => (
                    <div className="App">
                        <div className='root-categories'>
                            <h1>Categories</h1>
                            <ul className='list-group'>
                                {this.state.categories.map(category =>
                                    <Link key={category.name} to={'/category/' + category.name}>
                                        <li className='list-group-item justify-content-between' key={category.name}>{category.name.toUpperCase()}
                                            <span className="badge badge-default badge-pill">
                                                {HelperMethods.countPostsByCategory(this.props.allIds, this.props.byId, category.name)}
                                            </span>
                                        </li>
                                    </Link>
                                )}
                            </ul>
                        </div>
                        <div className='root-posts'>
                            <h1>All Posts</h1>
                            <ul className='list-group'>
                                {this.props.allIds.map(id =>
                                    <Link to={'/post/' + this.props.byId[id].id}>
                                        <li className='list-group-item text-left'>{this.props.byId[id].title}
                                            <span className="badge badge-default badge-pill">
                                                {this.props.byId[id].voteScore}
                                            </span>
                                        </li>
                                    </Link>
                                )}
                            </ul>
                            <button onClick={() => {
                                console.log("this.props.sortedBy: ", this.props.sortedBy)
                                let option = this.props.sortedBy === 'voteScore' ? 'timestamp' : 'voteScore';

                                this.props.saveSortedPostsIds({allIds: this.sortItemsBy(option), sortedBy: option});
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


function mapStateToProps({ posts }) {
    return {
        byId: posts.byId, 
        allIds: posts.allIds, 
        sortedBy: posts.sortedBy
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createPost: (data) => dispatch(createPost(data)),
        saveSortedPostsIds: (data) => dispatch(saveSortedIds(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);;