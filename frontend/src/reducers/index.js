

import {
  CREATE_POST,
  ADD_COMMENT,
} from '../actions'

const initialPostsState = {
    byId: {
        "aaaa": {
            id: "aaaa",
            timestamp: null,
            title: "Example",
            body: null,
            author: null,
            category: null,
            voteScore: null,
            deleted: null
        },
        "bbbb": {
            id: "bbbb",
            timestamp: null,
            title: "Another example",
            body: null,
            author: null,
            category: null,
            voteScore: null,
            deleted: null
        }
    },
    allIds: ["aaaa", "bbbb"]
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
    switch (action.type) {
        case CREATE_POST:
            return {
                ...state,
                [id]: {
                    id,
                    timestamp,
                    title,
                    body,
                    author,
                    category,
                    voteScore,
                    deleted,
                }
            }
        default:
            return state
    }
}

export default post;