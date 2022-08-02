import { Router } from "express";
import {
  createProveedor,
  updateProveedor,
  deleteProveedor,
  listProveedor,
  searchProveedor,
} from "../controllers/proveedor.controller";

const router = Router();

router.post("/proveedor", createProveedor);
router.put("/proveedor/:id", updateProveedor);
router.delete("/proveedor/:id", deleteProveedor);
router.get("/proveedor", listProveedor);
router.get("/proveedor/:id", searchProveedor);
// router.get('/ultimaMonturas',ultimaMontura);

export default router;
