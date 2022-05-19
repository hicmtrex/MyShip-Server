import asyncHandler from 'express-async-handler';
import InternationalRapidposte from '../models/rapidpostes/interRpModel.js';
import NationalRapidposte from '../models/rapidpostes/nationalRpmodel.js';

//NATIONAL

// @desc    Get all national rapid post
// @route   Get /api/rapidPosts/national
// @access  Private/Admin
export const getNationalRpList = asyncHandler(async (req, res) => {
  const rapidPosts = await NationalRapidposte.find({});

  if (rapidPosts) {
    res.status(200).json(rapidPosts);
  } else {
    res.status(401);
    throw new Error('rapidPosts not found!');
  }
});

// @desc    Get  national rapid post detail
// @route   Get /api/rapidPosts/national/:id
// @access  Private
export const getNationalRpById = asyncHandler(async (req, res) => {
  const rapidPost = await NationalRapidposte.findById(req.params.id);

  if (rapidPost) {
    res.status(200).json(rapidPost);
  } else {
    res.status(401);
    throw new Error('rapidPost not found!');
  }
});

// @desc    create  national rapid post
// @route   Post /api/rapidPosts/national
// @access  Private
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

// @desc    Get all user courriers
// @route   GET /api/lettres/usercourriers-list
// @access  Private/token

export const getUserRapidpost = asyncHandler(async (req, res) => {
  const myInternationalRp = await InternationalRapidposte.find({
    user: req.user._id,
  });

  const myNationalRp = await NationalRapidposte.find({
    user: req.user._id,
  });

  const rapideposts = myInternationalRp.concat(myNationalRp);

  if (rapideposts) {
    res.status(200).json(rapideposts);
  } else {
    res.status(401);
    throw new Error('rapideposts not found!');
  }
});
