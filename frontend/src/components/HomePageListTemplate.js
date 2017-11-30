import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { flagPostToDeleted, votePost } from '../actions';
import * as HelperMethods from '../helpers/HelperMethods';
var moment = require('moment');

class HomePageListTemplate extends Component {


    saveVote = (id, option, e) => {
        e.preventDefault();
        this.props.votePost(id, option);
    }

    render() {
        return (
            <ul key={`list-${this.props.type}`} className='list-group'>
                {this.props.items.map(item => (
                    this.props.type === 'category' ?
                        <li className='list-group-item justify-content-between' key={item}>
                            <Link key={`list-${item}`} to={`/${item}`}>
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
                        {/* Delete */}
                            <button onClick={() => (this.props.flagPostToDeleted(item))} className='pull-left remove-btn'>delete</button>
                            <Link to={`/editpost/${item}`}>
                                <button className='btn btn-info' title='Edit'><i className='glyphicon glyphicon-pencil'></i></button>
                            </Link>
                        {/* Vote */}
                            <button title='Upvote' onClick={(e) => {
                                this.saveVote(item, { option: 'upVote' }, e)
                            }
                            } className='btn btn-default'><i className='glyphicon glyphicon-hand-right'></i></button>
                            <button title='Upvote' onClick={(e) => {
                                this.saveVote(item, { option: 'downVote' }, e)
                            }} className='btn btn-default'><i className='glyphicon glyphicon-thumbs-down'></i></button>
                         {/* Edit */}
                            <Link key={`list-${item}`} to={`/${this.props.type}/` + item}>
                                {this.props.byId[item].title}
                            </Link>
                        {/* VoteScore */}
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
        flagPostToDeleted: (postId) => dispatch(flagPostToDeleted(postId)),
        votePost: (id, option) => dispatch(votePost(id, option))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePageListTemplate);;