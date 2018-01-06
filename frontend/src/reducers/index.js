import { combineReducers } from 'redux';
import { posts } from './postsReducer';
import { comments } from './commentsReducer';
import { categories } from './categoriesReducer';

let appReducers = combineReducers({
    posts,
    comments,
    categories
});

export default appReducers;