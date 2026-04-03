const router = require('express').Router();

const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  unlikeItem,
} = require('../controllers/items');

const auth = require('../middlewares/auth');

router.get('/', getItems);

router.use(auth);

router.post('/', createItem);
router.delete('/:id', deleteItem);
router.put('/:id/likes', likeItem);
router.delete('/:id/likes', unlikeItem);

module.exports = router;