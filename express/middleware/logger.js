import colors from 'colors';

const methodColors = {
    GET: colors.green,
    POST: colors.blue,
    PUT: colors.yellow,
    DELETE: colors.red,
};

export const logger = (req, res, next) => {
    //  req.host == req.hostname， req.get('host') 有端口号
    console.log(
        methodColors[req.method](
            `${req.method} ${req.protocol}://${req.get('host')}${
                req.originalUrl
            }`
        )
    );
    next();
};
