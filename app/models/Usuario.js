import mongoose from 'mongoose';

const UsuarioSchema = new mongoose.Schema({
  email: {
    type: String,
    rquired: true,
  },

  senha: {
    type: String,
    required: true,
  },

  recSenha: {
    type: String,
    required: true
  },

  data_cadastro: {
    type: String
  }
})

export const UsuarioModel = mongoose.model('usuarios', UsuarioSchema);