import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/imagenes');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const nombre = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, nombre + ext);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {

    const allowedMimeTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp'
    ];

    const allowedExtensions = [
      '.jpg',
      '.jpeg',
      '.png',
      '.gif',
      '.webp'
    ];

    const ext = path.extname(file.originalname).toLowerCase();

    if (
      allowedMimeTypes.includes(file.mimetype) &&
      allowedExtensions.includes(ext)
    ) {
      cb(null, true);
    } else {
      //cb(new Error('Solo se permiten imágenes JPG, JPEG, PNG o GIF'));
      cb(null,false)
    }
  }
});

export default upload;