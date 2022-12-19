const yup = require('yup');
const Casa = require('../models/Casa');
const User = require('../models/User');

class HouseController {
  async index(req, res) {
    const { status } = req.query;

    const casas = await Casa.where({ status });

    return res.status(200).json({
      message: 'Casas encontradas!',
      casas,
    });
  }

  async store(req, res) {
    const schema = yup.object().shape({
      descricao: yup.string().required(),
      preco: yup.number().required(),
      localizacao: yup.string().required(),
    });

    const { filename } = req.file;
    const {
      descricao, preco, localizacao,
    } = req.body;

    let { status } = req.body;
    status = status || true;

    const { user_id } = req.headers;

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: {
          message: 'Falha na validação!',
        },
      });
    }

    const casa = await Casa.create({
      user: user_id,
      capa: filename,
      descricao,
      preco,
      localizacao,
      status,
    });

    return res.status(201).json({
      message: 'Casa cadastrada com sucesso',
      casa,
    });
  }

  async update(req, res) {
    const schema = yup.object().shape({
      descricao: yup.string().required(),
      preco: yup.number().required(),
      localizacao: yup.string().required(),
      status: yup.boolean().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: {
          message: 'Falha na validação!',
        },
      });
    }
    const { id } = req.params;
    const { filename } = req.file;
    const {
      descricao, preco, localizacao, status,
    } = req.body;
    const { user_id } = req.headers;

    const user = await User.findById(user_id);
    const casa = await Casa.findById(id);

    if (!user) {
      return res.status(404).json({
        error: {
          message: 'Usuário não encontrado!',
        },
      });
    }

    if (!casa) {
      return res.status(404).json({
        error: {
          message: 'Casa não encontrada!',
        },
      });
    }

    if (String(user.id) !== String(casa.user)) {
      return res.status(401).json({
        error: {
          message: 'Usuário não está autorizado a modificar as informações dessa casa!',
        },
      });
    }

    const update_casa = await Casa.updateOne({ _id: id }, {
      user: user_id,
      capa: filename,
      descricao,
      preco,
      localizacao,
      status,
    });

    return res.status(200).json({
      message: 'Casa atualizada com sucesso!',
      casa: update_casa,
    });
  }

  async show(req, res) {
    const { id } = req.params;

    const casa = await Casa.findById(id);

    if (!casa) {
      return res.status(404).json({
        error: {
          message: 'Casa não encontrado!',
        },
      });
    }

    return res.status(200).json({
      message: 'Casa encontrada com sucesso!',
      casa,
    });
  }

  async destroy(req, res) {
    const { id } = req.params;
    const { user_id } = req.headers;

    const user = await User.findById(user_id);
    const casa = await Casa.findById(id);

    if (!user) {
      return res.status(404).json({
        error: {
          message: 'Usuário não encontrado!',
        },
      });
    }

    if (!casa) {
      return res.status(404).json({
        error: {
          message: 'Casa não encontrada!',
        },
      });
    }

    if (String(user.id) != String(casa.user)) {
      return res.status(401).json({
        error: {
          message: 'Usuário não está autorizado a modificar as informações dessa casa!',
        },
      });
    }

    await Casa.deleteOne({ _id: id });

    return res.status(200).json({
      message: 'Casa destruída com sucesso!',
      resulte: true,
    });
  }
}

module.exports = new HouseController();
