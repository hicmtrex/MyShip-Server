import asyncHandler from 'express-async-handler';
import Reclamation from '../models/reclamation/reclamation.js';

export const getReclamationList = asyncHandler(async (req, res) => {
  const reclamations = await Reclamation.find({});

  if (reclamations) {
    res.status(201);
    res.json(reclamations);
  } else {
    res.status(401).send({ message: 'Something went wrong!' });
  }
});

export const getUserReclamationList = asyncHandler(async (req, res) => {
  const reclamations = await Reclamation.find({
    _id: req.user._id,
  });

  if (reclamations) {
    res.status(201);
    res.json(reclamations);
  } else {
    res.status(401).send({ message: 'Something went wrong!' });
  }
});

export const createReclamation = asyncHandler(async (req, res) => {
  const { envoiId, username, address, email, message } = req.body;

  const reclamation = new Reclamation({
    username,
    address,
    email,
    envoiId,
    message,
    user: req.user._id,
  });

  if (reclamation) {
    const newReclamation = await reclamation.save();
    res.status(201);
    res.json(newReclamation);
  } else {
    res.status(401).send({ message: 'Something went wrong!' });
  }
});

export const deleteReclamation = asyncHandler(async (req, res) => {
  const reclamation = await Reclamation.findById(req.params.id);

  if (reclamation) {
    await reclamation.remove();
    res.status(200).json('reclamation has been deleted!');
  } else {
    res.status(401);
    throw new Error('reclamation not found!');
  }
});
