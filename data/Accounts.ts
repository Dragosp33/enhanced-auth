import clientPromise from '@/lib/mongodb';
import { replaceIdFromAccount } from '@/lib/utils';
import mongoose from 'mongoose';
import { Account } from 'next-auth';

// Extend the Account interface by intersecting it with AccountExtension
interface dbExtension extends Account {
  id: string;
}

export const getAccountsByEmailAndProvider = async (
  email?: string | null | undefined,
  provider?: string | null | undefined
): Promise<dbExtension | null> => {
  if (!email || !provider) {
    return null;
  }
  try {
    const client = await clientPromise;
    const db = client.db(); // Use your database name
    //const uid = new mongoose.Types.ObjectId(id);
    const foundAccount = await db
      .collection('accounts')
      .findOne({ provider: provider, email: email });
    return JSON.parse(JSON.stringify(replaceIdFromAccount(foundAccount)));
  } catch {
    return null;
  }
};

export const getUserAccounts = async (id?: string) => {
  if (!id) return null;
  try {
    const client = await clientPromise;
    const db = client.db(); // Use your database name
    const uid = new mongoose.Types.ObjectId(id);
    const userAccounts = await db
      .collection('accounts')
      .find({ userId: uid })
      .toArray();
    return userAccounts;
  } catch {
    return null;
  }
};

export const updateAccountUserid = async (
  accountId?: string,
  userId?: string
) => {
  if (!accountId || !userId) {
    return null;
  }
  try {
    const client = await clientPromise;
    const db = client.db(); // Use your database name
    const accId = new mongoose.Types.ObjectId(accountId);
    const uid = new mongoose.Types.ObjectId(userId);
    const userAccounts = await db.collection('accounts').updateOne(
      { _id: accId },
      {
        $set: {
          userId: uid,
        },
      }
    );

    return userAccounts.acknowledged;
  } catch {
    return null;
  }
};
