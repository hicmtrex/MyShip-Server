import mongoose from 'mongoose';

const nationalRapidposteSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    expediteur: {
      name: { type: String, required: true },
      address: { type: String, required: true },
    },
    destinataire: {
      name: { type: String, required: true },
      address: { type: String, required: true },
    },
    coli: {
      codePostal: { type: String, required: true },
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

const NationalRapidposte = mongoose.model(
  'NationalRapidposte',
  nationalRapidposteSchema
);

export default NationalRapidposte;
