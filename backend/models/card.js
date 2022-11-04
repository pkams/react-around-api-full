const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  name: {
    type: String, // o nome é uma string
    required: true, // cada card tem um nome, logo, é um campo obrigatório
    minlength: 2, // o comprimento mínimo do nome é de 2 caracteres
    maxlength: 30, // o comprimento máximo é de 30 caracteres
  },
  link: {
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
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      default: "",
    },
  ],
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("card", cardSchema);
