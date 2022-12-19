const Reserva = require('../models/Reserva');
const User = require('../models/User');
const Casa = require('../models/Casa');
const { index } = require('./CasasController');

class ReservasController {
  async index(req, res) {
    const { user_id } = req.headers;

    const user = User.findById(user_id);

    if (!user) {
      return res.status(400).json({
        error: {
          message: 'Usuário não encontrado!',
        },
      });
    }

    const reservas = await Reserva.where({ user: user_id }).populate('casa');

    return res.status(200).json({
      message: 'Suas reservas!',
      reservas,
    });
  }

  async store(req, res) {
    const { user_id } = req.headers;
    const { casa_id } = req.params;
    const { data } = req.body;

    const user = await User.findById(user_id);
    const casa = await Casa.findById(casa_id);

    if (!user) {
      return res.status(400).json({
        error: {
          message: 'Usuário não encontrado!',
        },
      });
    }

    if (!casa) {
      return res.status(400).json({
        error: {
          message: 'Casa não encontrada!',
        },
      });
    }

    if (!casa.status) {
      return res.status(400).json({
        error: {
          message: 'Casa está ocupada!',
        },
      });
    }

    if (String(user.id) === String(casa.user)) {
      return res.status(400).json({
        error: {
          message: 'Não é possível alugar a própria casa!',
        },
      });
    }

    const reserva = await Reserva.create({
      data,
      user: user_id,
      casa: casa_id,
    });

    return res.status(200).json({
      message: 'Reserva concluida com sucesso!',
      reserva,
    });
  }

  async destroy(req, res) {
    const { user_id } = req.headers;
    const { reserva_id } = req.params;

    const user = User.findById(user_id);
    const reserva = Reserva.findById(reserva_id);

    if (String(user.id) !== String(reserva.user)) {
      return res.status(401).json({
        error: {
          message: 'Usuário não está autorizado a modificar as informações dessa reserva!',
        },
      });
    }

    await Reserva.findByIdAndDelete({ _id: reserva_id });

    return res.status(200).json({ ok: true });
  }
}

module.exports = new ReservasController();
