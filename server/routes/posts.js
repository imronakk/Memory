import express from "express";
import { getPosts, fetchPostsBySearch, createPost, updatePost, deletePost, likePost, getPost } from "../controllers/posts.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPost);

router.get('/search', fetchPostsBySearch);
router.post('/',  auth ,createPost);
router.patch('/:id',  auth ,updatePost);
router.delete('/:id', auth ,deletePost);
router.patch('/:id/likepost', auth ,likePost);

export default router