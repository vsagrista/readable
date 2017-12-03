import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import registerServiceWorker from './registerServiceWorker';
import { 
    createStore, 
    applyMiddleware, 
    compose } from 'redux';

import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import App from './components/App';
import NotFound from './components/NotFound'
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import EditComment from './components/EditComment';
import Category from './components/Category';
import SinglePost from './components/SinglePost';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
)

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path='/' component={App} />
                <Route exact path='/:category' render={(props) => (
                    <Category name={props.match.params.category} />
                )} />
                <Route exact path='/posts/createpost' render={() => (
                    <CreatePost />
                )} />
                <Route exact path='/editpost/:postid' render={(props) => (
                    <EditPost postId={props.match.params.postid} />
                )} />
                <Route exact path="/:category/:id" render={(props) => (
                    <SinglePost id={props.match.params.id} />
                )} />
                <Route exact path="/comments/:id" render={(props) => (
                    <EditComment id={props.match.params.id} />
                )} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
