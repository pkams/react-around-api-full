const User = require("../models/user");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => {
      const ERROR_CODE = 500;
      res.status(ERROR_CODE).send({ message: "Error" });
    });
};

module.exports.getUsersById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      const error = new Error("Nenhum usuário encontrado com esse id");
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

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        const ERROR_CODE = 400;
        res.status(ERROR_CODE).send({
          message:
            "Dados inválidos passados aos métodos para criar um cartão/usuário",
        });
      } else {
        const ERROR_CODE = 400;
        res.status(ERROR_CODE).send({ message: "Error" });
      }
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about, avatar },
    { new: true, runValidators: true }
  )
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

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({
          message:
            "Dados inválidos passados aos métodos para criar um cartão/usuário",
        });
      } else {
        res.status(500).send({ message: "Error" });
      }
    });
};
