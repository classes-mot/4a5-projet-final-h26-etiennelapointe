import { validationResult } from "express-validator";
import HttpError from "../util/http-error.js";
import { Sale } from "../models/sale.js";
import { NumberItem } from "../models/numberItem.js";
import { User } from "../models/user.js";

const createSale = async (req, res, next) => {
  const userId = req.userData.userId;
  const numberId = req.body.numberId;
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return next(
      new HttpError("Données saisies invalides, vérifier votre payload"),
    );
  }
  const { name, value, rating } = req.body;
  const createdSale = new Sale({
    ownerId: userId,
    numberId: numberId,
    price,
    date,
  });

  try {
    await createdSale.save();
  } catch (err) {
    return next(new HttpError("Ajout dans la BD échoué", 500));
  }
  res.status(201).json({ sale: createdSale.toObject({ getters: true }) });
};

const getSale = async (req, res, next) => {
  let saleList;
  try {
    saleList = await Sale.find().populate("assignee", "-password");
  } catch (err) {
    return next(new HttpError("Opération BD échouée", 500));
  }
  res.json({ saleList: saleList.map((sale) => sale.toObject({ getters: true })) });
};

const getSaleById = async (req, res, next) => {
  const saleId = req.params.id;
  let saleItem;
  try {
    saleItem = await Sale.findById(saleId);
  } catch (err) {
    return next(new HttpError("Opération BD échouée", 500));
  }
  if (!saleItem) {
    return next(new HttpError("Vente non trouvée", 404));
  }
  res.json({ sale: saleItem.toObject({ getters: true }) });
};

const updateSale = async (req, res, next) => {
  const saleUpdates = req.body;
  const saleId = req.params.id;
  try {
    const updatedSale = await Sale.findByIdAndUpdate(saleId, saleUpdates, {
      new: true,
    });
    if (!updatedSale) {
      return next(new HttpError("Vente non trouvée", 404));
    }
    res.status(200).json({ sale: updatedSale.toObject({ getters: true }) });
  } catch (err) {
    return next(new HttpError("Mise à jour de la vente échouée", 500));
  }
};

const deleteSale = async (req, res, next) => {
  const saleId = req.params.id;
  try {
    const sale = await Sale.findById(saleId);
    if (!sale) {
      return next(new HttpError("Vente non trouvée", 404));
    }
    await sale.deleteOne();
    res.status(200).json({ message: "Vente supprimée avec succès" });
  } catch (err) {
    return next(new HttpError("Suppression de la vente échouée", 500));
  }
};

export default {
  createSale,
  getSale,
  getSaleById,
  updateSale,
  deleteSale,
};
