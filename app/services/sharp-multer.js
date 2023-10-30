import SharpMulter from 'sharp-multer';
import multer from 'multer';

// optional function to return new File Name
const newFilenameFunction = (og_filename, options) => {
  const newname = `${og_filename.split('.').slice(0, -1).join('.')
  }${options.useTimestamp ? `-${Date.now()}` : ''}`
        + `.${
          options.fileFormat}`;
  return newname;
};

const storage = SharpMulter({
  destination: (req, file, callback) => callback(null, 'uploads/'),

  imageOptions: {
    fileFormat: 'png',
    quality: 80,
    resize: { width: 500, height: 140, resizeMode: 'fill' },
  },
  filename: newFilenameFunction, // optional
});
const upload = multer({ storage });

export default upload;
