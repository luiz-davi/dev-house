const Casa = require('../models/Casa');
const User = require('../models/User');

class DashboardController {
  
  async houses(req, res){
    const { user_id } = req.headers;

    if(! await User.findById(user_id)){
      return res.status(404).json({
        error: {
          message: "Usuário não encontrado!"
        }
      });
    }

    const casas = await Casa.where({ user: user_id });

    return res.status(200).json({
      casas: casas
    });
  }
}

module.exports = new DashboardController();