'use server';

import db from '@/lib/db';
import { auth, currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

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
  const { userId } = auth();

  if (!userId) {
    return null;
  }

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

export async function editProfile(prevState: any, formData: FormData) {
  const { userId } = auth();

  if (!userId) {
    throw new Error('Somthing went wrong');
  }

  const profilePic = formData.get('profilePic') as string;

  try {
    await db.profile.update({
      where: {
        userId,
      },
      data: {
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
