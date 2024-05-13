import {Router} from 'express';

const router = Router();

import { isAuth } from '../middleware/isAuth.js';
import { getFilesByTeamId, getSingleFile, updateFile, uploadFile } from '../controllers/fileController.js';

router.route("/upload/file").post(isAuth,uploadFile)
router.route("/get/file/:teamId").get(isAuth,getFilesByTeamId)
router.route("/update/file/:teamId/:fileId").patch(isAuth,updateFile)
router.route("/get/:fileId").get(isAuth,getSingleFile)

export default router;