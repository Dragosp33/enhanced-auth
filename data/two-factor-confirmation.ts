import clientPromise from '@/lib/mongodb';
import mongoose from 'mongoose';

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const client = await clientPromise;
    const db = client.db().collection('twofactorconfirmations');
    const uid = new mongoose.Types.ObjectId(userId);
    const twoFactorConfirmation = db.findOne({
      userId: uid,
    });
    return twoFactorConfirmation;
  } catch {
    return null;
  }
};

/**
 * delete all 2FA confirmations for a user
 * could use `deleteOne` instead of `deleteMany`, but use `deleteMany` just to be sure that no other 2FA confirmations exist.
 * @param userId - string, the userId to search 2FA confirmations of.
 */
export const deleteTwoFactorConfirmation = async (userId: string) => {
  try {
    const client = await clientPromise;
    const db = client.db(); // Use your database name
    const uid = new mongoose.Types.ObjectId(userId);
    const deleted = await db
      .collection('twofactorconfirmations')
      .deleteMany({ userId: uid });

    return deleted.acknowledged;
  } catch {
    return false;
  }
};

export const createTwoFactorConfirmation = async (userId: string) => {
  try {
    const client = await clientPromise;
    const db = client.db(); // Use your database name
    const uid = new mongoose.Types.ObjectId(userId);
    const newConfirmation = await db
      .collection('twofactorconfirmations')
      .insertOne({
        userId: uid,
      });

    return newConfirmation;
  } catch {
    return false;
  }
};
