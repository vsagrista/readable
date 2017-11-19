import {
    CREATE_POST,
    CREATE_COMMENT,
    SAVE_SORTED_IDS,
    SAVE_SORTED_COMMENTS_IDS,
    SAVE_CATEGORY,
    UPVOTE_POST,
    UPVOTE_COMMENT,
    UPDATE_POST,
    REMOVE_POST,
    REMOVE_COMMENT
} from '../actions';
import { combineReducers } from 'redux';

const initialCategoriesState = {
    names: []
}

const initialPostsState = {
    byId: {},
    allIds: [],
    isFetching: false,
    sortedBy: 'voteScore'
}

const initialCommentsState = {
    byId: {},
    allIds: [],
    isFetching: false,
    sortedBy: 'voteScore'
}

function categories(state = initialCategoriesState, action) {
    switch (action.type) {
        case SAVE_CATEGORY:
            return {
                ...state,
                names: action.names
            }
        default:
            return state
    }
}

function posts(state = initialPostsState, action) {
    switch (action.type) {
        case CREATE_POST:
            delete action.type;
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.id]: action
                },
                allIds: [...state.allIds, action.id]
            }
        case SAVE_SORTED_IDS:
            delete action.type;
            return {
                ...state,
                allIds: action.allIds,
                sortedBy: action.sortedBy
            }
        case UPVOTE_POST:
            delete action.type;
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.id]: {
                        ...state.byId[action.id],
                        voteScore: action.voteScore
                    }
                }
            }
        case UPDATE_POST:
            delete action.type;
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.id]: action
                }
            }
        case REMOVE_POST:
            delete action.type;
            console.log('state: ', state, 'action', action)
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.id]: {
                        ...state.byId[action.id],
                        deleted: true
                    }
                }
                
    }
        default:
    return state
}
}

function comments(state = initialCommentsState, action) {
    switch (action.type) {
        case CREATE_COMMENT:
            delete action.type;
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.id]: action
                },
                allIds: [...state.allIds, action.id]
            }
        case UPVOTE_COMMENT:
            delete action.type;
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.id]: {
                        ...state.byId[action.id],
                        voteScore: action.voteScore
                    }
                }
            }
        case SAVE_SORTED_COMMENTS_IDS:
            delete action.type;
            return {
                ...state,
                allIds: action.allIds,
                sortedBy: action.sortedBy
            }
        default:
            return state
    }
}

let appReducers = combineReducers({
    posts,
    comments,
    categories
});

export default appReducers;