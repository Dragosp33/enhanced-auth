import clientPromise from '@/lib/mongodb';
import { verificationToken } from './verification-token';
import { replaceIdDoc } from '@/lib/utils';

export async function getChangePassTokenByToken(
  token: string
): Promise<verificationToken | null> {
  try {
    const client = await clientPromise;
    const db = client.db(); // Use your database name

    const changePassToken = await db
      .collection('changepasstokens')
      .findOne({ token: token });
    return JSON.parse(JSON.stringify(replaceIdDoc(changePassToken)));
  } catch {
    return null;
  }
}

export async function getChangePassTokenByEmail(
  email: string
): Promise<verificationToken | null> {
  try {
    const client = await clientPromise;
    const db = client.db(); // Use your database name

    const changePassToken = await db
      .collection('changepasstokens')
      .findOne({ email: email });
    //return JSON.parse(JSON.stringify(verificationToken));
    return JSON.parse(JSON.stringify(replaceIdDoc(changePassToken)));
  } catch {
    return null;
  }
}

export async function deleteChangePassToken(token: string): Promise<boolean> {
  try {
    const client = await clientPromise;
    const db = client.db(); // Use your database name

    const deleted = await db
      .collection('changepasstokens')
      .deleteOne({ token: token });
    //return JSON.parse(JSON.stringify(verificationToken));
    return deleted.acknowledged;
  } catch {
    return false;
  }
}
