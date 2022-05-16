import mongoose from 'mongoose';

const nationalCoilSchema = mongoose.Schema(
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
      content: { type: String, required: true },
      num: { type: Number, required: true },
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

const NationalCoil = mongoose.model('NationalCoil', nationalCoilSchema);

export default NationalCoil;
