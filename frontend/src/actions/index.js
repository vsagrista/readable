export const ADD_COMMENT = 'ADD_COMMENT';
export const CREATE_POST = 'CREATE_POST';
export const SORT_BY_VOTE_OR_DATE = 'SORT_BY_VOTE_OR_DATE';


export function addComment({ id, parentId, timestamp, body, author, voteScore, parentDeleted }) {
    return {
        type: ADD_COMMENT,
        id, 
        parentId, 
        timestamp, 
        body, 
        author, 
        voteScore, 
        parentDeleted,
    }
}

export function createPost({ id, timestamp, title, body, author, category, voteScore, deleted  }) {
    return {
        type: CREATE_POST,
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

export function sortByVoteOrDate({ allIds }) {
    return {
        type: SORT_BY_VOTE_OR_DATE,
        allIds, 
    }
}

