'use server';

import { ResetSchema } from '@/lib/schemas';
import { getUserByEmail } from '@/data/User';
import { z } from 'zod';
import { sendResetPasswordEmail } from '@/lib/mail';
import { generatePasswordToken } from '@/lib/tokens';

export const resetPassword = async (values: z.infer<typeof ResetSchema>) => {
  console.log('RESET FUNCTION???');
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) return { error: 'Invalid email.' };

  const { email } = validatedFields.data;

  const user = await getUserByEmail(email);

  if (!user) return { error: 'Email is not assigned to any user.' };
  if (!user.password) {
    return {
      error: `You haven't signed up with a password, try logging in via providers.`,
    };
  }

  try {
    const token = await generatePasswordToken(email);
    if (!token) return { error: 'Something went wrong..' };
    await sendResetPasswordEmail(email, token.token);
  } catch {
    return { error: 'Something went wrong..please try again later.' };
  }

  return { success: 'An email was sent to your address.' };
};
