import { Router } from "express";
import {
  createVendedor,
  updateVendedor,
  deleteVendedor,
  listVendedor,
  searchVendedor,
} from "../controllers/vendedor.controller";

const router = Router();

router.post("/vendedor", createVendedor);
router.put("/vendedor/:id", updateVendedor);
router.delete("/vendedor/:id", deleteVendedor);
router.get("/vendedor", listVendedor);
router.get("/vendedor/:id", searchVendedor);

export default router;
