const User = require("../models/user");
const bcrypt = require("bcryptjs"); // importando bcrypt
const jwt = require("jsonwebtoken");

const { NODE_ENV, JWT_SECRET } = process.env;

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

module.exports.getMe = (req, res) => {
  User.findById(req.user._id)
    .orFail(() => {
      const error = new Error("Nenhum usuário encontrado.");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      console.log(err);
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
  bcrypt.hash(req.body.password, 10).then((hash) => {
    User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash,
    })
      .then((user) => {
        res.send({
          data: user,
        });
      })
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
  });
};

module.exports.updateUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about, avatar },
    { new: true, runValidators: true }
  )
    .select("+password")
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        const ERROR_CODE = 400;
        res.status(ERROR_CODE).send({
          message: "Dados inválidos passados aos métodos para editar usuário",
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
    .select("+password")
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

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // autenticação bem-sucedida! o usuário está na variável user
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
        {
          expiresIn: "7d",
        }
      );
      res.send({ token });
    })
    .catch((err) => {
      // erro de autenticação
      res.status(401).send({ message: err.message });
    });
};
