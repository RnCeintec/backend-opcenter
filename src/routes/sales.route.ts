import { Router } from "express";
import {
  createSale,
  updateSale,
  deleteSale,
  listSale,
  searchSale,
  searchSaleXDate,
  searchSaleDetails,
} from "../controllers/sales.controller";
import validateUser from "../security/validateUser";

const router = Router();

router.post("/sale", createSale);
router.put("/sale/:id", [validateUser], updateSale);
router.delete("/sale/:id", deleteSale);
router.get("/sale", listSale);
router.get("/sale/:id", searchSale);
router.get("/SaleFechas", searchSaleXDate);
router.get("/detail/sale/:id", searchSaleDetails);

export default router;
