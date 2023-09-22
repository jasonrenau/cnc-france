const { Router } = require('express');
const router = Router();

const {
  authenticateUser,
  authorizePermissions,
} = require('../middlewares/authenticationMiddleware.js');

const {
  validateAddArticleInput,
  validateIdParam,
} = require('../middlewares/validationMiddleware.js');

const {
  createArticle,
  getAllArticles,
  getAllCategories,
  getAllUserArticles,
  getSingleArticle,
  updateArticle,
  deleteArticle,
} = require('../controllers/articlesController.js');

const uploadImage = require('../controllers/uploadsController.js');

// routes
router.route('/all').get(getAllArticles);
router.route('/categories').get(getAllCategories);
router.route('/article/:id').get(getSingleArticle);
router.use(authenticateUser).route('/uploads').post(uploadImage);
router
  .use(authenticateUser)
  .route('/user')
  .get(authorizePermissions('admin', 'user'), getAllUserArticles)
  .post(validateAddArticleInput, createArticle);
router
  .use(authenticateUser)
  .route('/user/:id')
  .put(
    authorizePermissions('admin', 'user'),
    [(validateIdParam, validateAddArticleInput)],
    updateArticle
  )
  .delete(
    authorizePermissions('admin', 'user'),
    validateIdParam,
    deleteArticle
  );

module.exports = router;
