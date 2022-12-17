const Casa = require('../models/Casa');

class HouseController {

  async store(req, res){
    const { filename } = req.file;
    let { descricao, preco, localizacao, status } = req.body;
    status = status || true
    const { user_id} = req.headers;

    const casa = await Casa.create({
      user: user_id,
      capa: filename,
      descricao,
      preco,
      localizacao,
      status
    });

    return res.status(201).json({ 
      message: "Casa cadastrada com sucesso",
      casa
    })
  }
}

module.exports = new HouseController();