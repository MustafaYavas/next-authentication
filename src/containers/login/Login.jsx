'use client';
import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import LoadingSpinner from '@/components/loading/LoadingSpinner';

const LoginContainer = ({ signup, login, loading }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignupMessage, setShowSignupMessage] = useState(false);
  const session = useSession();
  const router = useRouter();

  if (session?.status === 'authenticated') router.replace('/');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) login(email, password);
    else {
      signup(name, email, password);
      setIsLogin(true);
      setShowSignupMessage(true);
    }

    resetInputs();
  };

  const resetInputs = () => {
    setName('');
    setEmail('');
    setPassword('');
  };

  const checkDisable = () => {
    if (email === '' || password === '') return true;
    return false;
  };

  return (
    <div className="bg-white shadow-2xl px-5 py-5 text-black rounded-lg w-1/3">
      <h3 className="mb-5 text-center text-2xl">
        {isLogin ? 'Login' : 'Signup'}
      </h3>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="flex flex-col mb-5">
            <label className="mb-2" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="text-md bg-slate-400 rounded-lg p-2 focus:outline-none focus:bg-slate-500 text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}

        <div className="flex flex-col my-5">
          <label className="mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="text-md bg-slate-400 rounded-lg p-2 focus:outline-none focus:bg-slate-500 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col my-5">
          <label className="mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="text-md bg-slate-400 rounded-lg p-2 focus:outline-none focus:bg-slate-500 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {showSignupMessage && (
          <span className="mt-5 mb-3 text-sm text-sky-700">
            You can now login!
          </span>
        )}

        <div className="flex justify-center">
          <button
            disabled={checkDisable()}
            type="submit"
            className={` py-2 px-3 rounded-lg w-full text-white ${
              checkDisable()
                ? 'cursor-not-allowed'
                : 'bg-sky-700 hover:bg-sky-800'
            }`}
            style={{
              backgroundColor: checkDisable() ? 'rgba(3, 105, 161, .5)' : '',
            }}
          >
            {isLogin ? 'Login' : 'Signup'}
          </button>
        </div>
      </form>

      <div className="mt-5 text-sm text-center">
        <p>
          {isLogin ? 'Does not have an account? ' : 'Already have an account? '}
          <span
            className="cursor-pointer hover:underline text-sky-700"
            onClick={() => {
              setIsLogin(!isLogin);
              setShowSignupMessage(false);
              resetInputs();
            }}
          >
            {isLogin ? 'Signup' : 'Login'}
          </span>
        </p>
        <p className="my-5">OR</p>
      </div>

      <div>
        <button
          type="button"
          className="border border-sky-700 py-2 px-3 rounded-lg w-full text-black hover:bg-sky-700 hover:text-white"
          onClick={() => signIn('google')}
        >
          Google
        </button>
      </div>

      {loading && <LoadingSpinner />}
    </div>
  );
};

export default LoginContainer;
