export const notFoundHandler = (req, res, next) => {
    const error = new Error('Not Found!');
    res.status(400).json(error);
};
