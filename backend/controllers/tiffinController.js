import Tiffin from "../models/tiffinModel.js";


export const createTiffin = async (req, res) => {
  try {
    const tiffin = new Tiffin(req.body);
    await tiffin.save();
    res.status(201).json(tiffin);
  } catch (error) {
    res.status(400).json({ message: "Error creating tiffin service", error });
  }
};


export const getTiffins = async (req, res) => {
  try {
    const tiffins = await Tiffin.find({});
    res.status(200).json(tiffins);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tiffin services", error });
  }
};

export const getTiffinById = async (req, res) => {
  try {
    const tiffin = await Tiffin.findById(req.params.id);
    if (!tiffin) {
      return res.status(404).json({ message: "Tiffin service not found" });
    }
    res.status(200).json(tiffin);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tiffin service", error });
  }
};


export const updateTiffin = async (req, res) => {
  try {
    const tiffin = await Tiffin.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!tiffin) {
      return res.status(404).json({ message: "Tiffin service not found" });
    }
    res.status(200).json(tiffin);
  } catch (error) {
    res.status(500).json({ message: "Error updating tiffin service", error });
  }
};


export const deleteTiffin = async (req, res) => {
  try {
    const tiffin = await Tiffin.findByIdAndDelete(req.params.id);
    if (!tiffin) {
      return res.status(404).json({ message: "Tiffin service not found" });
    }
    res.status(200).json({ message: "Tiffin service deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting tiffin service", error });
  }
};
