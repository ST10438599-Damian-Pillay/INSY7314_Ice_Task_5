import express from 'express';
import multer from 'multer';
import { 
  getPhotos, 
  getAllPhotos,
  uploadPhoto, 
  updatePhoto, 
  deletePhoto 
} from '../controllers/photocontroller.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed'), false);
    }
  }
});

router.get('/', authenticate, getPhotos);
router.get('/all', authenticate, isAdmin, getAllPhotos);
router.post('/', authenticate, upload.single('image'), uploadPhoto);
router.put('/:photoId', authenticate, upload.single('image'), updatePhoto);
router.delete('/:photoId', authenticate, deletePhoto);

export default router;