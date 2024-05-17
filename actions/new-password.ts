'use server';

import * as z from 'zod';

import { NewPasswordSchema } from '@/lib/schemas';
import {
  deleteResetToken,
  getResetTokenByToken,
} from '@/data/reset-password-tokens';
import { getUserByEmail, updatePassword } from '@/data/User';
import bcrypt from 'bcryptjs';
import { generatePasswordToken } from '@/lib/tokens';
import { sendResetPasswordEmail } from '@/lib/mail';
import { getChangePassTokenByEmail } from '@/data/change-pass-tokens';

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token: string | null
) => {
  if (!token) return { error: 'Missing token!' };

  const validatedFields = NewPasswordSchema.safeParse(values);
  if (!validatedFields.success) return { error: 'Invalid new password!' };
  const { password } = validatedFields.data;

  const resetToken = await getResetTokenByToken(token);

  if (!resetToken) {
    return { error: 'Invalid token!' };
  }

  const hasExpired = new Date(resetToken.expires) < new Date();

  const existingUser = await getUserByEmail(resetToken.email);

  if (!existingUser) {
    return { error: 'Malformed token!' };
  }

  if (hasExpired) {
    await deleteResetToken(token);
    const newResetToken = await generatePasswordToken(existingUser.email);
    if (!newResetToken)
      return { error: 'Expired token. Please request a new link.' };
    await sendResetPasswordEmail(existingUser.email, newResetToken?.token);
    return {
      error: 'Token has expired! A new link has been sent to your email.',
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const updated = await updatePassword(existingUser.id, hashedPassword);

  if (!updated) {
    return { error: 'Oops! Something went wrong..' };
  }

  await deleteResetToken(token);

  return { success: 'Password changed successfully! You can log in now.' };
};

/**
 *
 * @param token - the token to be verified
 * @param email - email of the user
 * @returns
 */
export const VerifyOTPToken = async (token: string, email: string) => {
  const existingToken = await getChangePassTokenByEmail(email);

  if (!existingToken) {
    return { error: 'Malformed token.' };
  }

  if (existingToken.token !== token) {
    return { error: 'Invalid token!' };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: 'OTP expired. Please try again. ' };
  }

  return { success: 'OTP Verified.' };
};
