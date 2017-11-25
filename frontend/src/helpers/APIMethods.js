const api = "http://localhost:3001"


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Authorization': 'BasicAuth',
  "Content-Type": "application/json",
}

export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())

export const getPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())

export const getPostsByCategory = (category) =>
  fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json())

export const getPost = (id) =>
  fetch(`${api}/posts/${id}`, { headers })
    .then(res => res.json())

export const getComments = (postId) =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())

export const getComment = (id) =>
  fetch(`${api}/comments/${id}`, { headers })
    .then(res => res.json())

export const createPost = (post) => (
fetch(`${api}/posts`, {headers: {'Authorization': 'BasicAuth',
			"Content-Type": "application/json"},
			method: 'POST',
			body: JSON.stringify(post)})
).then((res) => res.json())

export const createComment = (comment) => (
fetch(`${api}/comments`, {headers: {'Authorization': 'BasicAuth',
			"Content-Type": "application/json"},
			method: 'POST',
			body: JSON.stringify(comment)})
).then((res) => res.json())
			

export const updatePost = (id, post) =>
  fetch(`${api}/posts/${id}`, {headers: {'Authorization': 'lalal',
			"Content-Type": "application/json"},
			method: 'PUT',
			body: JSON.stringify(post)})
			.then((res) => res.json())
   
//let headers = { headers: { 'Authorization': 'key' } };

/*
export const upvotePost = (postId) => fetch(`${url}posts/${postId}`, {
    method: 'post',
    body: JSON.stringify({
        option: "upVote"
    }),
})
*/
   
export const deletePost = (id, post) =>
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ post })
  }).then(res => res.json())
   
export const addComment = () =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())

export const upvoteComment = (id, comment) =>
  fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ comment })
  }).then(res => res.json())
   
export const updateComment = (id, comment) =>
  fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ comment })
  }).then(res => res.json())

export const deleteComment = (id, comment) =>
  fetch(`${api}/comments/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ comment })
  }).then(res => res.json())
