import { Router } from "express";
import {
  updateShop,
  listShop,
  searchShop,
} from "../controllers/shop.controller";

const router = Router();

router.get("/local", listShop);
router.put("/local/:id", updateShop);
router.get("/local/:id", searchShop);

export default router;
