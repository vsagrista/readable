import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { removePost } from '../actions';
import * as HelperMethods from '../helpers/HelperMethods';

class HomePageListTemplate extends Component {

    removePost = (postId) => {
        this.props.removePost({ id: postId });
    }

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
                            <button onClick={() => (this.removePost(item))} className='pull-left remove-btn'>delete</button>
                            <Link key={`list-${item}`} to={`/${this.props.type}/` + item}>
                                {this.props.byId[item].title}
                            </Link>
                            <span key={`span-${item}`} className="badge badge-default badge-pill">
                                {
                                    this.props.byId[item].voteScore
                                }
                            </span>
                        </li>
                ))}
            </ul>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        removePost: (data) => dispatch(removePost(data))
    }
}

export default connect(null, mapDispatchToProps)(HomePageListTemplate);;