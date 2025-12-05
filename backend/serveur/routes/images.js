// server/routes/images.js
import express from 'express';
import {
  getImagesByFolder,
  getCategories,
  getEtages,
  getBackgrounds,
  proxyImage
} from '../controllers/imagesController.js';

const router = express.Router();

// ⚠️ D'abord les routes fixes
router.get('/categories', getCategories);
router.get('/etages', getEtages);
router.get('/backgrounds', getBackgrounds);

// 📌 Route pour proxifier les images (évite CORS sur iOS)
router.get('/proxy/:folder/:filename', proxyImage);

// 📌 Puis les routes dynamiques
router.get('/folder/:folder', getImagesByFolder);

export default router;
