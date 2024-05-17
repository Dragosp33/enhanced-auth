import {
  getVerificationTokenByEmail,
  verificationToken,
} from '@/data/verification-token';
import { v4 } from 'uuid';
import clientPromise from './mongodb';
import { replaceIdDoc } from './utils';
import { getPasswordTokenByEmail } from '@/data/reset-password-tokens';
import crypto from 'crypto';
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token';
import { getChangePassTokenByEmail } from '@/data/change-pass-tokens';
import { getChangeEmailTokenByOldEmail } from '@/data/change-email-tokens';

export async function generateVerificationToken(
  email: string
): Promise<verificationToken | null> {
  const token = v4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);
  const client = await clientPromise;
  const db = client.db().collection('verificationtokens'); // Use your database name

  if (existingToken) {
    await db.deleteMany({ email: email });
  }

  try {
    const savedToken = await db.insertOne({
      email: email,
      token: token,
      expires: new Date(Date.now() + 60 * 60 * 1000), // expires in 1 hour
    });
    let newToken = await db.findOne({ token: token });
    console.log('Verification token saved:', newToken);
    return JSON.parse(JSON.stringify(replaceIdDoc(newToken)));
  } catch (err) {
    console.error('Error saving verification token:', err);
    return null;
  }
}

export const generatePasswordToken = async (
  email: string
): Promise<verificationToken | null> => {
  const token = v4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordTokenByEmail(email);
  const client = await clientPromise;
  const db = client.db().collection('resetpasswordtokens');

  if (existingToken) {
    await db.deleteMany({ email: email });
  }

  try {
    const savedToken = await db.insertOne({
      email: email,
      token: token,
      expires: new Date(Date.now() + 60 * 60 * 1000), // expires in 1 hour
    });
    let newToken = await db.findOne({ token: token });
    console.log('Reset password token saved:', newToken);
    return JSON.parse(JSON.stringify(replaceIdDoc(newToken)));
  } catch (err) {
    console.error('Error saving reset password token:', err);
    return null;
  }
};

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date().getTime() + 3600 * 1000;
  const existingToken = await getTwoFactorTokenByEmail(email);
  const client = await clientPromise;
  const db = client.db().collection('twofactortokens');

  if (existingToken) {
    await db.deleteMany({ email: email });
  }

  try {
    const savedToken = await db.insertOne({
      email: email,
      token: token,
      expires: new Date(Date.now() + 5 * 60 * 1000), // expires in 5mins;
    });
    let newToken = await db.findOne({ token: token });

    return JSON.parse(JSON.stringify(replaceIdDoc(newToken)));
  } catch (err) {
    console.error('Error saving 2FA token:', err);
    return null;
  }
};

export const generateChangePassToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(Date.now() + 5 * 60 * 1000);
  const existingToken = await getChangePassTokenByEmail(email);
  const client = await clientPromise;
  const db = client.db().collection('changepasstokens');

  if (existingToken) {
    await db.deleteMany({ email: email });
  }

  try {
    const savedToken = await db.insertOne({
      email: email,
      token: token,
      expires: new Date(Date.now() + 5 * 60 * 1000), // expires in 5mins;
    });
    let newToken = await db.findOne({ token: token });

    return JSON.parse(JSON.stringify(replaceIdDoc(newToken)));
  } catch (err) {
    console.error('Error saving change password token:', err);
    return null;
  }
};

export const generateChangeEmailToken = async (
  oldEmail: string,
  newEmail: string
) => {
  const oldToken = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(Date.now() + 5 * 60 * 1000);
  const existingToken = await getChangeEmailTokenByOldEmail(oldEmail);

  const newToken = crypto.randomInt(100_000, 1_000_000).toString();

  const client = await clientPromise;
  const db = client.db().collection('changeemailtokens');

  if (existingToken) {
    await db.deleteMany({ oldEmail: oldEmail });
  }

  try {
    const savedToken = await db.insertOne({
      oldEmail: oldEmail,
      newEmail: newEmail,
      oldToken: oldToken,
      newToken: newToken,
      expires: new Date(Date.now() + 5 * 60 * 1000), // expires in 5mins;
    });
    let insertedToken = await db.findOne({ newToken: newToken });
    console.log({ insertedToken });

    return JSON.parse(JSON.stringify(replaceIdDoc(insertedToken)));
  } catch (err) {
    console.error('Error saving change password token:', err);
    return null;
  }
};
