import { validationResult } from "express-validator";
import HttpError from "../util/http-error.js";
import { NumberItem } from "../models/numberItem.js";
import { User } from "../models/user.js";

const createNumber = async (req, res, next) => {
  const userId = req.userData.userId;
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return next(
      new HttpError("Données saisies invalides, vérifier votre payload"),
    );
  }
  const { name, value, rating } = req.body;
  const createdGame = new NumberItem({
    name,
    value,
    rating,
    ownerId: userId,
  });
  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    return next(new HttpError("Opération BD échouée", 500));
  }
  if (!user) {
    return next(new HttpError("Utilisateur non trouvé", 404));
  }
  try {
    await createdGame.save();
    user.numberList.push(createdGame);
    await user.save();
  } catch (err) {
    return next(new HttpError("Ajout dans la BD échoué", 500));
  }
  res.status(201).json({ jeu: createdGame.toObject({ getters: true }) });
};

const getNumberList = async (req, res, next) => {
  let numberList;
  try {
    numberList = await NumberItem.find().populate("assignee", "-password");
  } catch (err) {
    return next(new HttpError("Opération BD échouée", 500));
  }
  res.json({ numberList: numberList.map((numberItem) => numberItem.toObject({ getters: true })) });
};

const getNumberItemById = async (req, res, next) => {
  const numberId = req.params.id;
  let numberItem;
  try {
    numberItem = await NumberItem.findById(numberId);
  } catch (err) {
    return next(new HttpError("Opération BD échouée", 500));
  }
  if (!numberItem) {
    return next(new HttpError("Numéro non trouvé", 404));
  }
  res.json({ number: numberItem.toObject({ getters: true }) });
};

const updateNumberItem = async (req, res, next) => {
  const numberUpdates = req.body;
  const numberId = req.params.id;
  try {
    const updatedNumber = await NumberItem.findByIdAndUpdate(numberId, numberUpdates, {
      new: true,
    });
    if (!updatedNumber) {
      return next(new HttpError("Numéro non trouvé", 404));
    }
    res.status(200).json({ number: updatedNumber.toObject({ getters: true }) });
  } catch (err) {
    return next(new HttpError("Mise à jour du numéro échouée", 500));
  }
};

const deleteNumberItem = async (req, res, next) => {
  const numberId = req.params.id;
  try {
    const number = await NumberItem.findById(numberId).populate("assignee");
    if (!number) {
      return next(new HttpError("Numéro non trouvé", 404));
    }
    await number.deleteOne();
    number.assignee.numberList.pull(number._id);
    await number.assignee.save();
    res.status(200).json({ message: "Numéro supprimé avec succès" });
  } catch (err) {
    return next(new HttpError("Suppression du numéro échouée", 500));
  }
};

export default {
  createNumber,
  getNumberList,
  getNumberItemById,
  updateNumberItem,
  deleteNumberItem,
};
