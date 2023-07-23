import * as api from '../api';
import { CREATE, UPDATE, DELETE, FETCH_ALL, FETCH_BY_SEARCH, START_LOADING, END_LOADING, LIKE, FETCH_POST } from '../constants/actionTypes';

// Action creators 

export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING})
        const { data } = await api.fetchPost(id);

        dispatch({ type: FETCH_POST, payload: data });
        // dispatch({type: END_LOADING})

    } catch (error) {
        console.log(error)
    }
}   

export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING})
        const { data: { data, currentpage, numberofpages } } = await api.fetchPosts(page);

        dispatch({ type: FETCH_ALL, payload: { data, currentpage, numberofpages } });
        // dispatch({type: END_LOADING})

    } catch (error) {
        console.log(error)
    }
}   

export const fetchPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);

       
        dispatch({ type: FETCH_BY_SEARCH, payload: data });
        dispatch({ type: END_LOADING })

    } catch (error) {
        console.log(error)
    }
}

export const createPosts = (post) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.createPosts(post)
        dispatch({ type: CREATE, payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const updatePost = (id, newPost) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, newPost)
        dispatch({ type: UPDATE, payload: data })
    } catch (error) {
        console.log(error)
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {

        await api.deletePost(id)
        dispatch({ type: DELETE, payload: id })
    } catch (error) {
        console.log(error)
    }
}

export const likepost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id)
        dispatch({ type: LIKE, payload: data })
    } catch (error) {
        console.log(error)
    }
}