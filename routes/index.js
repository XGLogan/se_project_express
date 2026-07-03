const router = require('express').Router();

const usersRouter = require('./users');
const itemsRouter = require('./items');

const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const {
  validateUserBody,
  validateAuthentication,
} = require('../middlewares/validation');
const NotFoundError = require('../errors/not-found-err');

router.post('/signin', validateAuthentication, login);
router.post('/signup', validateUserBody, createUser);

router.use('/items', itemsRouter);

router.use(auth);

router.use('/users', usersRouter);

router.use((req, res, next) => {
  next(new NotFoundError('Requested resource not found'));
});

module.exports = router;
