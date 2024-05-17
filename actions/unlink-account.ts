'use server';

import { user } from '@/lib/auth';
import { deleteUser, getUserAccounts } from '@/data/User';
import clientPromise from '@/lib/mongodb';
import mongoose from 'mongoose';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { logout } from './logout';

// basically, unlinking an account is deleting it.
// however, if the account is the single one of the user, that should be deleted.
export const unLinkAccount = async (accountId?: string) => {
  if (!accountId) {
    return null;
  }
  try {
    const currentUser = await user();
    if (!currentUser) {
      revalidatePath('/settings/account');
      redirect('/settings/account?error=unauthorized');
    }
    const client = await clientPromise;
    const db = client.db(); // Use your database name
    const accId = new mongoose.Types.ObjectId(accountId);
    // const uid = new mongoose.Types.ObjectId(userId);
    const deleteAccount = await db
      .collection('accounts')
      .findOneAndDelete({ _id: accId });

    const uid = deleteAccount?.userId;
    if (!uid || uid.toString() !== currentUser.id) {
      revalidatePath('/settings/account');
      redirect('/settings/account?error=unauthorized');
    }
    const userAccounts = await getUserAccounts(uid?.toString());
    console.log(
      'This user has multiple accounts still: ',
      { userAccounts },
      { deleteAccount }
    );
    if (userAccounts && userAccounts.length < 1) {
      await deleteUser(uid?.toString());
      await logout();
    }
    revalidatePath('/settings/accounts');
    return true;
  } catch {
    return null;
  }
};
