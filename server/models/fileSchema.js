import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
    trim: true,
  },

  // this will indicate the team name, to which the file belongs
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
  },

  // this will indicate the user who uploaded the file

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  document: {
    type: String,
  },

  // draw files
  draw: {
    type: String,
  },
},{ timestamps: true });

const File = mongoose.model("File", fileSchema);
export default File;
