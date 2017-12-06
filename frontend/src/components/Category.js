import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import {
    savePost,
    saveSortedIds,
    fetchCategories,
    fetchPosts
} from '../actions';

import * as HerperMethods from '../helpers/HelperMethods'
import * as APIMethods from '../helpers/APIMethods';

import HomePageListTemplate from './HomePageListTemplate';

class Category extends Component {

    constructor() {
        super();
        this.state = {
            postsIds: [],
            mounted: false
        }
    }

    // componentDidMount() {
    //     APIMethods.getPostsByCategory(this.props.name).then((data) => {
    //         let postsIds = []
    //         data.map(post => (
    //             postsIds.push(post.id)
    //         ));
    //         this.setState({
    //             postsIds: postsIds
    //         });
    //     })
    // }

    componentDidMount() {
        APIMethods.getPostsByCategory(this.props.name).then((data) => {
            let postsIds = []
            data.map(post => (
                postsIds.push(post.id)
            ));
            this.setState({
                postsIds: postsIds
            });
        })
    }

    componentDidUpdate() {
        APIMethods.getPostsByCategory(this.props.name).then((data) => {
            let postsIds = []
            data.map(post => (
                postsIds.push(post.id)
            ));
            this.setState({
                postsIds: postsIds
            });
        })
    }

    render() {
        return (
            <div>
                <div className='container-fluid'>
                    <h5 className='header-main'>Posts from {HerperMethods.capitalizeFirstLetter(this.props.name)} category</h5>
                    {
                        this.props.postsById &&
                        <div key='cat-posts'>
                            <HomePageListTemplate key='cat-posts-component' type='post' items={this.state.postsIds} allIds={this.state.postsIds} byId={this.props.postsById}></HomePageListTemplate>
                        </div>
                    }
                </div>
                <div className='root-categories'>
                    <h4 className='header-main'>All other categories</h4>
                    <HomePageListTemplate key='template-categories' type='category' items={this.props.categories} allIds={this.props.allPostsId} byId={this.props.postsById}></HomePageListTemplate>
                    <div className='sort-btn-wrapper'>
                        <div className='sort-info'>
                            Posts
                                </div>
                    </div>
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



export default connect(mapStateToProps, mapDispatchToProps)(Category);;