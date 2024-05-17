import { auth } from '@/auth';
import { UserInfo } from '@/components/user-info';
import { user } from '@/lib/auth';
import { generateVerificationToken } from '@/lib/tokens';

const page = async () => {
  const session = await auth();
  //console.log('session: ', session);*/
  //const token = await generateVerificationToken('placeholder');
  //console.log('VERIFICATION TOKEN: ', token);

  return (
    <div>
      <UserInfo label='Server Session' user={session?.user} />
    </div>
  );
};

export default page;
