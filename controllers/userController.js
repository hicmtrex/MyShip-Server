import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

export const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.comparePassword(password))) {
    res.status(200);
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      cin: user.cin,
      phone: user.phone,
      governorate: user.governorate,
      isAdmin: user.isAdmin,
      isActeur: user.isActeur,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

export const userRegister = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, phone, cin, governorate } =
    req.body;

  const existUser = await User.findOne({ email });

  if (existUser) {
    res.status(400).json({ message: 'Email Already Used' });
  }

  const user = new User({
    firstName,
    lastName,
    email,
    password,
    phone,
    cin,
    governorate,
  });

  if (user) {
    const newUser = await user.save();
    res.status(201);
    res.json(newUser);
  } else {
    res.status(400);
    throw new Error('Invalid Input');
  }
});

export const getClientList = asyncHandler(async (req, res) => {
  const clients = await User.find({})
    .where('isAdmin')
    .equals(false)
    .where('isActeur')
    .equals(false);

  if (clients) {
    res.status(200).json(clients);
  } else {
    res.status(400);
    throw new Error('clients not found!');
  }
});

//delete

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.status(200).json('user has been deleted!');
  } else {
    res.status(400);
    throw new Error('user not found!');
  }
});

export const updateUserProfile = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, phone, cin, governorate } =
    req.body;

  const user = await User.findById(req.user._id);

  if (user) {
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.cin = cin || user.cin;
    user.governorate = governorate || user.governorate;
    if (password) {
      user.password = password;
    }
    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export const createAgent = asyncHandler(async (req, res) => {
  const agent = new User(req.body);

  if (agent) {
    const newAgent = await agent.save();
    res.status(201).json(newAgent);
  } else {
    res.status(404);
    throw new Error('Agent not found');
  }
});
