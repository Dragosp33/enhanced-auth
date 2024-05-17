'use server';

import * as z from 'zod';
import bcrypt from 'bcryptjs';

import clientPromise from '@/lib/mongodb';
import { SettingsSchema } from '@/lib/schemas';
import { getUserByEmail, getUserById, updateUser } from '@/data/User';
import { user } from '@/lib/auth';
import { role } from '@/lib/auth';
import { verifyChangeEmailsTokens } from './change-email';
import {
  generateChangeEmailToken,
  generateChangePassToken,
} from '@/lib/tokens';
import { sendChangeEmailsEmail, sendChangePassEmail } from '@/lib/mail';
import { VerifyOTPToken } from './new-password';

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  console.log(
    'SETTTTTTTTTTTTTTTTTTTTTTTTTTTINGSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS'
  );
  const currentUser = await user();

  const verifiedValues = SettingsSchema.safeParse(values);
  console.log({ verifiedValues });

  if (!verifiedValues.success) {
    return { error: 'Invalid data.' };
  }

  if (!currentUser?.id) {
    return { error: 'Unauthorized.' };
  }
  const existingUser = await getUserById(currentUser?.id);
  if (!existingUser) {
    return { error: 'Error retrieving user data.' };
  }

  // if current user is using an OAuth provider, then he can't change password, email, 2FA.
  if (currentUser.isOAuth) {
    delete verifiedValues.data.email;
    delete verifiedValues.data.oldPassword;
    delete verifiedValues.data.newPassword;
    delete verifiedValues.data.isTwoFactorEnabled;
  }

  // check false at first.

  let identityCheck = false;

  // checks if the codes for email change are present. If so, try changing the email.
  // sets identity check to true if the codes are correct. This is helpful in order to not
  // request another code for the password, in case a user wants to change them both at one time.
  if (
    verifiedValues.data.email &&
    verifiedValues.data.email !== existingUser.email
  ) {
    // check codes for email change::
    if (verifiedValues.data.oldCode && verifiedValues.data.newCode) {
      console.log({ loggedValueS: verifiedValues.data });
      const verifyResult = await verifyChangeEmailsTokens(
        existingUser.email,
        verifiedValues.data.oldCode,
        verifiedValues.data.newCode
      );
      console.log({ verifyResult });
      if (verifyResult.error) {
        console.log({ error: verifyResult.error });
        //early return here
        return { error: verifyResult.error };
      }
      const verifiedTokens = verifyResult.token;
      // we set the data.email to be verified tokens . newEmail, because a user might try to update that value after receiving the token
      verifiedValues.data.email = verifiedTokens?.newEmail;
      identityCheck = true;
    } else {
      await generateChangeEmailToken(
        existingUser.email,
        verifiedValues.data.email
      );
      return { emailChange: true };
    }
  }

  if (verifiedValues.data.oldPassword && verifiedValues.data.newPassword) {
    // if identity is checked, there is no point in checking the password, so the verifiedValues stays the same.
    if (!identityCheck) {
      // check password here.
      const equal = await bcrypt.compare(
        verifiedValues.data.oldPassword,
        existingUser.password
      );

      if (!equal) {
        return { error: 'Password incorrect!' };
      }

      if (!verifiedValues.data.passCode) {
        const passToken = await generateChangePassToken(existingUser.email);
        await sendChangePassEmail(existingUser.email, passToken.token);
        return { passCode: true };
      }
      const OTPVerified = await VerifyOTPToken(
        verifiedValues.data.passCode,
        existingUser.email
      );
      if (OTPVerified.error) {
        return { error: OTPVerified.error };
      }
    }

    // by doing early returns, if we get here, we know for sure that the validation is already made, so we can change the
    // password.
    const hashedPassword = await bcrypt.hash(
      verifiedValues.data.newPassword,
      10
    );
    verifiedValues.data.newPassword = hashedPassword;
  }

  // Here we start checking for the first time if email or passwords are changed, so we can send back a response
  // requesting for OTP codes from email.

  // and then verify the code from email , and then => update the user's password.:
  // at first returnable has passcode and emailchange to false, so that if both password and email are changed
  // in the settings page, a response containing both of them will be sent back.

  console.log({ verifiedValues });

  const { newPassword, isTwoFactorEnabled, email, name } = verifiedValues.data;

  // update here
  const success = await updateUser(
    existingUser._id.toString(),
    newPassword,
    isTwoFactorEnabled,
    email,
    name
  );

  if (!success) {
    return { error: 'Something went wrong...' };
  }

  return { success: 'Information updated.' };
};
