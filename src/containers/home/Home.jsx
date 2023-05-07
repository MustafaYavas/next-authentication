'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

const HomeContainer = () => {
  const { data } = useSession();

  return (
    <div className="text-center">
      <h1 className="mb-2 text-lg md:text-2xl">HOME</h1>
      <p className="mb-5">Everyone can see this page!</p>
      {data?.user ? (
        <p>Welcome, {data.user.name}</p>
      ) : (
        <div>
          <p>You are not logged in yet</p>
          <Link className="hover:underline" href="/login">
            Go & Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomeContainer;
