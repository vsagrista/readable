import {
  CREATE_COMMENT,
  SAVE_SORTED_COMMENTS_IDS,
  VOTE_COMMENT,
  UPDATE_COMMENT,
  REMOVE_COMMENT
} from '../actions';


const initialCommentsState = {
    byId: {},
    allIds: [],
    isFetching: false,
    sortedBy: 'voteScore'
}



export function comments(state = initialCommentsState, action) {
    switch (action.type) {
        case CREATE_COMMENT:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.id]: action
                },
                allIds: [...state.allIds, action.id]
            }
        case VOTE_COMMENT:
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
            return {
                ...state,
                allIds: action.allIds,
                sortedBy: action.sortedBy
            }
        case UPDATE_COMMENT:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.id]: action
                }
            }
         case REMOVE_COMMENT:
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