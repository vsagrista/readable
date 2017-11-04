import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import {
    createPost
} from '../actions';
import CreatePost from './CreatePost';
import Category from './Category';
import SinglePost from './SinglePost';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import * as APIMethods from '../helpers/APIMethods'
var _ = require('lodash');


class App extends Component {

    constructor() {
        super();
        this.state = {
            categories: []
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
        )
    }

    sortPostsBy = (posts, option) => {
        return _.sortBy(posts, option).reverse()
    }

    render() {
        return (
            <div>
                <Route exact path='/' render={() => (
                    <div className="App">
                        <div className='root-categories'>
                            <h1>Categories</h1>
                            <ul>
                                {this.state.categories.map(category =>
                                    <Link key={category.name} to={'/Category/' + category.name }>
                                        <li key={category.name}>{category.name}</li>
                                    </Link>
                                )}
                            </ul>
                        </div>
                        <div className='root-posts'>
                            <h1>posts</h1>
                            <ul>
                                {this.props.allIds.map(id =>
                                    <Link to={'/Post/' + this.props.byId[id].id }>
                                        <li>{this.props.byId[id].title}</li>
                                    </Link>
                                )}
                            </ul>

                        </div>
                        <Link to='/CreatePost'>Create Post</Link>
                    </div>
                )} />
                <div>
                    <Route exact path='/Category/:name' render={(props) => (
                        <Category name={props.match.params.name} />
                    )} />
                    <Route exact path='/CreatePost' render={() => (
                        <CreatePost />
                    )} />
                    <Route exact path="/Post/:id" render={(props) => (
                        <SinglePost id={props.match.params.id} />
                    )} />

                </div>
            </div>
        );
    }
}


function mapStateToProps({ posts, comments }) {
    return {
        byId: posts.byId, allIds: posts.allIds
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createPost: (data) => dispatch(createPost(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);;