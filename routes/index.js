import express from 'express';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import { connection } from '../app/config/connection.js';
import { UsuarioModel } from '../app/models/Usuario.js';
import { validateData } from '../app/middlewares/validationmiddleware.js';
import {
  userSchema,
  userSchemaLogin
} from '../app/middlewares/uservalidation.js';

const router = express.Router();
connection();
dotenv.config();

const saltRounds = 10;

router.get('/', (req, res) => {
  res.send('Bem-Vindo a nossa API!');
});

router.post('/login', validateData(userSchemaLogin), async (req, res) => {
  const {
    email,
    senha,
  } = req.body;

  try {
    const usuario = await UsuarioModel.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não existente!' });
    } else {
      const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
      if (senhaCorreta) {
        const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET);
        return res.status(200).json({ message: 'Login bem-sucedido', token: token });
      } else {
        return res.status(401).json({ message: 'Senha incorreta' });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor', error: error.message });
  }

});

router.post('/signUp', validateData(userSchema), async (req, res) => {
  const { email, senha, recSenha } = req.body;

  try {
    const usuarioExistente = await UsuarioModel.findOne({ email });
    if (usuarioExistente) {
      return res.status(409).json({ message: 'Usuário já existente' });
    } else {
      const senhaHashed = await bcrypt.hash(senha, saltRounds);
      const recSenhaHashed = await bcrypt.hash(recSenha, saltRounds);

      const novoUsuario = new UsuarioModel({
        email,
        senha: senhaHashed,
        recSenha: recSenhaHashed,
        data_cadastro: new Date().toISOString()
      });
      const response = await novoUsuario.save();
      if (response) {
        return res.status(201).json({ message: 'Usuário registrado com sucesso' });
      }
    }

  } catch (error) {
    return res.status(500).json({ message: 'Erro interno do servidor', error: error.message });
  }
})

export default router;