import express from "express";
import { check } from "express-validator";
import numberscontroller from "../controllers/numbers-controller.js";
import checkAuth from "../middleware/check-auth.js";

const router = express.Router();

router.get("/", numberscontroller.getNumberList);

router.get("/:id", numberscontroller.getNumberItemById);

router.use(checkAuth);

router.post(
  "/",
  [
    check("name").not().isEmpty(),
    check("value").not().isEmpty(),
    check("rating").isInt({ min: 1, max: 5 }),
    checkAuth,
  ],
  numberscontroller.createNumber,
);

router.patch("/:id", numberscontroller.updateNumberItem);

router.delete("/:id", numberscontroller.deleteNumberItem);

export default router;
