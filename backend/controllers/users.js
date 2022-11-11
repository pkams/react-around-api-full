const User = require("../models/user");
const bcrypt = require("bcryptjs"); // importando bcrypt
const jwt = require("jsonwebtoken");

const ServerError = require("../errors/server-err");
const NotFoundError = require("../errors/not-found-err");
const AuthError = require("../errors/auth-err");
const ConflictError = require("../errors/conflict-err");

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => {
      throw new ServerError("Erro no servidor.");
    });
};

module.exports.getUsersById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new NotFoundError("Cartão ou usuário não encontrado.");
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.statusCode === 404) {
        throw new NotFoundError("Cartão ou usuário não encontrado.");
      } else {
        throw new ServerError("Erro no servidor.");
      }
    });
};

module.exports.getMe = (req, res) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError("Cartão ou usuário não encontrado.");
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      console.log(err);
      if (err.name === "ValidationError") {
        throw new NotFoundError("Cartão ou usuário não encontrado.");
      } else {
        throw new ServerError("Erro no servidor.");
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
          throw new AuthError(
            "Dados inválidos passados aos métodos para criar um cartão/usuário"
          );
        } else if (err.name === "MongoError") {
          throw new ConflictError("User already taken");
        } else {
          throw new ServerError("Erro no servidor.");
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
        throw new AuthError(
          "Dados inválidos passados aos métodos para atualizar um cartão/usuário"
        );
      } else {
        throw new ServerError("Erro no servidor.");
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
        throw new AuthError(
          "Dados inválidos passados aos métodos para atualizar um cartão/usuário"
        );
      } else {
        throw new ServerError("Erro no servidor.");
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
      throw new AuthError(
        "Dados inválidos passados aos métodos para criar um cartão/usuário"
      );
    });
};
