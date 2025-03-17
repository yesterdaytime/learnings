export const posts = [
    {
        id: 1,
        title: 'Post One',
    },
    {
        id: 2,
        title: 'Post Two',
    },
    {
        id: 3,
        title: 'Post Three',
    },
    {
        id: 4,
        title: 'Test Post',
    },
    {
        id: 5,
        title: 'Test Post',
    },
    {
        id: 6,
        title: 'Test Post',
    },
];

const notFoundMsg = 'Not found the post which id is';
const missingFieldMsg = 'You must send a title in the request body';

const getPostById = (postId) => posts.find(({ id }) => id === postId);

export const getPosts = (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    let offset = parseInt(req.query.offset) || 0;

    if (offset < 0) {
        offset = 0;
    }

    if (limit < 1) {
        return res.status(500).json({ msg: 'Please input the correct limit' });
    }

    res.json(posts.slice(offset, limit + 1));
};

export const getPost = (req, res) => {
    const postId = parseInt(req.params?.id);

    const post = getPostById(postId);

    if (post) {
        return res.json(post);
    }

    res.status(400).json({ msg: `${notFoundMsg} ${postId}` });
};

export const addPosts = (req, res) => {
    const title = req.body.title;

    if (title) {
        const post = {
            id: posts.length + 1,
            title,
        };

        posts.push(post);

        return res.status(200).json(posts);
    }

    res.status(500).json({ msg: missingFieldMsg });
};

export const updatePost = (req, res) => {
    const title = req.body.title;

    if (!title) {
        return res.status(500).json({ msg: missingFieldMsg });
    }

    const postId = parseInt(req.params.id);

    const post = getPostById(postId);

    if (post && title) {
        post.title = title;
        return res.status(200).json(posts);
    }

    res.status(400).json({ msg: `${notFoundMsg} ${postId}` });
};

export const deletePost = (req, res) => {
    const postId = parseInt(req.params.id);

    const postIndex = posts.findIndex(({ id }) => postId === id);

    if (postIndex > -1) {
        posts.splice(postIndex, 1);

        res.status(200).json(posts);
    }

    res.status(400).json({ msg: `${notFoundMsg} ${postId}` });
};
