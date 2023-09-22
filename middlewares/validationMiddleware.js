const { body, param, validationResult } = require('express-validator');
const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} = require('../errors/index.js');
const db = require('../db');

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, _res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);

        if (errorMessages[0].startsWith("Pas d'article")) {
          throw new NotFoundError(errorMessages);
        }

        if (errorMessages[0].startsWith('Accès non')) {
          throw new UnauthorizedError(errorMessages);
        }

        throw new BadRequestError(errorMessages);
      }

      next();
    },
  ];
};

// register
const validateRegisterInput = withValidationErrors([
  body('pseudo')
    .trim()
    .notEmpty()
    .withMessage('Le nom est requis')
    .escape()
    .custom(async (pseudo) => {
      const {
        rows: [user],
      } = await db.query('SELECT * FROM users WHERE pseudo = $1', [pseudo]);
      if (user) {
        throw new Error('Ce pseudo existe déjà');
      }
    }),
  body('email')
    .trim()
    .notEmpty()
    .withMessage("L'email est requis")
    .isEmail()
    .withMessage("Format d'email non valide")
    .escape()
    .custom(async (email) => {
      const {
        rows: [user],
      } = await db.query('SELECT * FROM users WHERE email = $1', [email]);

      if (user) {
        throw new Error("L'email existe déjà");
      }
    }),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Le mot de passe est requis')
    .isLength({ min: 5 })
    .escape(),
  body('jobs')
    .trim()
    .notEmpty()
    .withMessage('Veuillez remplir le champs métier')
    .escape(),
]);

// Login
const validateLoginInput = withValidationErrors([
  body('email')
    .trim()
    .notEmpty()
    .withMessage("L'email est requis")
    .isEmail()
    .withMessage("Format d'email non valide")
    .escape(),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Le mot de passe est requis')
    .escape(),
]);

// articles
const validateAddArticleInput = withValidationErrors(
  body('title').trim().notEmpty().withMessage('Le nom est requis').escape(),
  body('category')
    .trim()
    .notEmpty()
    .withMessage('Un choix de catégorie est requis')
    .escape(),
  body('message').trim().notEmpty().escape()
);

// comments
const validateAddCommentInput = withValidationErrors(
  body('message').trim().notEmpty().withMessage('Entrez un message').escape()
);

// validateIdParam
const validateIdParam = withValidationErrors(
  param('id').custom(async (id, { req }) => {
    if (isNaN(Number(id))) {
      throw new Error('Id non valide');
    }

    const {
      rows: [articles],
    } = await db.query('SELECT * FROM articles WHERE article_id = $1', [id]);

    if (!articles) {
      throw new Error(`Pas d'article avec l'id ${id}`);
    }

    const isOwner = req.user.userId === articles.user_id;
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      throw new Error('Accès non autorisé');
    }
  })
);
// validateIdCommentParam
const validateIdCommentParam = withValidationErrors(
  param('id').custom(async (id, { req }) => {
    if (isNaN(Number(id))) {
      throw new Error('Id non valide');
    }

    const {
      rows: [comments],
    } = await db.query('SELECT * FROM comments WHERE comment_id = $1', [id]);

    if (!comments) {
      throw new Error(`Pas de commentaire avec l'id ${id}`);
    }

    const isOwner = req.user.userId === comments.user_id;
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      throw new Error('Accès non autorisé');
    }
  })
);

module.exports = {
  validateLoginInput,
  validateRegisterInput,
  validateAddArticleInput,
  validateAddCommentInput,
  validateIdParam,
  validateIdCommentParam,
};
