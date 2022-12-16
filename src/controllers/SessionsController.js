const User = require('../models/User')

// Métodos: index, show, store, update, destroy
class SessionsController{

  async store(req, res) {
    const { email } = req.body;

    // Verificando se o usuário já existe
    let user = await User.findOne({ email });
    
    // se ele n existir, criar um novo
    if(!user){
      user = await User.create({ email });
    }

    return res.status(201).json({
       message: "Usuário criado com sucesso!",
       usuario: user 
    });
  }

}

module.exports = new SessionsController();