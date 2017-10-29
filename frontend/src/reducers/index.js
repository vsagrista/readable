import {
    CREATE_POST,
    ADD_COMMENT,
} from '../actions';

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

function post(state = initialPostsState, action) {
    const { id, timestamp, title, body, author, category, voteScore, deleted } = action;
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
        default:
    return state
}
    
}

export default post;