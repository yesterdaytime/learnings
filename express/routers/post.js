import express from 'express';
import {
    addPosts,
    deletePost,
    getPost,
    getPosts,
    updatePost,
} from '../controllers/post.js';

export const router = express.Router();

router.get('/', getPosts);

router.get('/:id', getPost);

router.post('/', addPosts);

router.put('/:id', updatePost);

router.delete('/:id', deletePost);
