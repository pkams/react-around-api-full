const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    // cada usuário possui um campo de nome, cujos requisitos estão descritos abaixo:
    type: String, // o nome é uma string
    required: true, // cada usuário tem um nome, logo, é um campo obrigatório
    minlength: 2, // o comprimento mínimo do nome é de 2 caracteres
    maxlength: 30, // o comprimento máximo é de 30 caracteres
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        const regexText = /^(http:\/\/|https:\/\/)w{0,3}.?(w*|d*|W)*#?/;
        return regexText.test(v);
      },
      message: (props) => `${props.value} is not a valid link!`,
    },
  },
});

module.exports = mongoose.model("user", userSchema);
