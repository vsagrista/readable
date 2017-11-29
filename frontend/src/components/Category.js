import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    savePost,
    saveSortedIds,
    fetchCategories,
    fetchPosts
} from '../actions';
import Post from './Post';
import * as HerperMethods from '../helpers/HelperMethods'
import * as APIMethods from '../helpers/APIMethods';
import HomePageListTemplate from './HomePageListTemplate';

class Category extends Component {

    constructor() {
        super();
        this.state = {
            postsIds: []
        }
    }

    componentDidMount() {
        this.props.fetchCategories();
        this.props.fetchPosts()
            .then(() => {
                APIMethods.getPostsByCategory(this.props.name).then((data) => {
                    let postsIds = []
                    data.map(post => (
                        postsIds.push(post.id)
                    ));
                    this.setState({ postsIds: postsIds });
                })
            })
    }

    render() {
        return (
            <div className='display-wrapper'>
                <h2 className='header-main'>{HerperMethods.capitalizeFirstLetter(this.props.name)} Category</h2>
                {
                    this.state.postsIds.map((id, index) => {
                        return (
                            this.props.postsById[id] &&
                            <div key={id}>                             
                                <HomePageListTemplate key={index} type='post' items={this.state.postsIds} allIds={this.state.postsIds} byId={this.props.postsById}></HomePageListTemplate>
                            </div>
                        )
                    })
                }
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



export default connect(mapStateToProps, mapDispatchToProps)(Category);;