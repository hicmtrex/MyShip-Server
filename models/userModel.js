import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true },
    cin: { type: Number, required: true, unique: true },
    phone: { type: Number, required: true, default: null },
    governorate: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    isActeur: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.comparePassword = async function (entered) {
  return await bcrypt.compare(entered, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
