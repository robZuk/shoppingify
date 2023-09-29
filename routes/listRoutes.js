import express from "express";
const router = express.Router();
import {
  createList,
  updateListStatus,
  getLists,
  getList,
} from "../controllers/listController.js";

import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(protect, getLists).post(protect, createList);
router.route("/:id").get(protect, getList).put(protect, updateListStatus);

export default router;
