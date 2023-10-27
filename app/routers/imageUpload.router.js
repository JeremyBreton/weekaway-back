import { Router } from 'express';
import multer from 'multer';
import controllerWrapper from '../middlewares/controller.wrapper.js';
import uploadController from '../controllers/upload.controller.js';

// Refacto???
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    console.log(file);
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

const imageUploadRouter = Router();

imageUploadRouter.post('/uploadprofile', upload.single('avatar'), controllerWrapper(uploadController.uploadProfilePicture));
imageUploadRouter.post('/uploadevent', upload.single('event'), controllerWrapper(uploadController.uploadEventPicture));

export default imageUploadRouter;
