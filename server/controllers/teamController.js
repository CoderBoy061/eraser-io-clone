import Team from "../models/teamSchema.js";
import File from "../models/fileSchema.js";
import User from "../models/userSchema.js";
// @desc Create a new team

const createTeam = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ status: false, message: "Please provide a team name" });
  }

  try {
    const teamExists = await Team.findOne({ name });
    if (teamExists) {
      return res
        .status(400)
        .json({ status: false, message: "Team already exists" });
    }
    const team = new Team({
      name,
      user: req.user?._id,
    });

    await team.save();
    return res
      .status(201)
      .json({ status: true, message: "Team created successfully" });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

// @desc Get all teams
const getTeamsByUserId = async (req, res) => {
  try {
    const teams = await Team.find({ user:  req.user?._id});
    if (!teams) {
      return res.status(404).json({ status: false, message: "No teams found" });
    }
    return res.status(200).json({ status: true, teams });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

// @desc Delete a team
//need to delete the files associated with the team
const deleteTeam = async (req, res) => {
  const { teamId } = req.params;
  try {
    const team = await Team.findOne({ _id: teamId, user: req.user?._id });
    const files = await File.find({ teamId });
    if (!team) {
      return res.status(404).json({ status: false, message: "Team not found" });
    }
    await team.remove();
    if (files) {
      await files.remove();
    }
    return res
      .status(200)
      .json({ status: true, message: "Team deleted successfully" });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

const updateTeam = async (req, res) => {
  const { teamId } = req.params;
  const { name } = req.body;
  try {
    const team = await Team.findOne({ _id: teamId, user:  req.user?._id});
    if (!team) {
      return res.status(404).json({ status: false, message: "Team not found" });
    }
    team.name = name;
    await team.save();
    return res
      .status(200)
      .json({ status: true, message: "Team updated successfully" });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

const addMemberToTeam = async (req, res) => {
  const { teamId } = req.params;
  //need to pass only single email in the body
  const { email } = req.body;
  try {
    const team = await Team.findOne({ _id: teamId, user:  req.user?._id });
    if (!team) {
      return res.status(404).json({ status: false, message: "Team not found" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }
    team.members.push(user._id);
    await team.save();

    return res
      .status(200)
      .json({ status: true, message: "Member added to team successfully" });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

export { createTeam, getTeamsByUserId, deleteTeam, updateTeam,addMemberToTeam };
