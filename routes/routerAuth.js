import express from 'express';

const router = express.Router();
import { upload } from '../app/config/configMulter.js';
import { FuncionarioModel } from '../app/models/Funcionario.js';
import { UsuarioModel } from '../app/models/Usuario.js';

router.get('/funcionarios', async (req, res) => {
  try {
    const funcionarios = await FuncionarioModel.find();
    return res.status(200).json({ funcionarios });
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor', error: error.message });
  }
})

router.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await UsuarioModel.find();
    return res.status(200).json({ usuarios });
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor', error: error.message });
  }
})

router.post('/reg_funcionario', upload.single("documento"), async (req, res) => {

  var documento = req.file.filename;
  const { nome_completo, funcao } = req.body;

  try {
    const novoFuncionario = new FuncionarioModel({
      nome_completo,
      funcao,
      documento,
      data_cadastro: new Date().toISOString()
    });

    const response = await novoFuncionario.save();
    if (response) {
      return res.status(201).json({ message: 'Funcionário registrado com sucesso' });
    }

  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor', error: error.message });
  }
})

router.delete('/delete_funcionario/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const response = await FuncionarioModel.deleteOne({ _id: id });
    if (response) {
      return res.status(200).json({ message: 'Usuário deletado com sucesso' });
    } else {
      return res.status(404).json({ message: 'Funcionário não encontrado' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor', error: error.message });
  }
})

export default router;