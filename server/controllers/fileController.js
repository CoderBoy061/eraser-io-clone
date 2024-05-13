import File from "../models/fileSchema.js";

// @desc Upload a file

const uploadFile = async (req, res) => {
  const { fileName, teamId } = req.body;

  if (!fileName || !teamId) {
    return res
      .status(400)
      .json({ status: false, message: "Please provide all the fields" });
  }

  const existingFile = await File.findOne({ fileName });
  if (existingFile) {
    return res
      .status(400)
      .json({ status: false, message: "File already exists" });
  }

  try {
    const file = new File({
      fileName,
      teamId,
      userId: req.user?._id,
      // document,
      // draw,
    });

    await file.save();
    return res
      .status(201)
      .json({ status: true, message: "File uploaded successfully" });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

// @desc Get all files

const getFilesByTeamId = async (req, res) => {
  const { teamId } = req.params;
  try {
    const files = await File.find({ teamId }).populate(
      "userId",
      "username avatar"
    );
    if (!files) {
      return res.status(404).json({ status: false, message: "No files found" });
    }
    return res.status(200).json({ status: true, files });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

// @desc update  a file by teamId and fileId

const updateFile = async (req, res) => {
  const { teamId, fileId } = req.params;
  const { document, draw } = req.body;
  try {
    const file = await File.findOne({ _id: fileId, teamId });
    if (!file) {
      return res.status(404).json({ status: false, message: "File not found" });
    }
    file.document = document;
    file.draw = draw;
    await file.save();
    return res
      .status(200)
      .json({ status: true, message: "File updated successfully" });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

const getSingleFile = async (req, res) => {
  const { fileId } = req.params;
  try {
    const file = await File.findById(fileId);
    if (!file) {
      return res.status(404).json({ status: false, message: "File not found" });
    }
    return res.status(200).json({ status: true, file });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

export { uploadFile, getFilesByTeamId, updateFile,getSingleFile };
