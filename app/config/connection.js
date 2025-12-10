import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export async function connection() {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("Conectado ao Banco de Dados com sucesso!");
  } catch (err) {
    console.error("Erro ao conectar ao Banco de Dados:", err.message);
  }
}