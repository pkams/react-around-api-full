const Card = require("../models/card");

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => {
      const ERROR_CODE = 500;
      res.status(ERROR_CODE).send({ message: "Error" });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        const ERROR_CODE = 400;
        res.status(ERROR_CODE).send({
          message:
            "Dados inválidos passados aos métodos para criar um cartão/usuário",
        });
      } else {
        const ERROR_CODE = 500;
        res.status(ERROR_CODE).send({ message: "Error" });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      const error = new Error("Nenhum cartão encontrado com esse id");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.statusCode === 404) {
        const ERROR_CODE = 404;
        res
          .status(ERROR_CODE)
          .send({ message: "Cartão ou usuário não encontrado" });
      } else {
        const ERROR_CODE = 500;
        res.status(ERROR_CODE).send({ message: "Error" });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // adicione _id ao array se ele não estiver lá
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Nenhum cartão encontrado com esse id");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.statusCode === 404) {
        const ERROR_CODE = 404;
        res
          .status(ERROR_CODE)
          .send({ message: "Cartão ou usuário não encontrado" });
      } else {
        const ERROR_CODE = 500;
        res.status(ERROR_CODE).send({ message: "Error" });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // remova _id do array
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Nenhum cartão encontrado com esse id");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.statusCode === 404) {
        const ERROR_CODE = 404;
        res
          .status(ERROR_CODE)
          .send({ message: "Cartão ou usuário não encontrado" });
      } else {
        const ERROR_CODE = 500;
        res.status(ERROR_CODE).send({ message: "Error" });
      }
    });
};
