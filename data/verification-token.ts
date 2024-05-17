import clientPromise from '@/lib/mongodb';
import { replaceIdDoc } from '@/lib/utils';

export interface verificationToken {
  id: string;
  token: string;
  email: string;
  expires: Date;
}

export async function getVerificationTokenByToken(
  token: string
): Promise<verificationToken | null> {
  try {
    const client = await clientPromise;
    const db = client.db(); // Use your database name

    const verificationToken = await db
      .collection('verificationtokens')
      .findOne({ token: token });
    return JSON.parse(JSON.stringify(replaceIdDoc(verificationToken)));
  } catch {
    return null;
  }
}

export async function getVerificationTokenByEmail(
  email: string
): Promise<verificationToken | null> {
  try {
    const client = await clientPromise;
    const db = client.db(); // Use your database name

    const verificationToken = await db
      .collection('verificationtokens')
      .findOne({ email: email });
    //return JSON.parse(JSON.stringify(verificationToken));
    return JSON.parse(JSON.stringify(replaceIdDoc(verificationToken)));
  } catch {
    return null;
  }
}

export async function deleteVerificationToken(token: string): Promise<boolean> {
  try {
    const client = await clientPromise;
    const db = client.db(); // Use your database name

    const deleted = await db
      .collection('verificationtokens')
      .deleteOne({ token: token });
    //return JSON.parse(JSON.stringify(verificationToken));
    return deleted.acknowledged;
  } catch {
    return false;
  }
}
