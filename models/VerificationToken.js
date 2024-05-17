import { model, models, Schema } from 'mongoose';

const VerificationTokenSchema = new Schema(
  {
    email: { type: String },
    token: { type: String, unique: true },
    //expires: { type: Date },
  },
  { timestamps: true }
);

export const VerificationToken =
  models?.VerificationToken ||
  model('VerificationToken', VerificationTokenSchema);
