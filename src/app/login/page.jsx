'use client';
import LoginContainer from '@/containers/login/Login';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

export const metadata = {
  title: 'NextAuth | Login',
};

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState(null);

  const signup = async (name, email, password) => {
    try {
      await fetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  const login = async (email, password) => {
    try {
      signIn('credentials', {
        redirect: false,
        email,
        password,
      })
        .then((res) => {
          if (res.ok) router.replace('/');
          else
            toast.error(res.error, {
              position: 'top-center',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'light',
            });
        })
        .catch((err) => {
          setError(err.error);
        });
    } catch (err) {
      throw new Error(error);
    }
  };

  return (
    <>
      <LoginContainer signup={signup} login={login} error={error} />
      <ToastContainer />
    </>
  );
};

export default LoginPage;
