import clientPromise from '@/lib/mongodb';
import { replaceIdDoc } from '@/lib/utils';

export interface changeEmailToken {
  id: string;
  oldToken: string;
  newToken: string;
  oldEmail: string;
  newEmail: string;
  expires: Date;
}

export async function getChangeEmailTokenByNewToken(
  token: string
): Promise<changeEmailToken | null> {
  try {
    const client = await clientPromise;
    const db = client.db(); // Use your database name

    const changeEmailToken = await db
      .collection('changeemailtokens')
      .findOne({ newToken: token });
    return JSON.parse(JSON.stringify(replaceIdDoc(changeEmailToken)));
  } catch {
    return null;
  }
}

/**
 * Function to get the tokens sent for an email change. We use this as the current email address is the only information we
 * know for sure, and the tokens in the database should be unique for each current email, as when generating a new token,
 * all old ones are deleted.
 * @param oldEmail - the current email that the account is linked to.
 * @returns a `ChangeEmailToken` containing the old and new email addresses, as well as the tokens sent to each of them.
 *
 */
export async function getChangeEmailTokenByOldEmail(
  oldEmail: string
): Promise<changeEmailToken | null> {
  try {
    const client = await clientPromise;
    const db = client.db(); // Use your database name

    const changeEmailToken = await db
      .collection('changeemailtokens')
      .findOne({ oldEmail: oldEmail });
    //return JSON.parse(JSON.stringify(changeEmailToken));
    return JSON.parse(JSON.stringify(replaceIdDoc(changeEmailToken)));
  } catch {
    return null;
  }
}

export async function getChangeEmailTokenByEmails(
  oldEmail: string,
  newEmail: string
): Promise<changeEmailToken | null> {
  try {
    const client = await clientPromise;
    const db = client.db(); // Use your database name

    const changeEmailToken = await db
      .collection('changeemailtokens')
      .findOne({ oldEmail: oldEmail, newEmail: newEmail });
    //return JSON.parse(JSON.stringify(changeEmailToken));
    return JSON.parse(JSON.stringify(replaceIdDoc(changeEmailToken)));
  } catch {
    return null;
  }
}

/**
 * Function to delete the token. It is used after a successful email change, to delete the tokens that were used in the exchange.
 * @param token - the token sent to the old Email ( the email that was linked to the account, before the change.)
 * @returns `boolean` - a confirmation of the deletion.
 */
export async function deleteChangeEmailToken(token: string): Promise<boolean> {
  try {
    const client = await clientPromise;
    const db = client.db(); // Use your database name

    const deleted = await db
      .collection('changeemailtokens')
      .deleteOne({ oldToken: token });
    //return JSON.parse(JSON.stringify(changeEmailToken));
    return deleted.acknowledged;
  } catch {
    return false;
  }
}
