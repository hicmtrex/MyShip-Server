import asyncHandler from 'express-async-handler';
import InternationalRapidposte from '../models/rapidpostes/interRpModel.js';
import NationalRapidposte from '../models/rapidpostes/nationalRpmodel.js';

//NATIONAL

export const getNationalRpList = asyncHandler(async (req, res) => {
  const rapidPosts = await NationalRapidposte.find({});

  if (rapidPosts) {
    res.status(200).json(rapidPosts);
  } else {
    res.status(401);
    throw new Error('rapidPosts not found!');
  }
});

export const getNationalRpById = asyncHandler(async (req, res) => {
  const rapidPost = await NationalRapidposte.findById(req.params.id);

  if (rapidPost) {
    res.status(200).json(rapidPost);
  } else {
    res.status(401);
    throw new Error('rapidPost not found!');
  }
});

export const createNationalRp = asyncHandler(async (req, res) => {
  const { expediteur, destinataire, coli, price, isPaid, method } = req.body;

  const rapidPost = new NationalRapidposte({
    expediteur,
    destinataire,
    coli,
    price,
    isPaid,
    method,
    user: req.user._id,
  });

  if (rapidPost) {
    const newRapidPost = await rapidPost.save();
    res.status(201);
    res.json(newRapidPost);
  } else {
    res.status(401).send({ message: 'Something went wrong!' });
  }
});

//INTERNATIONAL

export const getInternationalRpList = asyncHandler(async (req, res) => {
  const rapidPosts = await InternationalRapidposte.find({});

  if (rapidPosts) {
    res.status(200).json(rapidPosts);
  } else {
    res.status(401);
    throw new Error('rapidPosts not found!');
  }
});

export const getInternationalRpById = asyncHandler(async (req, res) => {
  const rapidPost = await InternationalRapidposte.findById(req.params.id);

  if (rapidPost) {
    res.status(200).json(rapidPost);
  } else {
    res.status(401);
    throw new Error('rapidPost not found!');
  }
});

export const createInternationalRp = asyncHandler(async (req, res) => {
  const { expediteur, destinataire, coli, price, isPaid, method } = req.body;

  const rapidPost = new InternationalRapidposte({
    expediteur,
    destinataire,
    coli,
    price,
    isPaid,
    method,
    user: req.user._id,
  });

  if (rapidPost) {
    const newRapidPost = await rapidPost.save();
    res.status(201);
    res.json(newRapidPost);
  } else {
    res.status(401).send({ message: 'Something went wrong!' });
  }
});
