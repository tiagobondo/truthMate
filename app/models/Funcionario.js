import mongoose from 'mongoose';

const FuncionarioSchema = new mongoose.Schema({
  nome_completo: {
    type: String,
    rquired: true,
  },

  funcao: {
    type: String,
    required: true,
  },

  documento: {
    type: String,
    required: true
  },

  data_cadastro: {
    type: String
  }
})

export const FuncionarioModel = mongoose.model('funcionarios', FuncionarioSchema);