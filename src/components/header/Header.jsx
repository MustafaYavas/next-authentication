import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';

const Header = () => {
  const { data } = useSession();

  return (
    <header className="flex justify-between items-center bg-transparent p-5 fixed w-full shadow-2xl">
      <div className="logo">
        <Link href="/" className="flex justify-center items-center gap-3">
          <Image src="/images/logo.png" alt="logo" width={24} height={24} />
          <span className="text-2xl hidden sm:block">Next-Auth</span>
        </Link>
      </div>

      <nav className="flex items-center">
        {data?.user && (
          <Link href="/profile" className="hover:text-sky-500">
            Profile
          </Link>
        )}
        {data?.user ? (
          <span
            onClick={() => signOut()}
            className="mx-4 hover:text-sky-500 cursor-pointer"
          >
            Signout
          </span>
        ) : (
          <Link className="mx-4 hover:text-sky-500" href="/login">
            Login
          </Link>
        )}

        {data?.user?.image && (
          <Image
            src={data.user.image}
            alt="profile-pic"
            width={24}
            height={24}
            className="rounded-full cursor-pointer"
          />
        )}
      </nav>
    </header>
  );
};

export default Header;
