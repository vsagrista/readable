import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import * as HelperMethods from '../helpers/HelperMethods';

class HomePageListTemplate extends Component {
    render() {
        return (
            <ul className='list-group'>
                {this.props.items.map(item => (
                    <Link key={item.name} to={`/${this.props.type}/` + item}>
                        <li className='list-group-item justify-content-between' key={item}>{this.props.type === 'category' ? item.toUpperCase() : this.props.byId[item].title }
                            <span className="badge badge-default badge-pill">
                                {
                                    this.props.type === 'category' ? 
                                    HelperMethods.countPostsByCategory(this.props.allIds, this.props.byId, item)
                                    :
                                    this.props.byId[item].voteScore
                                }
                            </span>
                        </li>
                    </Link>
                ))}
            </ul>
        );
    }
}

export default HomePageListTemplate;