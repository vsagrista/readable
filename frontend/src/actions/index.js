export const CREATE_COMMENT = 'CREATE_COMMENT';
export const CREATE_POST = 'CREATE_POST';
export const SAVE_SORTED_IDS = 'SAVE_SORTED_IDS';
export const SAVE_SORTED_COMMENTS_IDS = 'SAVE_SORTED_COMMENTS_IDS';
export const SAVE_CATEGORY = 'SAVE_CATEGORY';
export const UPVOTE_POST = 'UPVOTE_POST';
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT';
export const UPDATE_POST = 'UPDATE_POST';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const REMOVE_POST = 'REMOVE_POST';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';


export function saveCategories({ names }) {
    return {
        type: SAVE_CATEGORY,
        names,
    }
}


export function createComment({ id, parentId, timestamp, body, author, voteScore, parentDeleted }) {
    return {
        type: CREATE_COMMENT,
        id,
        parentId,
        timestamp,
        body,
        author,
        voteScore,
        parentDeleted,
    }
}

export function createPost({ id, timestamp, title, body, author, category, voteScore, deleted }) {
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
        id,
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

export function saveSortedCommentsIds({ allIds, sortedBy }) {
    return {
        type: SAVE_SORTED_COMMENTS_IDS,
        allIds,
        sortedBy
    }
}
export function updateComment({ id, parentId, timestamp, body, author, voteScore, parentDeleted }) {
    return {
        type: CREATE_COMMENT,
        id,
        parentId,
        timestamp,
        body,
        author,
        voteScore,
        parentDeleted,
    }
}

export function updatePost({ id, timestamp, title, body, author, category, voteScore, deleted }) {
    return {
        type: UPDATE_POST,
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
