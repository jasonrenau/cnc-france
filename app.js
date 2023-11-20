require('express-async-errors');
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');

const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
// initialisation de express
const app = express();

// Upload de fichiers
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// middlewares
const notFound = require('./middlewares/notFoundMiddleware.js');
const errorHandler = require('./middlewares/errorHandlerMiddleware.js');

// routers
const authRouter = require('./routes/authRoutes.js');
const articlesRouter = require('./routes/articlesRoutes.js');
const userRouter = require('./routes/userRoutes.js');
const commentsRouter = require('./routes/commentsRoute.js');

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      'img-src': ["'self'", 'https: data:'],
    },
  })
);

app.use(cors());
// mon application va utiliser le format json
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));
// sert a appellé les fichiers statics (images, css, js)
app.use(express.static(path.resolve(__dirname, './client/dist')));

// routes
app.use('/api/v1/articles', articlesRouter);
app.use('/api/v1/comments', commentsRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/dist/index.html'));
});

app.use(notFound);
app.use(errorHandler);

// port d'écoute du serveur
const port = 5000;
app.listen(port, () => console.log(`Server is listening on port ${port}...`));
