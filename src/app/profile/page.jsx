import ProfileContainer from '@/containers/profile/Profile';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'NextAuth | Profile',
};

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) redirect('/login?callbackUrl=/profile');

  return <ProfileContainer />;
};

export default ProfilePage;
