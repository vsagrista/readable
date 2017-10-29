import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';

class App extends Component {
  render() {
      console.log('this.props: ', this.props)
    return (
      <div className="App">
        <h1>Categories</h1>
        <div>
            {
                this.props.allIds.map((id) => 
                <p key={id}>Title: { this.props.byId[id].title }</p>
                )
            }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, props){
    return {
        byId: state.byId, allIds: state.allIds
    }
}


export default connect(mapStateToProps)(App);;
