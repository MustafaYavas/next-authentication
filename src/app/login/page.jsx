'use client';
import LoginContainer from '@/containers/login/Login';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
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
        .catch((err) => {})
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <>
      <LoginContainer signup={signup} login={login} loading={loading} />
      <ToastContainer />
    </>
  );
};

export default LoginPage;
