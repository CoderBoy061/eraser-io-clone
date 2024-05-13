import {Router} from 'express';
import { addMemberToTeam, createTeam, deleteTeam, getTeamsByUserId, updateTeam } from '../controllers/teamController.js';
import {isAuth} from "../middleware/isAuth.js"

const router = Router();

router.route("/create/team").post(isAuth,createTeam)
router.route("/get/teams").get(isAuth,getTeamsByUserId)
router.route("/delete/team/:teamId").delete(isAuth,deleteTeam)
router.route("/update/team/:teamId").patch(isAuth,updateTeam)
router.route("/add/members").patch(isAuth,addMemberToTeam)

export default router;
