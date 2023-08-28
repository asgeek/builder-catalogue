import express from 'express';
import { getCollaborators, getBuildableSets, getMissingPieces } from '../controllers/inventoryController.js';

const router = express.Router();

router.get('/user/:username/buildable-sets', getBuildableSets);
router.get('/user/:username/set/:setname/missing-pieces', getMissingPieces);
router.get('/user/:username/set/:setname/collaborators', getCollaborators);

export default router;

