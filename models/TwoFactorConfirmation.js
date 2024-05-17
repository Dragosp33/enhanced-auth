import { model, models, Schema } from 'mongoose';

const TwoFactorConfirmationSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export const TwoFactorConfirmation =
  models?.TwoFactorConfirmation ||
  model('TwoFactorConfirmation', TwoFactorConfirmationSchema);
