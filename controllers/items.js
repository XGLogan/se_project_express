const mongoose = require('mongoose');

const ClothingItem = require('../models/clothingItem');
const {
  BAD_REQUEST,
  FORBIDDEN,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  CREATED,
} = require('../utils/errors');

const getItems = (req, res) =>
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch(() =>
      res.status(INTERNAL_SERVER_ERROR).send({
        message: 'An error has occurred on the server.',
      }));

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  return ClothingItem.create({
    name,
    weather,
    imageUrl,
    owner: req.user._id,
  })
    .then((item) => res.status(CREATED).send(item))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }

      return res.status(INTERNAL_SERVER_ERROR).send({
        message: 'An error has occurred on the server.',
      });
    });
};

const deleteItem = (req, res) => {
  const { id } = req.params;

  return ClothingItem.findById(id)
    .orFail(() => {
      const error = new Error('Item not found');
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((item) => {
      if (!item.owner.equals(req.user._id)) {
        return res.status(FORBIDDEN).send({ message: 'Forbidden' });
      }

      return item.deleteOne().then(() => res.send(item));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST).send({ message: 'Invalid item id' });
      }

      if (err.statusCode === NOT_FOUND) {
        return res.status(NOT_FOUND).send({ message: err.message });
      }

      return res.status(INTERNAL_SERVER_ERROR).send({
        message: 'An error has occurred on the server.',
      });
    });
};

const likeItem = (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(BAD_REQUEST).send({ message: 'Invalid item id' });
  }

  return ClothingItem.findByIdAndUpdate(
    id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((item) => {
      if (!item) {
        return res.status(NOT_FOUND).send({ message: 'Item not found' });
      }

      return res.send(item);
    })
    .catch(() =>
      res.status(INTERNAL_SERVER_ERROR).send({
        message: 'An error has occurred on the server.',
      }));
};

const unlikeItem = (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(BAD_REQUEST).send({ message: 'Invalid item id' });
  }

  return ClothingItem.findByIdAndUpdate(
    id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((item) => {
      if (!item) {
        return res.status(NOT_FOUND).send({ message: 'Item not found' });
      }

      return res.send(item);
    })
    .catch(() =>
      res.status(INTERNAL_SERVER_ERROR).send({
        message: 'An error has occurred on the server.',
      }));
};

module.exports = {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  unlikeItem,
};