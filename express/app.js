import express from 'express';
import path from 'path';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/error.js';

const app = express();
const port = process.env.PORT || 8080;

/**
 * Body config
 */
// json
app.use(express.json());
// x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(logger);

// //   ejs config
// (function () {
//     app.set('view engine', 'ejs');
//     app.set('views', 'views');

//     app.get('/', (req, res) => {
//         res.render('index', { title: 'Welcome', message: 'This is a message' });
//     });
// })();

// (function () {
//     app.use('/api/posts', postRouter);
// })();

// const __dirname = dirname(fileURLToPath(import.meta.url));
const __dirname = import.meta.dirname;
// console.log(__dirname);
app.use(express.static(path.join(__dirname, 'html')));

app.use(notFoundHandler);

app.listen(port, () =>
    console.log('> Server is up and running on port : ' + port)
);
