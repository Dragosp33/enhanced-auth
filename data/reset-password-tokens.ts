import clientPromise from '@/lib/mongodb';
import { verificationToken } from './verification-token';
import { replaceIdDoc } from '@/lib/utils';

export async function getResetTokenByToken(
  token: string
): Promise<verificationToken | null> {
  try {
    const client = await clientPromise;
    const db = client.db(); // Use your database name

    const resetPasswordToken = await db
      .collection('resetpasswordtokens')
      .findOne({ token: token });
    return JSON.parse(JSON.stringify(replaceIdDoc(resetPasswordToken)));
  } catch {
    return null;
  }
}

export async function getPasswordTokenByEmail(
  email: string
): Promise<verificationToken | null> {
  try {
    const client = await clientPromise;
    const db = client.db(); // Use your database name

    const resetPasswordToken = await db
      .collection('resetpasswordtokens')
      .findOne({ email: email });
    //return JSON.parse(JSON.stringify(verificationToken));
    return JSON.parse(JSON.stringify(replaceIdDoc(resetPasswordToken)));
  } catch {
    return null;
  }
}

export async function deleteResetToken(token: string): Promise<boolean> {
  try {
    const client = await clientPromise;
    const db = client.db(); // Use your database name

    const deleted = await db
      .collection('resetpasswordtokens')
      .deleteOne({ token: token });
    //return JSON.parse(JSON.stringify(verificationToken));
    return deleted.acknowledged;
  } catch {
    return false;
  }
}
