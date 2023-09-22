const { Router } = require('express');
const router = Router();
const { rateLimit } = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: 'draft-7', // draft-6: RateLimit-* headers; draft-7: combined RateLimit header
  legacyHeaders: false, // X-RateLimit-* headers
  message: {
    msg: "Trop d'essais  à partir de cette adresse IP, veuillez réessayer après 15 min",
  },
});

const {
  validateLoginInput,
  validateRegisterInput,
} = require('../middlewares/validationMiddleware.js');
const { register, login } = require('../controllers/authControllers.js');

router.post('/register', limiter, validateRegisterInput, register);
router.post('/login', limiter, validateLoginInput, login);

module.exports = router;
