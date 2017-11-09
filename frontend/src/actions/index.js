export const ADD_COMMENT = 'ADD_COMMENT';
export const CREATE_POST = 'CREATE_POST';
export const SAVE_SORTED_IDS = 'SAVE_SORTED_IDS';
export const SAVE_CATEGORY = 'SAVE_CATEGORY';
export const UPVOTE_POST = 'UPVOTE_POST';
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT';

export function saveCategories({ names }) {
    return {
        type: SAVE_CATEGORY,
        names,
    } 
}


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

export function upvotePost({ id, voteScore }) {
    return {
        type: UPVOTE_POST,
        id,
        voteScore: voteScore
    }
}

export function upvoteComment({ id, voteScore }) {
    return {
        type: UPVOTE_COMMENT,
        voteScore: voteScore
    }
}

export function saveSortedIds({ allIds, sortedBy }) {
    return {
        type: SAVE_SORTED_IDS,
        allIds,
        sortedBy
    }
}

