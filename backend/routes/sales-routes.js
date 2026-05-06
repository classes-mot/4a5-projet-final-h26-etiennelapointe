import express from "express";
import { check } from "express-validator";
import salecontroller from "../controllers/sales-controller.js";
import checkAuth from "../middleware/check-auth.js";

const router = express.Router();

router.get("/", salecontroller.getSale);

router.get("/:id", salecontroller.getSaleById);

router.use(checkAuth);

router.post(
  "/",
  [
    check("price").not().isEmpty(),
    checkAuth,
  ],
  salecontroller.createSale,
);

router.patch("/:id", salecontroller.updateSale);

router.delete("/:id", salecontroller.deleteSale);

export default router;
