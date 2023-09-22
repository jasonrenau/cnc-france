const { Router } = require('express');
const router = Router();

const {
  authenticateUser,
  authorizePermissions,
} = require('../middlewares/authenticationMiddleware.js');

const {
  validateAddCommentInput,
  validateIdCommentParam,
} = require('../middlewares/validationMiddleware.js');

const {
  createComment,
  getAllComments,
  deleteComment,
} = require('../controllers/commentsController.js');

router.route('/:id').get(getAllComments);

router
  .use(authenticateUser)
  .route('/comment/:id')
  .post(
    authorizePermissions('admin', 'user'),
    validateAddCommentInput,
    createComment
  )
  .delete(
    authorizePermissions('admin', 'user'),
    validateIdCommentParam,
    deleteComment
  );

module.exports = router;
