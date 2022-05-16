import mongoose from 'mongoose';

const internationalCoilSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    expediteur: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      address: { type: String, required: true },
      phone: { type: Number, required: true },
    },
    destinataire: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      address: { type: String, required: true },
      phone: { type: Number, required: true },
    },
    coli: {
      content: { type: String, required: true },
      num: { type: Number, required: true },
      designation: { type: String, required: true },
      country: { type: String, required: true },
      weight: { type: Number, required: true },
      qty: { type: Number, required: true },
    },
    price: { type: Number, required: true },
    isPaid: { type: Boolean, required: true, default: false },
    method: { type: String, required: true, default: 'online' },
  },

  {
    timestamps: true,
  }
);

const InternationalCoil = mongoose.model(
  'InternationalCoil',
  internationalCoilSchema
);

export default InternationalCoil;
