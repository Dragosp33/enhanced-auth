import { model, models, Schema } from 'mongoose';

const ChangeEmailTokenSchema = new Schema(
  {
    oldEmail: { type: String },
    newEmail: { type: String },
    oldToken: { type: String, unique: true },
    newToken: { type: String, unique: true },
    expires: { type: Date },
  },
  { timestamps: true }
);

export const ChangeEmailToken =
  models?.ChangeEmailToken || model('ChangeEmailToken', ChangeEmailTokenSchema);
