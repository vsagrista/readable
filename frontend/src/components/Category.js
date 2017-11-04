import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import ListTemplate from './ListTemplate';
import * as HerperMethods from '../helpers/HelperMethods'


class Category extends Component {
    render() {
        return (
            <div>
                <h1>{HerperMethods.capitalizeFirstLetter(this.props.name)} Category</h1>  
                <ListTemplate type='allPostsByCategory' category={this.props.name}/>     
            </div>
        );
    }
}

function mapStateToProps({ posts, comments }) {
    return {
        byId: posts.byId, allIds: posts.allIds
    }
}


export default connect(mapStateToProps)(Category);;