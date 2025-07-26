import mongoose, { Schema } from "mongoose";
// create schema
// then create a model using that schema

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    }
  }, {
    timestamps: true,
  }
);


const Note = mongoose.model("Note",noteSchema);

export default Note;