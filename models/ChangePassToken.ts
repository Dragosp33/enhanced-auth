import { model, models, Schema } from 'mongoose';

const ChangePassTokenSchema = new Schema(
  {
    email: { type: String },
    token: { type: String, unique: true },
    expires: { type: Date },
  },
  { timestamps: true }
);

export const ChangePassToken =
  models?.ChangePassToken || model('ChangePassToken', ChangePassTokenSchema);
