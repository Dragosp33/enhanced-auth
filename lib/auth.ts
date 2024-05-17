import { auth } from '@/auth';
import { unstable_noStore } from 'next/cache';

export const user = async () => {
  unstable_noStore();
  // Adding a delay of 1.5 seconds
  await new Promise((resolve) => setTimeout(resolve, 1500));
  const session = await auth();

  return session?.user;
};

export const role = async () => {
  const session = await auth();

  return session?.user.role;
};
