import multer from 'multer';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    const fileObj = {
      'image/png': '.png',
      'image/jpeg': '.jpeg',
      'image/jpg': '.jpg',
    };
    if (fileObj[file.mimetype] === undefined) {
      cb(new Error('file format not valid'));
    } else {
      cb(null, `${file.fieldname}-${Date.now()}${fileObj[file.mimetype]}`);
    }
  },
});
const upload = multer({ storage });

export default upload;
