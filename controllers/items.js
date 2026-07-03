const ClothingItem = require('../models/clothingItem');
const { CREATED } = require('../utils/errors');
const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');
const NotFoundError = require('../errors/not-found-err');

const getItems = (req, res, next) =>
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch(next);

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({
    name,
    weather,
    imageUrl,
    owner: req.user._id,
  })
    .then((item) => res.status(CREATED).send(item))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

const deleteItem = (req, res, next) => {
  const { id } = req.params;

  ClothingItem.findById(id)
    .orFail(() => new NotFoundError('Item not found'))
    .then((item) => {
      if (!item.owner.equals(req.user._id)) {
        throw new ForbiddenError('You cannot delete items of other users');
      }

      return item.deleteOne().then(() => res.send(item));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Invalid item id'));
      } else {
        next(err);
      }
    });
};

const likeItem = (req, res, next) => {
  const { id } = req.params;

  ClothingItem.findByIdAndUpdate(
    id,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => new NotFoundError('Item not found'))
    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Invalid item id'));
      } else {
        next(err);
      }
    });
};

const unlikeItem = (req, res, next) => {
  const { id } = req.params;

  ClothingItem.findByIdAndUpdate(
    id,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => new NotFoundError('Item not found'))
    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Invalid item id'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  unlikeItem,
};
