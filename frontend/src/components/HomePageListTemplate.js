import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { flagPostToDeleted } from '../actions';
import * as HelperMethods from '../helpers/HelperMethods';
var moment = require('moment');

class HomePageListTemplate extends Component {

    render() {
        return (
            <ul key={`list-${this.props.type}`} className='list-group'>
                {this.props.items.map(item => (
                     this.props.type === 'category' ?
                        <li className='list-group-item justify-content-between' key={item}>
                            <Link key={`list-${item}`} to={`/${this.props.type}/` + item}>
                                {item.toUpperCase()}
                            </Link>
                            <span key={`span-${item}`} className="badge badge-default badge-pill">
                                {
                                    HelperMethods.countPostsByCategory(this.props.allIds, this.props.byId, item)
                                }
                            </span>
                        </li>

                        :

                        !this.props.byId[item].deleted &&

                        <li className='list-group-item justify-content-between' key={item}>
                            <button onClick={() => (this.props.flagPostToDeleted(item))} className='pull-left remove-btn'>delete</button>
                            <Link key={`list-${item}`} to={`/${this.props.type}/` + item}>
                                {this.props.byId[item].title}
                            </Link>
                            <span key={`span-${item}`} className="badge badge-default badge-pill">
                                {
                                    this.props.sortedBy === 'voteScore' 
                                    ? this.props.byId[item].voteScore 
                                    : moment(this.props.byId[item].timestamp).format('DD/MM/YYYY')
                                }
                            </span>
                        </li>
                ))}
            </ul>
        );
    }
}

function mapStateToProps({ posts }) {
    return {
        sortedBy: posts.sortedBy
    }
}

function mapDispatchToProps(dispatch) {
    return {
        flagPostToDeleted: (postId) => dispatch(flagPostToDeleted(postId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePageListTemplate);;