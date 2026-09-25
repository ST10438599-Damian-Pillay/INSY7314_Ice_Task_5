import Photo from '../models/Photo.js';
import { streamUpload, deleteFromCloudinary } from '../utils/cloudinary.js';

export const getPhotos = async (req, res) => {
  try {
    const photos = await Photo.find()
      .populate('owner', 'username email')
      .sort({ createdAt: -1 });
    
    res.status(200).json(photos);
  } catch (error) {
    console.error('Get photos error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllPhotos = async (req, res) => {
  try {
    const photos = await Photo.find()
      .populate('owner', 'username email')
      .sort({ createdAt: -1 });
    
    res.status(200).json(photos);
  } catch (error) {
    console.error('Get all photos error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const uploadPhoto = async (req, res) => {
  try {
    const { title, description } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    const result = await streamUpload(req.file.buffer);

    const photo = await Photo.create({
      title,
      description,
      imageUrl: result.secure_url,
      cloudinaryPublicId: result.public_id,
      owner: req.userId
    });

    await photo.populate('owner', 'username email');

    res.status(201).json(photo);
  } catch (error) {
    console.error('Upload photo error:', error);
    res.status(500).json({ message: 'Server error during upload' });
  }
};

export const updatePhoto = async (req, res) => {
  try {
    const { photoId } = req.params;
    const { title, description } = req.body;

    const photo = await Photo.findById(photoId);
    if (!photo) {
      return res.status(404).json({ message: 'Photo not found' });
    }

    if (photo.owner.toString() !== req.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this photo' });
    }

    if (req.file) {
      await deleteFromCloudinary(photo.cloudinaryPublicId);
      const result = await streamUpload(req.file.buffer);
      photo.imageUrl = result.secure_url;
      photo.cloudinaryPublicId = result.public_id;
    }

    if (title) photo.title = title;
    if (description !== undefined) photo.description = description;

    await photo.save();
    await photo.populate('owner', 'username email');

    res.status(200).json(photo);
  } catch (error) {
    console.error('Update photo error:', error);
    res.status(500).json({ message: 'Server error during update' });
  }
};

export const deletePhoto = async (req, res) => {
  try {
    const { photoId } = req.params;

    const photo = await Photo.findById(photoId);
    if (!photo) {
      return res.status(404).json({ message: 'Photo not found' });
    }

    if (photo.owner.toString() !== req.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this photo' });
    }

    await deleteFromCloudinary(photo.cloudinaryPublicId);
    await Photo.findByIdAndDelete(photoId);

    res.status(200).json({ message: 'Photo deleted successfully' });
  } catch (error) {
    console.error('Delete photo error:', error);
    res.status(500).json({ message: 'Server error during deletion' });
  }
};