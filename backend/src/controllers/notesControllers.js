import Note from "../model/Note.js";

export async function getAllNotes(req,res) {
 try {
  const note = await Note.find({createdBy: req.user._id}).sort({createdAt:-1}); //-1 will sort in descending order
  res.status(200).json(note);
 } catch (error) {
  console.error("Error in getAll notes ",error);
  res.status(500).json({message:"Internal server error"});
 }
};

export async function createNotes(req,res){
  try {
    const {title,content} = req.body;
    //console.log("User Id",req.user);
    const note = new Note({title,content,createdBy: req.user._id});

    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error in  createNotes ",error);
  res.status(500).json({message:"Internal server error",user: req.user});
  }
};

export async function updateNotes(req,res){
 try {
  const {title,content} = req.body;
  const updatedNote = await Note.findByIdAndUpdate(req.params.id,{title,content},{new: true});
  if(!updatedNote){
    return res.status(404).json({message:"Note not found"});
  }
  res.status(200).json(updatedNote);
 } catch (error) {
   console.error("Error in  updateNotes ",error);
  res.status(500).json({message:"Internal server error"});
 }
};

export async function deleteNotes(req,res){
 try {
  const deletedNote = await Note.findByIdAndDelete(req.params.id);
  if(!deletedNote){
    return res.status(404).json({message:"Note not found"});
  }
  res.status(200).json(deletedNote);
 } catch (error) {
  console.error("Error in  DeleteNotes ",error);
  res.status(500).json({message:"Internal server error"});
 }
};

export async function getNoteById(req,res) {
  try {
    const note = await Note.findById(req.params.id);
    if(!note){
      return res.status(404).json({message: "This Note don't exist"});
    }
    res.status(200).json(note);
  } catch (error) {
    console.error("Error in  GetNoteById ",error);
  res.status(500).json({message:"Internal server error"});
  }
}


