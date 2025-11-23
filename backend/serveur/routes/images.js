import express from 'express';
import {
  getImagesByFolder,
  getCategories,
  getEtages
} from '../controllers/imagesController.js';

const router = express.Router();

// ⚠️ D’abord les routes fixes
router.get('/categories', getCategories);
router.get('/etages', getEtages);

// 📌 Puis les routes dynamiques
router.get('/folder/:folder', getImagesByFolder);

export default router;
