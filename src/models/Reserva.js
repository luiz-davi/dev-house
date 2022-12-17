const { Schema, model} = require('mongoose');

const ReservaSchema = new Schema({
  data: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  casa: {
    type: Schema.Types.ObjectId,
    ref: 'House'
  }
});

module.exports = model('Reserva', ReservaSchema);