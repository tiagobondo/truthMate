import multer from "multer";

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    let nome = Date.now() + "-" + file.originalname; //Nome do arquivo acompanhado com a data
    cb(null, nome);
  },

  destination: (req, file, cb) => {
    let path = "./public/arquivos"; //Caminho de salvamento dos arquivos
    cb(null, path);
  }
});

export const upload = multer({ storage });