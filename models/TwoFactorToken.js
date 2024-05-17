import { model, models, Schema } from 'mongoose';

const TwoFactorTokenSchema = new Schema(
  {
    email: { type: String },
    token: { type: String, unique: true },
    expires: { type: Date },
  },
  { timestamps: true }
);

export const TwoFactorToken =
  models?.TwoFactorToken || model('TwoFactorToken', TwoFactorTokenSchema);
