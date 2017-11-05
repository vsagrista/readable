import {
    CREATE_POST,
    ADD_COMMENT,
    SAVE_SORTED_IDS
} from '../actions';
import { combineReducers } from 'redux';

const initialPostsState = {
    byId: {},
    allIds: [],
    isFetching: false,
    sortedBy: 'voteScore'
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
        case SAVE_SORTED_IDS:
            delete action.type;
            console.log("Action: ", action)
            return {
                ...state,
                allIds: action.allIds,
                sortedBy: action.sortedBy     
            };
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