import * as APIMethods from '../helpers/APIMethods';

export const CREATE_COMMENT = 'CREATE_COMMENT';
export const CREATE_POST = 'CREATE_POST';
export const SAVE_SORTED_IDS = 'SAVE_SORTED_IDS';
export const SAVE_SORTED_COMMENTS_IDS = 'SAVE_SORTED_COMMENTS_IDS';
export const SAVE_CATEGORY = 'SAVE_CATEGORY';
export const VOTE_POST = 'VOTE_POST';
export const VOTE_COMMENT = 'VOTE_COMMENT';
export const UPDATE_POST = 'UPDATE_POST';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const REMOVE_POST = 'REMOVE_POST';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';

const uuidv1 = require('uuid/v1');

export function saveCategory({ names }) {
    return {
        type: SAVE_CATEGORY,
        names,
    }
}

export function fetchCategories() {
    return (dispatch) => {
        return APIMethods.getCategories().then((data) => {
            let categories = [];
            data.categories.map((category) => categories.push(category.name))
            dispatch(saveCategory({ names: categories }))
        });
    }
}

export function fetchComments(postId) {
    return (dispatch, getState) => {
        return APIMethods.getComments(postId).then((data) => {
            data.map(comment => {
                let state = getState();
                if (!state.comments.allIds.includes(comment.id)) {
                    dispatch(saveComment(comment))
                }
                return true;
            })
        })
    }
}

export function flagCommentDeleted(commentId, parentId) {
    return (dispatch, getState) => {
        APIMethods.flagCommentDeleted(commentId).then((commentFlaggedRemoved) => {
            dispatch(removeComment(commentFlaggedRemoved.id));
            let state = getState();
            let updatedPost = state.posts.byId[parentId];
            let commentCount = updatedPost.commentCount === 0 ? 0 : updatedPost.commentCount - 1;
            updatedPost = { ...updatedPost, commentCount: commentCount }
            dispatch(updatePost(updatedPost));
        })
    }
}

export function fetchPosts() {
    return (dispatch, getState) => {
        return APIMethods.getPosts().then((data) => {
            data.map(post => {
                let state = getState()
                if (!state.posts.allIds.includes(post.id)) {
                    dispatch(savePost(post))
                } else {
                    dispatch(updatePost(post))
                }
                return true;
            })
        })
    }
}

export function createComment(comment) {
    const { parentId, body, author, parentDeleted } = comment;
    const timestamp = Date.now();
    const newComment = {
        parentId,
        body,
        author,
        timestamp,
        id: uuidv1(),
        voteScore: 0,
        parentDeleted
    }
    return (dispatch) => {
        return APIMethods.createComment(newComment)
            .then((newComment) => {
                dispatch(saveComment(newComment))
            });
    }
}

export function saveComment({ id, parentId, timestamp, body, author, voteScore, parentDeleted }) {
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

export function createPost(post) {
    const { title, body, author, category } = post;
    const timestamp = Date.now();
    const newPost = {
        title,
        body,
        author,
        category,
        timestamp,
        id: uuidv1(),
        voteScore: 0,
        commentCount: 0,
        deleted: false
    }
    return (dispatch) => {
        return APIMethods.createPost(newPost)
            .then((newPost) => {
                dispatch(savePost(newPost))
            })
    }
}

export function savePost({ id, timestamp, title, body, author, category, voteScore, deleted, commentCount }) {
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
        commentCount
    }
}

export function votePost(id, option) {
    return (dispatch) => {
        APIMethods.upvotePost(id, option).then((data) => dispatch(saveVote(data)))
    }
}

export function saveVote({ id, voteScore }) {
    return {
        type: VOTE_POST,
        id,
        voteScore: voteScore
    }
}

export function voteComment(id, option) {
    return (dispatch) => {
        APIMethods.upvoteComment(id, option).then((data) => dispatch(saveCommentVote(data)))
    }
}

export function saveCommentVote({ id, voteScore }) {
    return {
        type: VOTE_COMMENT,
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

export function updateComment(comment) {
    return (dispatch) => {
        console.log(comment.id, comment)
        APIMethods.updateComment(comment.id, comment).then((data) => {
            dispatch(saveUpdatedComment(data))
        })
    }
}

export function saveUpdatedComment({ id, parentId, timestamp, body, author, voteScore, parentDeleted }) {
    return {
        type: UPDATE_COMMENT,
        id,
        parentId,
        timestamp,
        body,
        author,
        voteScore,
        parentDeleted,
    }
}

export function updatePost(post) {
    return (dispatch) => {
        APIMethods.updatePost(post.id, post).then((data) => (dispatch(saveUpdatedPost(data))))
    }
}

export function saveUpdatedPost({ id, timestamp, title, body, author, category, voteScore, deleted, commentCount }) {
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
        commentCount
    }
}

export function flagPostToDeleted(postId) {
    return (dispatch) => {
        APIMethods.flagPostToDeleted(postId).then((postFlaggedRemoved) => dispatch(removePost(postFlaggedRemoved.id))
        )
    }
}

export function removePost(id) {
    return {
        type: REMOVE_POST,
        id,
    }
}

export function removeComment(id) {
    return {
        type: REMOVE_COMMENT,
        id,
    }
}
