// pour faire les requêtes http
const db = require('../db');
// pour les codes de status
const { StatusCodes } = require('http-status-codes');
// pour decoder les caractères spéciaux
const he = require('he');

const getAllArticles = async (req, res) => {
  const { category, title } = req.query;
  // Récupérez les paramètres de requête pour la pagination.
  const limit = Number(req.query.limit) || 10;
  // Si aucun paramètre de requête n'est fourni, la page par défaut est 1.
  const page = Number(req.query.page) || 1;
  // Calculez le décalage en fonction de la page et de la limite.
  const offset = (page - 1) * limit;

  // Créez un tableau pour stocker les clauses WHERE de la requête SQL.
  const whereClauses = [];
  // Créez un tableau pour stocker les paramètres de requête pour la requête SQL.
  const params = [];

  if (category && category !== 'tout') {
    whereClauses.push(`category = $${params.length + 1}`);
    params.push(category);
  }

  if (title) {
    whereClauses.push(`title ILIKE $${params.length + 1}`);
    params.push(`%${title}%`);
  }

  // Créez la requête SQL principale en utilisant des modèles de chaîne.
  const mainQuery = `
      SELECT articles.*, users.pseudo
      FROM articles
      LEFT JOIN users ON articles.user_id = users.user_id
      ${whereClauses.length > 0 ? 'WHERE ' + whereClauses.join(' AND ') : ''}
      ORDER BY articles.article_id DESC
      LIMIT $${params.length + 1}
      OFFSET $${params.length + 2}
    `;

  // Exécutez la requête SQL pour récupérer les articles.
  const { rows: articlesEncoded } = await db.query(mainQuery, [
    ...params,
    limit,
    offset,
  ]);

  // Déséchappez le titre de chaque article avant de les renvoyer au front-end
  const articles = articlesEncoded.map((article) => ({
    ...article,
    title: he.decode(article.title),
  }));

  // Créez une requête SQL pour obtenir le nombre total d'articles.
  const countQuery = `
      SELECT COUNT(*) FROM articles
      ${whereClauses.length > 0 ? 'WHERE ' + whereClauses.join(' AND ') : ''}
    `;

  // Exécutez la requête SQL pour obtenir le nombre total d'articles.
  const {
    rows: [{ count }],
  } = await db.query(countQuery, params);

  // Calculez le nombre de pages en fonction du nombre total d'articles et de la limite par page.
  const numberOfPages = Math.ceil(count / limit);

  // Renvoyez les résultats au client.
  res.status(StatusCodes.OK).json({
    count: articles.length,
    articles,
    currentPage: page,
    numberOfPages,
  });
};

const getAllCategories = async (_req, res) => {
  const { rows } = await db.query('SELECT DISTINCT category FROM articles');
  const categories = ['tout', ...rows.map((article) => article.category)];
  res.status(StatusCodes.OK).json({ categories });
};

const createArticle = async (req, res) => {
  const { title, category, message, image } = req.body;
  const { userId } = req.user;

  const {
    rows: [createdArticle],
  } = await db.query(
    'INSERT INTO articles (title,category,message,image,user_id) VALUES ($1,$2,$3,$4,$5) RETURNING *',
    [title, category, message, image, userId]
  );

  res
    .status(StatusCodes.CREATED)
    .json({ msg: 'Article créé', articles: createdArticle });
};

const getAllUserArticles = async (req, res) => {
  const { title } = req.query;
  const { userId, role } = req.user;
  const limit = Number(req.query.limit) || 10;
  const page = Number(req.query.page) || 1;
  const offset = (page - 1) * limit;

  // Créez un tableau pour stocker les clauses WHERE de la requête SQL.
  const whereClauses = [];
  const queryParams = [];

  if (role === 'admin') {
    // Si l'utilisateur est un admin, aucune condition WHERE n'est nécessaire.
  } else {
    whereClauses.push(`user_id = $${queryParams.length + 1}`);
    queryParams.push(userId);
  }

  if (title) {
    whereClauses.push(`title ILIKE $${queryParams.length + 1}`);
    queryParams.push(`%${title}%`);
  }

  // Créez la requête SQL principale en utilisant des modèles de chaîne.
  const mainQuery = `
      SELECT *
      FROM articles
      ${whereClauses.length > 0 ? 'WHERE ' + whereClauses.join(' AND ') : ''}
      ORDER BY article_id DESC
      LIMIT $${queryParams.length + 1}
      OFFSET $${queryParams.length + 2}
    `;

  // Exécutez la requête SQL pour récupérer les articles.
  const { rows: articlesEncoded } = await db.query(mainQuery, [
    ...queryParams,
    limit,
    offset,
  ]);

  // Déséchappez le titre de chaque article avant de les renvoyer au front-end
  const articles = articlesEncoded.map((article) => ({
    ...article,
    title: he.decode(article.title),
  }));

  // Créez une requête SQL pour obtenir le nombre total d'articles.
  const countQuery = `
      SELECT COUNT(*) FROM articles
      ${whereClauses.length > 0 ? 'WHERE ' + whereClauses.join(' AND ') : ''}
    `;

  // Exécutez la requête SQL pour obtenir le nombre total d'articles.
  const {
    rows: [{ count }],
  } = await db.query(countQuery, queryParams);

  // Calculez le nombre de pages en fonction du nombre total d'articles et de la limite par page.
  const numberOfPages = Math.ceil(count / limit);

  // Renvoyez les résultats au client.
  res.status(StatusCodes.OK).json({
    count: articles.length,
    articles,
    currentPage: page,
    numberOfPages,
  });
};

const getSingleArticle = async (req, res) => {
  const { id } = req.params;

  const {
    rows: [articleEncoded],
  } = await db.query(
    'SELECT * FROM articles JOIN users USING(user_id) WHERE articles.article_id = $1',
    [id]
  );

  if (!articleEncoded) {
    // Si aucun résultat n'est trouvé, renvoyer un objet vide
    return res.status(StatusCodes.OK).json({ article: null });
  }

  // Déséchappez le titre de l'article avant de le renvoyer au front-end
  const article = {
    ...articleEncoded,
    title: he.decode(articleEncoded.title),
  };

  delete article.password;

  res.status(StatusCodes.OK).json({ article });
};

const updateArticle = async (req, res) => {
  const { id } = req.params;
  const { title, category, message, image } = req.body;

  const {
    rows: [updatedArticle],
  } = await db.query(
    'UPDATE articles SET title = $1,category = $2,message = $3,image=$4 WHERE article_id = $5 RETURNING *',
    [title, category, message, image, id]
  );

  res
    .status(StatusCodes.OK)
    .json({ msg: 'Article modifié', article: updatedArticle });
};

// supression des articles et des commentaires liés
const deleteArticle = async (req, res) => {
  const { id } = req.params;

  const {
    rows: [deletedComments],
  } = await db.query('DELETE FROM comments WHERE article_id = $1 RETURNING *', [
    id,
  ]);
  const {
    rows: [deletedArticle],
  } = await db.query('DELETE FROM articles WHERE article_id = $1 RETURNING *', [
    id,
  ]);

  res.status(StatusCodes.OK).json({
    msg: 'Article supprimé',
    article: deletedArticle,
    comments: deletedComments,
  });
};

module.exports = {
  createArticle,
  getAllArticles,
  getAllCategories,
  getAllUserArticles,
  getSingleArticle,
  updateArticle,
  deleteArticle,
};
