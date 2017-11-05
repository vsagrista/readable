import {
    CREATE_POST,
    ADD_COMMENT,
    SORT_BY_VOTE_OR_DATE
} from '../actions';
import { combineReducers } from 'redux';

const initialPostsState = {
    byId: {},
    allIds: [],
    isFetching: false
}

const initialCommentsState = {
    byId: {
        id: {
            id: null,
            parentId: null,
            timestamp: null,
            body: null,
            author: null,
            voteScore: null,
            parentDeleted: false
        }
    },
    allIds: []
}

function posts(state = initialPostsState, action) {
    // const { id, timestamp, title, body, author, category, voteScore, deleted } = action;
    switch (action.type) {
        case CREATE_POST:
            delete action.type;
            return {
                byId: {
                    ...state.byId,
                    [action.id]: action
                },
                allIds: [...state.allIds, action.id]
            }
        case SORT_BY_VOTE_OR_DATE:
            delete action.type;
            return {
                allIds: [...state.allIds, action.allIds]
            }
        default:
            return state
    }
}

function comments(state = initialCommentsState, action) {
    // const { id, parentId, timestamp, body, author, voteScore, parentDeleted } = action;
    switch (action.type) {
        case ADD_COMMENT:
            delete action.type;
            return {
                byId: {
                    ...state.byId,
                    [action.id]: action
                },
                allIds: [...state.allIds, action.id]
            }
        default:
            return state
    }
}

let appReducers = combineReducers({
   posts,
   comments 
});

export default appReducers;