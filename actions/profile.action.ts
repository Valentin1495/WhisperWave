'use server';

import db from '@/lib/db';
import { generateRandomColor, generateRandomUsername } from '@/lib/utils';
import { auth, currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { redirect } from 'next/navigation';

const secretKey = 'secret';
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ['HS256'],
  });
  return payload;
}

export async function login() {
  const user = { userId: uuidv4() };

  // Create the session
  const expires = new Date(Date.now() + 2 * 60 * 60 * 1000);
  const session = await encrypt({ user, expires });

  // Save the session in a cookie
  cookies().set('session', session, { expires, httpOnly: true });
}

export async function logout() {
  // Destroy the session
  cookies().set('session', '', { expires: new Date(0) });
  redirect('/');
}

export async function getSession() {
  const session = cookies().get('session')?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get('session')?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 2 * 60 * 60 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: 'session',
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}

export async function fetchUserId(): Promise<string> {
  let userId;
  const authentication = auth();
  userId = authentication.userId;

  if (!userId) {
    const session = await getSession();

    if (!session) {
      redirect('/');
    }
    userId = session.user.userId;
  }

  return userId;
}

export async function findProfile(userId: string) {
  try {
    const profile = await db.profile.findUnique({
      where: {
        userId,
      },
    });

    return profile;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getCurrentProfile() {
  const userId = await fetchUserId();

  try {
    const profile = await findProfile(userId);

    return profile;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function createProfile() {
  const user = await currentUser();

  if (!user) return;

  const { id, username, imageUrl } = user;
  const profile = await findProfile(id);

  if (profile) return profile;

  try {
    const newProfile = await db.profile.create({
      data: {
        userId: id,
        username: username ?? '',
        imageUrl,
      },
    });

    return newProfile;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function createRandomProfile() {
  const username = generateRandomUsername();
  const randomColor = generateRandomColor();
  const session = await getSession();

  if (!session) {
    redirect('/');
  }

  const userId = session.user.userId;
  const profile = await findProfile(userId);

  if (profile) return profile;

  try {
    const newProfile = await db.profile.create({
      data: {
        userId,
        username,
        imageUrl: randomColor,
      },
    });

    return newProfile;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function editProfile(prevState: any, formData: FormData) {
  const userId = await fetchUserId();
  const username = formData.get('username') as string;
  const profilePic = formData.get('profilePic') as string;

  try {
    await db.profile.update({
      where: {
        userId,
      },
      data: {
        username,
        imageUrl: profilePic,
      },
    });

    revalidatePath('/', 'layout');

    return {
      message: 'Success',
    };
  } catch (error) {
    console.error(error);

    return {
      message: 'Failed to edit the profile',
    };
  }
}
