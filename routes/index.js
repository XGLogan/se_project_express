const router = require('express').Router();

const usersRouter = require('./users');
const itemsRouter = require('./items');

const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { NOT_FOUND } = require('../utils/errors');

router.post('/signin', login);
router.post('/signup', createUser);

router.use('/items', itemsRouter);

router.use(auth);

router.use('/users', usersRouter);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: 'Requested resource not found' });
});

module.exports = router;