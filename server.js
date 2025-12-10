import app from './app.js';
import dotenv from 'dotenv';
import http from 'http';

dotenv.config();

const server = http.createServer(app);
const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});