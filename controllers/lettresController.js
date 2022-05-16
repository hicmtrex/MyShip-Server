import asyncHandler from 'express-async-handler';

import InternationalLettre from '../models/lettres/internationalLettre.js';
import NationalLettre from '../models/lettres/nationalLetter.js';

export const createInternationalLettre = asyncHandler(async (req, res) => {
  const { expediteur, destinataire, coli, price, isPaid, method } = req.body;

  const coils = new InternationalLettre({
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
export const createNationalLettre = asyncHandler(async (req, res) => {
  const { expediteur, destinataire, coli, price, isPaid, method } = req.body;

  const coils = new NationalLettre({
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

export const getUserInternationalLettre = asyncHandler(async (req, res) => {
  const myInternationalColis = await InternationalLettre.find({
    user: req.user._id,
  });

  if (myInternationalColis) {
    res.status(200).json(myInternationalColis);
  } else {
    res.status(401).send({ message: 'Something went wrong!' });
  }
});

export const getNationalLettreById = asyncHandler(async (req, res) => {
  const nationalCoil = await NationalLettre.findById(req.params.id);

  if (nationalCoil) {
    res.status(200).json(nationalCoil);
  } else {
    res.status(401).send({ message: 'Something went wrong!' });
  }
});

export const getInternationalLettreById = asyncHandler(async (req, res) => {
  const internationalCoil = await InternationalLettre.findById(req.params.id);

  if (internationalCoil) {
    res.status(200).json(internationalCoil);
  } else {
    res.status(401).send({ message: 'Something went wrong!' });
  }
});
