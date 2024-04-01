// src/api/routes/media.routes.js
import express from 'express';
import * as mediaController from '../controllers/media.controller.js';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

/**
 * @swagger
 * /media/upload:
 *   post:
 *     summary: Upload a media file
 *     description: Allows users to upload media files.
 *     tags: [Media]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: File to upload.
 *     responses:
 *       200:
 *         description: File uploaded successfully.
 *       400:
 *         description: Error uploading the file.
 */
router.post('/upload', upload.single('file'), mediaController.uploadFile);

/**
 * @swagger
 * /media/{id}:
 *   get:
 *     summary: Fetch a media file
 *     description: Fetches a media file by its ID.
 *     tags: [Media]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The media file ID
 *     responses:
 *       200:
 *         description: Media file fetched successfully.
 *         content:
 *           image/png:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: File not found.
 */
router.get('/:id', mediaController.fetchMedia);

/**
 * @swagger
 * /media/{id}:
 *   delete:
 *     summary: Delete a media file
 *     description: Deletes a media file by its ID.
 *     tags: [Media]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The media file ID to delete
 *     responses:
 *       200:
 *         description: Media file deleted successfully.
 *       404:
 *         description: File not found.
 */
router.delete('/:id', mediaController.deleteMedia);

export default router;