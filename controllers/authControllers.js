const { BadRequestError } = require('../errors');
const db = require('../db');
const { StatusCodes } = require('http-status-codes');
// appel de la fonction de création du token
const { createJWT } = require('../utils/tokenUtils.js');
// appel de la fonction de hashage du mot de passe
const { hashPassword, comparePassword } = require('../utils/passwordUtils.js');

const register = async (req, res) => {
  const { pseudo, email, password, jobs } = req.body;

  const {
    rows: [{ count }],
  } = await db.query('SELECT COUNT(*) FROM users');
  const isFirstAccount = Number(count) === 0;
  const role = isFirstAccount ? 'admin' : 'user';

  const hashedPassword = await hashPassword(password);

  const {
    rows: [user],
  } = await db.query(
    'INSERT INTO users (pseudo, email, password, role, jobs) VALUES ($1, $2, $3, $4,$5) RETURNING *',
    [pseudo, email, hashedPassword, role, jobs]
  );

  const token = createJWT({
    userId: user.user_id,
    pseudo: user.pseudo,
    role: user.role,
    jobs: user.jobs,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ msg: 'Utilisateur enregistré', token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const {
    rows: [user],
  } = await db.query('SELECT * FROM users WHERE email = $1', [email]);

  if (!user) {
    throw new BadRequestError('Identifiants invalides');
  }

  const isPasswordCorrect = await comparePassword(password, user.password);

  if (!isPasswordCorrect) {
    throw new BadRequestError('Identifiants invalides');
  }

  const token = createJWT({
    userId: user.user_id,
    pseudo: user.pseudo,
    role: user.role,
    jobs: user.jobs,
  });

  res.status(StatusCodes.OK).json({ msg: 'Utilisateur connecté', token });
};

module.exports = { register, login };
