const Reserva = require('../models/Reserva');
const User = require('../models/User');
const Casa = require('../models/Casa');

class ReservasController {

  async store(req, res){
    const { user_id } = req.headers;
    const { casa_id } = req.params;
    const { data } = req.body;

    const user = await User.findById(user_id);
    const casa = await Casa.findById(casa_id);

    if(!user){
      return res.status(400).json({
        error: {
          message: "Usuário não encontrado!"
        }
      });
    }

    if(!casa){
      return res.status(400).json({
        error: {
          message: "Casa não encontrada!"
        }
      });
    }

    if(!casa.status){
      return res.status(400).json({
        error: {
          message: "Casa está ocupada!"
        }
      });
    }

    if(String(user.id) === String(casa.user)){
      return res.status(400).json({
        error: {
          message: "Não é possível alugar a própria casa!"
        }
      });
    }

    const reserva = await Reserva.create({
      data,
      user: user_id,
      house: casa_id
    });

    return res.status(200).json({ 
      message: 'Reserva concluida com sucesso!',
      reserva 
    });
  }

}

module.exports = new ReservasController();