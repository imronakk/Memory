import postMessage from "../models/postMessage.js"
import mongoose from "mongoose"

export const getPosts = async (req, res) => {
    const {page} = req.query
    try {
        const LIMIT = 8;
        const startindex = (Number(page) - 1) * LIMIT;
        const Total = await postMessage.countDocuments({});
        const posts = await postMessage.find().sort({ _id: -1}).limit(LIMIT).skip(startindex);

        res.status(200).json({ data:posts , currentpage: Number(page) , numberofpages: Math.ceil(Total / LIMIT) });
    } catch (error) {
        res.status(404).json({ message: `Some error occured ${error.message}` })
    }
}

export const getPost = async (req, res) => {
    const {id} = req.params
    try {
        
        const post = await postMessage.findById(id)
        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({ message: `Some error occured ${error.message}` })
    }
}

export const fetchPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query
    try {
        const title = new RegExp(searchQuery, 'i')
        const post = await postMessage.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] })
        res.status(200).json({ data: post });

    } catch (error) {
        res.status(404).json({ message: `Some error occured at searchposts ${error.message}` })
    }
}

export const createPost = async (req, res) => {

    const post = req.body;
    const newPost = new postMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });
    try {
        await newPost.save()
        res.status(201).json({ newPost })
    } catch (error) {
        res.status(404).json({ message: `Some error occured ${error.message}` })
    }
}

export const updatePost = async (req, res) => {

    const { id: _id } = req.params;
    const updatedPost = req.body
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No Memory found with that id.")

    const newPostCreated = await postMessage.findByIdAndUpdate(_id, updatedPost, { new: true })

    res.send(newPostCreated)
}

export const deletePost = async (req, res) => {

    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No Memory found with that id.")

        await postMessage.findByIdAndRemove(id)
        res.send("Post deleted successfully")

    } catch (error) {
        console.log(error)
    }
}

export const likePost = async (req, res) => {
    try {

        const { id } = req.params
        if (!req.userId) return res.status(404).send("Unauthenticated User")

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No Memory found with that id.")
        const post = await postMessage.findById(id)

        const index = post.likes.findIndex((id) => id === String(req.userId))

        if (index === -1) {
            post.likes.push(req.userId)
        } else {
            post.likes = post.likes.filter((id) => id !== String(req.userId))
        }
        const updatedPost = await postMessage.findByIdAndUpdate(id, post, { new: true })
        res.json(updatedPost)

    } catch (error) {
        console.log(`${error} at likepost`)
    }
}