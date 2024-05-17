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
import { getChangeEmailTokenByOldEmail } from '@/data/change-email-tokens';

/**
 * function to verify codes sent to each current and new email addresses
 * @param currentEmail - current user's email
 * @param oldToken - token to be verified against the one sent on the current address
 * @param newToken - token to be verified against the one sent on the new address.
 * @returns - error with message, or success with token from database
 */
export const verifyChangeEmailsTokens = async (
  currentEmail: string,
  oldToken: string,
  newToken: string
) => {
  if (!oldToken || !newToken || !currentEmail) {
    return { error: 'Email tokens Missing ' };
  }
  const existingTokens = await getChangeEmailTokenByOldEmail(currentEmail);

  if (!existingTokens) {
    return { error: 'Invalid email tokens.' };
  }
  console.log({ changemailtoken: existingTokens });

  const hasExpired = new Date(existingTokens.expires) < new Date();
  if (hasExpired) {
    return { error: 'Email Tokens have expired.' };
  }

  if (
    existingTokens.oldToken !== oldToken ||
    existingTokens.newToken !== newToken
  ) {
    return { error: 'Email Tokens do not match.' };
  }

  return { success: 'Email Tokens match. ', token: existingTokens };
};
