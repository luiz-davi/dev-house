const { Schema, model } = require('mongoose');

const HouseSchema = new Schema({
  capa: String,
  descricao: String,
  preco: Number,
  localizacao: String,
  status: Boolean,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = model('House', HouseSchema);