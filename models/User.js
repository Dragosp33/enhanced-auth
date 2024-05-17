import { model, models, Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    emailVerified: { type: Date },
    image: { type: String },
    password: { type: String },
    role: {
      type: String,
      default: 'USER',
      // enum: ['USER', 'ADMIN'],
    },
    accounts: [{ type: Schema.Types.ObjectId, ref: 'Account' }],
    isTwoFactorEnabled: { type: Boolean, default: false },
    twoFactorConfirmation: {
      type: Schema.Types.ObjectId,
      ref: 'TwoFactorConfirmation',
    },
  },
  { timestamps: true }
);

export const User = models?.User || model('User', UserSchema);
