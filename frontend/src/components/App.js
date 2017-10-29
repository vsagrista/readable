import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import  CreatePost  from './CreatePost';

class App extends Component {
    render() {
        return (
            <div className="App">
                <h1>Categories</h1>
                <div>
                    {this.props.allIds.length > 0 ?
                        this.props.allIds.map((id) =>
                            <p key={id}>Title: {this.props.byId[id].title}</p>
                        ) :
                        <div></div>
                    }
                </div>
                <CreatePost />
            </div>
        );
    }
}


function mapStateToProps(state, props) {
    return {
        byId: state.byId, allIds: state.allIds
    }
}


export default connect(mapStateToProps)(App);;