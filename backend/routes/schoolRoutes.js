import express from "express";
import {
  createSchool,
  deleteSchool,
  getSchoolById,
  getSchoolProducts,
  getSchools,
  updateSchool,
} from "../controllers/schoolController.js";

const router = express.Router();

router.post("/", createSchool);
router.get("/", getSchools);
router.get("/:schoolId/products", getSchoolProducts);
router.get("/:id", getSchoolById);
router.put("/:id", updateSchool);
router.delete("/:id", deleteSchool);

export default router;
