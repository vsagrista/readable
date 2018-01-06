import {
    CREATE_POST,
    UPDATE_POST,
    REMOVE_POST,
    VOTE_POST,
    SAVE_SORTED_IDS
} from '../actions';


const initialPostsState = {
    byId: {},
    allIds: [],
    isFetching: false,
    sortedBy: 'voteScore'
}

export function posts(state = initialPostsState, action) {
    switch (action.type) {
        case CREATE_POST:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.id]: action
                },
                allIds: [...state.allIds, action.id]
            }
        case SAVE_SORTED_IDS:
            return {
                ...state,
                allIds: action.allIds,
                sortedBy: action.sortedBy
            }
        case VOTE_POST:
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
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.id]: action
                }
            }
        case REMOVE_POST:
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
