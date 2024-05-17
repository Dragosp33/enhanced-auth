import { model, models, Schema } from 'mongoose';

const PasswordResetTokenSchema = new Schema(
  {
    email: { type: String },
    token: { type: String, unique: true },
    expires: { type: Date },
  },
  { timestamps: true }
);

export const PasswordResetToken =
  models?.PasswordResetToken ||
  model('PasswordResetToken', PasswordResetTokenSchema);
