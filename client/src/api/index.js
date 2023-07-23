import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' })

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

// CRUD OPERATIONS POSTS 
export const fetchPost = (id) => API.get(`/posts/${id}`)
export const fetchPosts = (page) => API.get(`/posts?page=${page}`)
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
export const createPosts = (newPost) => API.post('/posts', newPost)
export const updatePost = ( id, newPost ) => API.patch( `/posts/${id}` , newPost )
export const deletePost = (id) => API.delete(`/posts/${id}`)   
export const likePost = (id) => API.patch(`/posts/${id}/likepost`)

// FOR AUTH USERS  

export const signin = (formData) => API.post('/user/signin',formData)
export const signup = (formData) => API.post('/user/signup',formData)