import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import CreatePost from './CreatePost';
import ListTemplate from './ListTemplate';
import Category from './Category';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';


class App extends Component {
    render() {
        return (
            <div>
                <Route exact path='/' render={() => (
                    <div className="App">
                        <h1>Categories</h1>
                        <Link to='/Category'>Category</Link>
                        <Link to='/CreatePost'>Create Post</Link>
                    </div>
                )} />
                <div>
                    <Route exact path='/Category' render={() => (
                        <Category />
                    )} />
                    <Route exact path='/CreatePost' render={() => (
                        <CreatePost />
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


export default connect(mapStateToProps)(App);;