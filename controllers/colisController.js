import asyncHandler from 'express-async-handler';
import InternationalCoil from '../models/colis/internationalCoil.js';
import NationalCoil from '../models/colis/nationalCoil.js';

//International

export const getInternationalCoilList = asyncHandler(async (req, res) => {
  const minternationalColis = await InternationalCoil.find({});

  if (minternationalColis) {
    res.status(200).json(minternationalColis);
  } else {
    res.status(401).send({ message: 'Something went wrong!' });
  }
});

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

export const getAllUserCoils = asyncHandler(async (req, res) => {
  const myInternationalColis = await InternationalCoil.find({
    user: req.user._id,
  });
  const myNationalColis = await NationalCoil.find({
    user: req.user._id,
  });

  const colis = myInternationalColis.concat(myNationalColis);
  if (colis) {
    res.status(200).json(colis);
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

//National

export const getNationalCoilList = asyncHandler(async (req, res) => {
  const nationalCoils = await NationalCoil.find({});

  if (nationalCoils) {
    res.status(200).json(nationalCoils);
  } else {
    res.status(401);
    throw new Error('nationalCoils not found!');
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

//agent

export const getAgentColiList = asyncHandler(async (req, res) => {
  const nationalCoil = await NationalCoil.find({})
    .where('method')
    .equals('agence');

  const internationalCoil = await InternationalCoil.find({})
    .where('method')
    .equals('agence');

  const colis = nationalCoil.concat(internationalCoil);

  if (colis) {
    res.status(200).json(colis);
  } else {
    res.status(401).send({ message: 'colis not found!' });
  }
});

export const agentColiPay = asyncHandler(async (req, res) => {
  const nationalCoil = await NationalCoil.findById(req.params.id)
    .where('method')
    .equals('agence');

  if (!nationalCoil) {
    const internationalCoil = await InternationalCoil.findById(req.params.id)
      .where('method')
      .equals('agence');

    if (internationalCoil) {
      internationalCoil.isPaid = true;
      const paidColi = await internationalCoil.save();
      res.status(200).json(paidColi);
    } else {
      res.status(401).send({ message: 'coli not found!' });
    }
  }

  if (nationalCoil) {
    nationalCoil.isPaid = true;
    const paidColi = await nationalCoil.save();
    res.status(200).json(paidColi);
  } else {
    res.status(401).send({ message: 'coli not found!' });
  }
});
