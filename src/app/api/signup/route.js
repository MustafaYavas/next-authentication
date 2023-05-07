import bcrypt from 'bcryptjs';

import connectMongo from '@/libs/db';
import User from '@/models/user';

export async function POST(req) {
  connectMongo();

  const body = await req.json();
  const { name, email, password } = body;
  let hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({ name, email, password: hashedPassword });

  return new Response(user);
}
