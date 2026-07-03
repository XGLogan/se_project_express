const router = require('express').Router();

const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  unlikeItem,
} = require('../controllers/items');

const auth = require('../middlewares/auth');
const {
  validateItemBody,
  validateId,
} = require('../middlewares/validation');

router.get('/', getItems);

router.use(auth);

router.post('/', validateItemBody, createItem);
router.delete('/:id', validateId, deleteItem);
router.put('/:id/likes', validateId, likeItem);
router.delete('/:id/likes', validateId, unlikeItem);

module.exports = router;
