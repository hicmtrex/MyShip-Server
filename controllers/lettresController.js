import asyncHandler from 'express-async-handler';
import InternationalLettre from '../models/lettres/internationalLettre.js';
import NationalLettre from '../models/lettres/nationalLetter.js';

export const getAgentCourreirList = asyncHandler(async (req, res) => {
  const nationalCourriers = await NationalLettre.find({})
    .where('method')
    .equals('agence');

  const internationalCourriers = await InternationalLettre.find({})
    .where('method')
    .equals('agence');

  const courriers = nationalCourriers.concat(internationalCourriers);

  if (courriers) {
    res.status(200).json(courriers);
  } else {
    res.status(401).send({ message: 'courriers not found!' });
  }
});

// @desc    Get all user courriers
// @route   GET /api/lettres/usercourriers-list
// @access  Private/token
export const getUserCourriers = asyncHandler(async (req, res) => {
  const myInternationalCourriers = await InternationalLettre.find({
    user: req.user._id,
  });

  const myNationalCouriers = await NationalLettre.find({
    user: req.user._id,
  });

  const courriers = myInternationalCourriers.concat(myNationalCouriers);

  if (courriers) {
    res.status(200).json(courriers);
  } else {
    res.status(401);
    throw new Error('courriers not found!');
  }
});

//INTERNATIONL

// @desc    Get all international courriers
// @route   GET /api/lettres/international
// @access  Private
export const getAllInternationalCourrier = asyncHandler(async (req, res) => {
  const internationalCourriers = await InternationalLettre.find({});

  if (internationalCourriers) {
    res.status(200).json(internationalCourriers);
  } else {
    res.status(400);
    throw new Error('courries not found!');
  }
});

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

//NATIONAL

// @desc    Get all national courriers
// @route   GET /api/lettres/national
// @access  Private
export const getAllNationalCourrier = asyncHandler(async (req, res) => {
  const nationalCourriers = await NationalLettre.find({});

  if (nationalCourriers) {
    res.status(200).json(nationalCourriers);
  } else {
    res.status(400);
    throw new Error('courries not found!');
  }
});

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

export const deleteUserCourrier = asyncHandler(async (req, res) => {
  const nationalCourrier = await NationalLettre.findById(req.params.id);

  if (!nationalCourrier) {
    const internationalCourrier = await InternationalLettre.findById(
      req.params.id
    );

    if (internationalCourrier) {
      await internationalCourrier.remove();

      res.status(200).json('courreir has been deleted!');
    } else {
      res.status(401);
      throw new Error('international courreir not found');
    }
  } else {
    if (nationalCourrier) {
      await nationalCourrier.remove();
      res.status(200).json('courreir has been deleted!');
    } else {
      res.status(401);
      throw new Error('nationalCoil not found');
    }
  }
});

export const payCourriers = asyncHandler(async (req, res) => {
  const nationalCourrier = await NationalLettre.findById(req.params.id);

  if (!nationalCourrier) {
    const internationalCourrier = await InternationalLettre.findById(
      req.params.id
    );

    if (internationalCourrier) {
      internationalCourrier.isPaid = true;
      const paidInterCourrier = await internationalCourrier.save();
      res.status(200).json(paidInterCourrier);
    } else {
      res.status(401).send({ message: 'courrier not found!' });
    }
  }

  if (nationalCourrier) {
    nationalCourrier.isPaid = true;
    const paidNationalCourrier = await nationalCourrier.save();
    res.status(200).json(paidNationalCourrier);
  } else {
    res.status(401).send({ message: 'Something went wrong!' });
  }
});
