const { Schema, model} = require('mongoose');

const ReservaSchema = new Schema({
  data: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  house: {
    type: Schema.Types.ObjectId,
    ref: 'Casa'
  }
});

module.exports = model('Reserva', ReservaSchema);