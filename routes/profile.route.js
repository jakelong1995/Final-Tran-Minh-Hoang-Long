import express from 'express';
import {getProfiles, createProfile, updateProfile, deleteProfile } from "../controllers/profile.controller.js"
const router = express.Router();

router.get('/', getProfiles);

router.post('/', createProfile);

router.put('/', updateProfile);

router.delete('/', deleteProfile);

export default router;