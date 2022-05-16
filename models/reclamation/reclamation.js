import mongoose from 'mongoose';

const reclamationSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    username: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

const Reclamation = mongoose.model('Reclamation', reclamationSchema);

export default Reclamation;
