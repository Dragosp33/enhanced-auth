'use server';

import { getUserByEmail } from '@/data/User';
import { RegisterSchema } from '@/lib/schemas';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import clientPromise from '@/lib/mongodb';
import mongoose from 'mongoose';
import { User } from '@/models/User';
import { AuthOptions } from '@/auth';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';

/*export const register = async (
  values: z.infer<typeof RegisterSchema>,
  callbackUrl?: string | null
) => {
  console.log('LOGS FROM REGISTER FUNC');
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { name, email, password } = validatedFields.data;
  console.log(name, email, password);
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return { success: 'Confirmation email sent!' };

  /*const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'Email does not exist!' };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: 'Confirmation email sent!' };
  } 
};*/

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    console.log(existingUser);
    return { error: 'Email already in use!' };
  }

  // in register, we use the User schema defined by mongoose, to assure our needed fields.

  if (process.env.MONGODB_URI) {
    await mongoose.connect(process.env.MONGODB_URI);

    //if (!user) return null;
    await User.create({ email: email, name: name, password: hashedPassword });
  } else {
    return { error: 'Register is not opened yet. Please come back later.' };
  }

  /* await db.collection('users').insertOne({
    email: email,
    name: name,
    password: hashedPassword,
  });*/

  const verificationToken = await generateVerificationToken(email);
  if (!verificationToken) {
    return { error: 'Oops..looks like something went wrong.' };
  }
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: 'Confirmation email sent!' };
};
