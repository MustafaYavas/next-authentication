import Link from 'next/link';

import { useSession, signOut } from 'next-auth/react';

const Header = () => {
  const { data } = useSession();

  return (
    <header className="flex justify-between items-center bg-transparent p-5 fixed w-full shadow-2xl">
      <div className="logo">
        <Link href="/" className="text-2xl">
          Next-Auth
        </Link>
      </div>

      <nav>
        {data?.user && (
          <Link href="/admin" className="hover:text-sky-500">
            Admin
          </Link>
        )}
        {data?.user ? (
          <span
            onClick={() => signOut()}
            className="ml-4 hover:text-sky-500 cursor-pointer"
          >
            Signout
          </span>
        ) : (
          <Link className="ml-4 hover:text-sky-500" href="/login">
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
