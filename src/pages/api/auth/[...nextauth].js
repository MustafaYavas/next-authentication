import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

import User from '@/models/user';
import connectMongo from '@/libs/db';

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials, req) {
        connectMongo();

        const { email, password } = credentials;

        let existingUser;

        try {
          existingUser = await User.findOne({ email });
        } catch (error) {
          throw new Error('Logging in failed!');
        }

        if (!existingUser)
          throw new Error(
            'User not found! Please check your email and password.'
          );

        let isValidPassword = false;

        try {
          isValidPassword = await bcrypt.compare(
            password,
            existingUser.password
          );
        } catch (error) {
          throw new Error('Logging in failed!');
        }

        if (!isValidPassword)
          throw new Error('Could not log you in. Invalid credentials!');

        return existingUser;
      },
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
});
