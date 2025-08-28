import asyncHandler from "express-async-handler";
import Room from "../models/roomModel.js";


export const createRoom = asyncHandler(async (req, res) => {
  const { title, location, price, genderPreference, smokingAllowed, foodPreference, description, images } = req.body;

  if (!title || !location || !price) {
    res.status(400);
    throw new Error("Title, location, and price are required");
  }

  const newRoom = await Room.create({
    user: req.user._id, 
    title,
    location,
    price,
    genderPreference,
    smokingAllowed,
    foodPreference,
    description,
    images,
  });

  res.status(201).json(newRoom);
});


export const getRooms = asyncHandler(async (req, res) => {
  const {
    search,
    location,
    minPrice,
    maxPrice,
    genderPreference,
    smokingAllowed,
    foodPreference,
    sortBy = "latest", 
    page = 1,
    limit = 10,
  } = req.query;

  
  const filter = {};

  
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { location: { $regex: search, $options: "i" } },
    ];
  }

  
  if (location) {
    filter.location = { $regex: location, $options: "i" };
  }

  
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = parseFloat(minPrice);
    if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
  }

  
  if (genderPreference && genderPreference !== "Any") {
    filter.genderPreference = genderPreference;
  }

  
  if (smokingAllowed === "true" || smokingAllowed === "false") {
    filter.smokingAllowed = smokingAllowed === "true";
  }

  
  if (foodPreference && foodPreference !== "Any") {
    filter.foodPreference = foodPreference;
  }

  
  const pageNumber = Math.max(parseInt(page, 10), 1);
  const pageSize = Math.max(parseInt(limit, 10), 1);
  const skip = (pageNumber - 1) * pageSize;

 
  const sortOptions = {
    latest: { createdAt: -1 },
    oldest: { createdAt: 1 },
    priceLowToHigh: { price: 1 },
    priceHighToLow: { price: -1 },
  };
  const sortCriteria = sortOptions[sortBy] || sortOptions.latest;

  
  const rooms = await Room.find(filter).limit(pageSize).skip(skip).sort(sortCriteria);

  
  const totalRooms = await Room.countDocuments(filter);

  res.status(200).json({
    totalRooms,
    currentPage: pageNumber,
    totalPages: Math.ceil(totalRooms / pageSize),
    rooms,
  });
});


export const getRoomById = asyncHandler(async (req, res) => {
  const room = await Room.findById(req.params.id);

  if (!room) {
    res.status(404);
    throw new Error("Room not found");
  }

  res.status(200).json(room);
});


export const getUserRooms = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  if (!userId) {
    res.status(400);
    throw new Error("User ID is required");
  }

  const rooms = await Room.find({ user: userId }).sort({ createdAt: -1 });
  res.status(200).json(rooms);
});


export const updateRoom = asyncHandler(async (req, res) => {
  const room = await Room.findById(req.params.id);

  if (!room) {
    res.status(404);
    throw new Error("Room not found");
  }

 
  if (room.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Unauthorized to update this room");
  }

  
  if (req.body.price && isNaN(req.body.price)) {
    res.status(400);
    throw new Error("Invalid price value");
  }

  const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res.status(200).json(updatedRoom);
});


export const deleteRoom = asyncHandler(async (req, res) => {
  const room = await Room.findById(req.params.id);

  if (!room) {
    res.status(404);
    throw new Error("Room not found");
  }

  
  if (room.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Unauthorized to delete this room");
  }

  await room.deleteOne();
  res.status(200).json({ message: "Room deleted successfully" });
});
