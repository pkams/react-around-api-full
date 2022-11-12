const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    // cada usuário possui um campo de nome, cujos requisitos estão descritos abaixo:
    type: String, // o nome é uma string
    minlength: 2, // o comprimento mínimo do nome é de 2 caracteres
    maxlength: 30, // o comprimento máximo é de 30 caracteres
    default: "Jacques Cousteau",
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Explorer",
  },
  avatar: {
    type: String,
    validate: {
      validator: function (v) {
        const regexText = /^(http:\/\/|https:\/\/)w{0,3}.?(w*|d*|W)*#?/;
        return regexText.test(v);
      },
      message: (props) => `${props.value} is not a valid link!`,
    },
    default: "https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        const regexText =
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return regexText.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: {
    type: String, // o nome é uma string
    required: true, // cada usuário tem um nome, logo, é um campo obrigatório
    minlength: 2, // o comprimento mínimo do nome é de 8 caracteres
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("Senha ou e-mail incorreto"));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error("Senha ou e-mail incorreto"));
        }

        return user; // agora o usuário está disponível
      });
    });
};

module.exports = mongoose.model("user", userSchema);
