'use server';

import db from '@/lib/db';
import { uploadFile } from './server.action';

export async function findProfile(username: string) {
  try {
    const profile = await db.profile.findUnique({
      where: {
        username,
      },
    });

    return profile;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function signIn(prevState: any, formData: FormData) {
  const username = formData.get('username') as string;

  try {
    const existingUser = await db.profile.findUnique({
      where: {
        username,
      },
    });

    if (!existingUser)
      return {
        message: "User doesn't exist",
      };

    return {
      message: 'Success',
    };
  } catch (error) {
    console.error(error);

    return {
      message: 'Failed to sign in',
    };
  }
}

export async function getCurrentProfile(username?: string) {
  if (!username) return null;

  try {
    const profile = await findProfile(username);

    return profile;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function createProfile(prevState: any, formData: FormData) {
  const username = formData.get('username') as string;

  const regex = /^[a-zA-Z0-9_]+$/;
  if (!regex.test(username)) {
    return {
      message:
        "Your username can only contain English letters, numbers and '_'",
    };
  }

  const profilePic = formData.get('profilePic') as File;
  const imageUrl = await uploadFile(profilePic);

  try {
    const existingUser = await db.profile.findUnique({
      where: {
        username,
      },
    });

    if (existingUser) {
      return {
        message: 'User already exists',
      };
    }

    await db.profile.create({
      data: {
        username: username.trim(),
        imageUrl,
      },
    });

    return {
      message: 'Success',
    };
  } catch (error) {
    console.error(error);

    return {
      message: 'Failed to create a profile',
    };
  }
}
