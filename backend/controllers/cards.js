const Card = require("../models/card");
const validator = require("validator");

const ServerError = require("../errors/server-err");
const NotFoundError = require("../errors/not-found-err");
const AuthError = require("../errors/auth-err");

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => {
      throw new ServerError("Erro no servidor.");
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        throw new AuthError(
          "Dados inválidos passados aos métodos para criar um cartão/usuário"
        );
      } else {
        throw new ServerError("Erro no servidor.");
      }
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      throw new AuthError(
        "Dados inválidos passados aos métodos para criar um cartão/usuário"
      );
    })
    .then((card) => {
      if (card && req.user._id.toString() === card.owner.toString()) {
        Card.deleteOne(card).then((deletedCard) => {
          res.send(deletedCard);
        });
      } else if (!card) {
        throw new NotFoundError("Cartão não encontrado.");
      } else {
        throw new AuthError(
          "Você precisa ser o dono deste card para deletá-lo."
        );
      }
    })
    .catch((err) => {
      if (err.statusCode === 404) {
        const ERROR_CODE = 404;
        throw new NotFoundError("Cartão não encontrado.");
      } else {
        throw new ServerError("Erro no servidor.");
      }
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // adicione _id ao array se ele não estiver lá
    { new: true }
  )
    .orFail(() => {
      throw new AuthError("Nenhum cartão encontrado com esse id");
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.statusCode === 404) {
        throw new NotFoundError("Cartão não encontrado.");
      } else {
        throw new ServerError("Erro no servidor.");
      }
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // remova _id do array
    { new: true }
  )
    .orFail(() => {
      throw new AuthError("Nenhum cartão encontrado com esse id");
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.statusCode === 404) {
        throw new NotFoundError("Cartão não encontrado.");
      } else {
        throw new ServerError("Erro no servidor.");
      }
    })
    .catch(next);
};
