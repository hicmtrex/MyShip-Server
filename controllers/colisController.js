import asyncHandler from 'express-async-handler';
import InternationalCoil from '../models/colis/internationalCoil.js';
import NationalCoil from '../models/colis/nationalCoil.js';

export const createInternationalCoil = asyncHandler(async (req, res) => {
  const { expediteur, destinataire, coli, price, isPaid, method } = req.body;

  const coils = new InternationalCoil({
    expediteur,
    destinataire,
    coli,
    price,
    isPaid,
    method,
    user: req.user._id,
  });

  if (coils) {
    const newCoils = await coils.save();
    res.status(201);
    res.json(newCoils);
  } else {
    res.status(401).send({ message: 'Something went wrong!' });
  }
});

/**
 * post auth
 */
export const createNationalCoil = asyncHandler(async (req, res) => {
  const { expediteur, destinataire, coli, price, isPaid, method } = req.body;

  const coils = new NationalCoil({
    expediteur,
    destinataire,
    coli,
    price,
    isPaid,
    method,
    user: req.user._id,
  });

  if (coils) {
    const newCoils = await coils.save();
    res.status(201);
    res.json(newCoils);
  } else {
    res.status(401).send({ message: 'Something went wrong!' });
  }
});

export const getUserInternationalCoil = asyncHandler(async (req, res) => {
  const myInternationalColis = await InternationalCoil.find({
    user: req.user._id,
  });

  if (myInternationalColis) {
    res.status(200).json(myInternationalColis);
  } else {
    res.status(401).send({ message: 'Something went wrong!' });
  }
});

export const getNationalCoilById = asyncHandler(async (req, res) => {
  const nationalCoil = await NationalCoil.findById(req.params.id);

  if (nationalCoil) {
    res.status(200).json(nationalCoil);
  } else {
    res.status(401).send({ message: 'Something went wrong!' });
  }
});

/**
 *
 */
export const getInternationalCoilById = asyncHandler(async (req, res) => {
  const internationalCoil = await InternationalCoil.findById(req.params.id);

  if (internationalCoil) {
    res.status(200).json(internationalCoil);
  } else {
    res.status(401).send({ message: 'Something went wrong!' });
  }
});

export const payColiNational = asyncHandler(async (req, res) => {
  const { isPaid } = req.body;
  const nationalCoil = await NationalCoil.findById(req.params.id);

  if (nationalCoil) {
    nationalCoil.isPaid = true;
    await nationalCoil.save();
    res.status(200).json(nationalCoil);
  } else {
    res.status(401).send({ message: 'Something went wrong!' });
  }
});
