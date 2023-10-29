import userDataMapper from '../models/user.dataMapper.js';
import eventDataMapper from '../models/event.dataMapper.js';

export default {

  uploadProfilePicture(req, res) {
    const path = `http://caca-boudin.fr/static/${req.file.filename}`;
    // replace by id received by the front
    userDataMapper.updateUserPic(22, path);

    res.json({ message: 'image uploadée' });
  },

  uploadEventPicture(req, res) {
    const path = `http://caca-boudin.fr/static/${req.file.filename}`;
    // replace by id received by the front
    eventDataMapper.updateEventPicture(1, path);
    res.json({ message: 'image uploadée' });
  },
};
