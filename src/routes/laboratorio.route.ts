import { Router } from "express";
import {
  createLaboratorio,
  updateLaboratorio,
  deleteLaboratorio,
  listLaboratorio,
  searchLaboratorio,
} from "../controllers/laboratorio.controller";

const router = Router();

router.post("/laboratorio", createLaboratorio);
router.put("/laboratorio/:id", updateLaboratorio);
router.delete("/laboratorio/:id", deleteLaboratorio);
router.get("/laboratorio", listLaboratorio);
router.get("/laboratorio/:id", searchLaboratorio);

export default router;
