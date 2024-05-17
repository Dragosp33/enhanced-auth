import * as z from 'zod';

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum(['ADMIN', 'USER']),
    email: z.optional(z.string().email()),
    oldPassword: z.optional(z.string()),
    newPassword: z.optional(z.string()),
    oldCode: z.optional(z.string().length(6, 'Must be exactly 6 chars long')),
    newCode: z.optional(z.string().length(6, 'Must be exactly 6 chars long')),
    passCode: z.optional(z.string().length(6, 'Must be exactly 6 chars long')),
  })
  .refine(
    (data) => {
      if (
        data.oldPassword &&
        data.oldPassword.length > 0 &&
        (!data.newPassword || data.newPassword.length < 6)
      ) {
        return false;
      }

      return true;
    },
    {
      message: 'New password is required to have minimum 6 chars!',
      path: ['newPassword'],
    }
  )
  .refine(
    (data) => {
      if (
        data.newPassword &&
        data.newPassword.length > 0 &&
        (!data.oldPassword || data.oldPassword.length < 6)
      ) {
        return false;
      }

      return true;
    },
    {
      message: 'Password is required to have minimum 6 chars!',
      path: ['oldPassword'],
    }
  );

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: 'Minimum of 6 characters required',
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
  password: z.string().min(1, {
    message: 'Password is required',
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
  password: z.string().min(6, {
    message: 'Minimum 6 characters required',
  }),
  name: z.string().min(1, {
    message: 'Name is required',
  }),
});
