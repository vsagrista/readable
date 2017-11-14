import {
    CREATE_POST,
    CREATE_COMMENT,
    SAVE_SORTED_IDS,
    SAVE_CATEGORY,
    UPVOTE_POST,
    UPVOTE_COMMENT
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
    const { id, timestamp, title, body, author, category, voteScore, deleted } = action;
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
        default:
            return state
    }
}

function comments(state = initialCommentsState, action) {
    const { id, parentId, timestamp, body, author, voteScore, parentDeleted } = action;
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
        case SAVE_SORTED_IDS:
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