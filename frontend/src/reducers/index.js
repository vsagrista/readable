import {
    CREATE_POST,
    ADD_COMMENT,
} from '../actions'

const initialPostsState = {
    byId: {
        "0": {
            id: "0",
            timestamp: null,
            title: "Example",
            body: null,
            author: null,
            category: null,
            voteScore: null,
            deleted: null
        },
        "1": {
            id: "2",
            timestamp: null,
            title: "Another example",
            body: null,
            author: null,
            category: null,
            voteScore: null,
            deleted: null
        }
    },
    allIds: ["0", "1"]
}

const comments = {
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
    console.log(action);
    switch (action.type) {
        case CREATE_POST:
            delete action.type;
            return {
                allIds: [...state.allIds, action.id],
                byId: {
                    ...state.byId,
                    [action.id]: action
                }
    }
        default:
    return state
}
    
}

export default post;