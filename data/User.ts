'use server';

import { user } from '@/lib/auth';
//declare user interface here.

import clientPromise from '@/lib/mongodb';
import { replaceIdDoc } from '@/lib/utils';
import mongoose from 'mongoose';

interface UpdateFields {
  password?: string;
  isTwoFactorEnabled?: boolean;
  email?: string;
  name?: string;
}

export const getUserByEmail = async (email: string) => {
  try {
    const client = await clientPromise;
    const db = client.db(); // Use your database name

    const user = await db.collection('users').findOne({ email: email });

    if (!user) {
      return null;
    }
    const parsedUser = JSON.parse(JSON.stringify(replaceIdDoc(user)));
    console.log('USER FOUND IS: ', parsedUser);
    //return user;
    return parsedUser;
  } catch {
    return null;
  }
};

export const getUserById = async (id?: string | null) => {
  if (!id) return null;
  try {
    const client = await clientPromise;
    const db = client.db(); // Use your database name
    const uid = new mongoose.Types.ObjectId(id);
    const user = await db.collection('users').findOne({ _id: uid });

    return user;
  } catch {
    return null;
  }
};

export const getUserEmailById = async (id?: string | null) => {
  if (!id) return null;
  try {
    const client = await clientPromise;
    const db = client.db(); // Use your database name
    const uid = new mongoose.Types.ObjectId(id);
    const user = await db.collection('users').findOne({ _id: uid });

    if (!user) return null;
    return user.email;
  } catch {
    return null;
  }
};
/**
 * Verifies an user's email. It updates the verify date and, where is the case, the email address. ( The email is udpated when
 * an user wants to change their email, meaning the token contains the correct, new email)
 * @param id - string - the id of the user to be updated
 * @param email - string - the email used in the verification token. This is for when a user wants to change their email,
 * so a new token is sent to the current email, and the token contains the new email address
 * @returns boolean
 */
export const verifyUserEmail = async (
  id: string,
  email?: string
): Promise<boolean> => {
  try {
    const client = await clientPromise;
    const db = client.db(); // Use your database name
    const uid = new mongoose.Types.ObjectId(id);
    let update;
    update = {
      emailVerified: new Date(),
    };
    if (email) {
      update = {
        ...update,
        email: email,
      };
    }
    const updated = await db.collection('users').updateOne(
      { _id: uid },
      {
        $set: update,
      }
    );
    return updated.acknowledged;
  } catch {
    return false;
  }
};

export const updatePassword = async (
  id: string,
  newPasswordHash: string
): Promise<boolean> => {
  try {
    const client = await clientPromise;
    const db = client.db(); // Use your database name
    const uid = new mongoose.Types.ObjectId(id);
    const updated = await db.collection('users').updateOne(
      { _id: uid },
      {
        $set: {
          password: newPasswordHash,
        },
      }
    );
    return updated.acknowledged;
  } catch {
    return false;
  }
};

export const updateUser = async (
  id: string,
  password?: string | undefined,
  isTwoFactorEnabled?: boolean | undefined,
  email?: string | undefined,
  name?: string | undefined
): Promise<boolean> => {
  console.log('update values: ', {
    password,
    isTwoFactorEnabled,
    email,
    name,
  });
  try {
    const client = await clientPromise;
    const db = client.db(); // Use your database name
    const uid = new mongoose.Types.ObjectId(id);
    // Create an update object that only includes non-empty values
    const update: UpdateFields = {};
    if (password !== undefined && password !== '') update.password = password;
    if (isTwoFactorEnabled !== undefined)
      update.isTwoFactorEnabled = isTwoFactorEnabled;
    if (email !== undefined && email !== '') update.email = email;
    if (name !== undefined && name !== '') update.name = name;
    const updated = await db.collection('users').updateOne(
      { _id: uid },
      {
        $set: update,
      }
    );
    return updated.acknowledged;
  } catch {
    return false;
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

export const deleteUser = async (id?: string): Promise<boolean> => {
  if (!id) return false;
  const currentUser = await user();
  if (!currentUser) {
    return false;
  }
  try {
    const client = await clientPromise;
    const db = client.db(); // Use your database name
    const uid = new mongoose.Types.ObjectId(id);
    const userToDelete = await db.collection('users').findOne({ _id: uid });
    if (!userToDelete || userToDelete._id.toString() !== currentUser.id) {
      return false;
    }
    const userDeleted = await db.collection('users').deleteOne({ _id: uid });

    return userDeleted.acknowledged;
  } catch {
    return false;
  }
};
