import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import List from "../models/listModel.js";

// @desc    Get user lists
// @route   GET /api/lists
// @access  Private
const getLists = asyncHandler(async (req, res) => {
  const lists = await List.find({ user: req.user.id });

  res.status(200).json(lists);
});

// @desc    Create list
// @route   POST /api/lists/
// @access  Private
const createList = asyncHandler(async (req, res) => {
  const { name, products } = req.body;
  if (!name) {
    res.status(400);
    throw new Error("Please add a name");
  }
  if (!products) {
    res.status(400);
    throw new Error("Please add a products");
  }

  const list = await List.create({
    name,
    products,
    user: req.user.id,
  });

  res.status(200).json(list);
});

// @desc    Get user list
// @route   GET /api/lists/:id
// @access  Private
const getList = asyncHandler(async (req, res) => {
  const list = await List.findById(req.params.id);

  if (!list) {
    res.status(404);
    throw new Error("List not found");
  }

  res.status(200).json(list);
});

// @desc    Update list
// @route   PUT /api/lists/:id
// @access  Private
const updateListStatus = asyncHandler(async (req, res) => {
  const list = await List.findById(req.params.id);

  if (!list) {
    res.status(404);
    throw new Error("List not found");
  }
  const updatedList = await List.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedList);
});

export { createList, getLists, getList, updateListStatus };
