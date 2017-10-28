

import {
  CREATE_POST,
  ADD_COMMENT,
} from '../actions'

const initialPostsState = {
    id: {
        id: null,
        timestamp: null,
        title: null,
        body: null,
        author: null,
        category: null,
        voteScore: null,
        deleted: null
    },
    allIds: []
}

const comments = {
    id: {
        id: null,
        parentId: null,
        timestamp: null,
        body: null,
        author: null,
        voteScore: null,
        parentDeleted: false
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