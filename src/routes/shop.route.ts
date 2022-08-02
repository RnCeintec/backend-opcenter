import { Router } from "express";
import {
  updateShop,
  listShop,
  searchShop,
  createShop,
  deleteShop,
} from "../controllers/shop.controller";

const router = Router();

router.get("/local", listShop);
router.put("/local/:id", updateShop);
router.get("/local/:id", searchShop);
router.post("/local", createShop);
router.delete("/local/:id", deleteShop);
export default router;
