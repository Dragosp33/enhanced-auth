import { model, models, Schema } from 'mongoose';

const AccountSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    type: { type: String },
    provider: { type: String },
    providerAccountId: { type: String },
    refresh_token: { type: String },
    access_token: { type: String },
    expires_at: { type: Number },
    token_type: { type: String },
    scope: { type: String },
    id_token: { type: String },
    session_state: { type: String },
  },
  { timestamps: true }
);

export const Account = models?.Account || model('Account', AccountSchema);
