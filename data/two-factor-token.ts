import clientPromise from '@/lib/mongodb';
import { verificationToken } from './verification-token';
import { replaceIdDoc } from '@/lib/utils';

export async function getTwoFactorTokenByToken(
  token: string
): Promise<verificationToken | null> {
  try {
    const client = await clientPromise;
    const db = client.db(); // Use your database name

    const twoFactorToken = await db
      .collection('twofactortokens')
      .findOne({ token: token });
    return JSON.parse(JSON.stringify(replaceIdDoc(twoFactorToken)));
  } catch {
    return null;
  }
}

export async function getTwoFactorTokenByEmail(
  email: string
): Promise<verificationToken | null> {
  try {
    const client = await clientPromise;
    const db = client.db(); // Use your database name

    const twoFactorToken = await db
      .collection('twofactortokens')
      .findOne({ email: email });
    //return JSON.parse(JSON.stringify(verificationToken));
    return JSON.parse(JSON.stringify(replaceIdDoc(twoFactorToken)));
  } catch {
    return null;
  }
}

export async function deleteTwoFactorToken(token: string): Promise<boolean> {
  try {
    const client = await clientPromise;
    const db = client.db(); // Use your database name

    const deleted = await db
      .collection('twofactortokens')
      .deleteOne({ token: token });
    //return JSON.parse(JSON.stringify(verificationToken));
    return deleted.acknowledged;
  } catch {
    return false;
  }
}
