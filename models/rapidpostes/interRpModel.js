import mongoose from 'mongoose';

const internationalRapidposteSchema = mongoose.Schema(
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
      country: { type: String, required: true },
      weight: { type: Number, required: true },
    },
    price: { type: Number, required: true },
    isPaid: { type: Boolean, required: true, default: false },
    method: { type: String, required: true, default: 'online' },
  },

  {
    timestamps: true,
  }
);

const InternationalRapidposte = mongoose.model(
  'InternationalRapidposte',
  internationalRapidposteSchema
);

export default InternationalRapidposte;
