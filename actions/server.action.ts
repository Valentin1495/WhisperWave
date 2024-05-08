'use server';

import { User, currentUser } from '@clerk/nextjs/server';
import { findProfile } from './profile.action';
import db from '@/lib/db';
import { redirect } from 'next/navigation';
import {
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { MemberRole, Profile } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID!,
    secretAccessKey: process.env.SECRET_ACCESS_KEY!,
  },
});

export async function redirectToServer() {
  const user = (await currentUser()) as User;
  const profile = await findProfile(user.id);
  let redirectPath;

  try {
    const server = await db.server.findFirst({
      where: {
        members: {
          some: {
            profileId: profile?.id,
          },
        },
      },
    });

    redirectPath = server && `/server/${server.id}`;
  } catch (error: any) {
    throw new Error(error);
  } finally {
    redirectPath && redirect(redirectPath);
  }
}

export async function uploadFileToS3(fileKey: string, fileContent: Buffer) {
  const params: PutObjectCommandInput = {
    Bucket: 'whisperwave',
    Key: fileKey,
    Body: fileContent,
  };

  try {
    await s3Client.send(new PutObjectCommand(params));
    console.log('File uploaded successfully:');

    return `https://whisperwave.s3.ap-northeast-2.amazonaws.com/${fileKey}`;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function addServer(prevState: any, formdata: FormData) {
  const user = (await currentUser()) as User;
  const profile = (await findProfile(user.id)) as Profile;
  const profileId = profile.id;
  const serverName = formdata.get('serverName') as string;
  const serverIcon = formdata.get('serverIcon') as File;
  const fileKey = `serverIcons/${uuidv4()}-${serverIcon.name}`;
  const fileContent = Buffer.from(await serverIcon.arrayBuffer());
  const imageUrl = await uploadFileToS3(fileKey, fileContent);

  try {
    await db.server.create({
      data: {
        profileId,
        name: serverName.trim(),
        imageUrl,
        inviteCode: uuidv4(),
        channels: {
          create: [
            {
              name: 'general',
              profileId,
            },
          ],
        },
        members: {
          create: [
            {
              profileId,
              role: MemberRole.ADMIN,
            },
          ],
        },
      },
    });

    revalidatePath('/');

    return {
      message: 'Success!',
    };
  } catch (error: any) {
    return {
      message: 'Failed to add server',
    };
  }
}

export async function findMyServers() {
  const user = (await currentUser()) as User;

  const profile = await findProfile(user.id);

  try {
    const myServers = await db.server.findMany({
      where: {
        members: {
          some: {
            profileId: profile?.id,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return myServers;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function findServer(serverId: string) {
  try {
    const server = await db.server.findUnique({
      where: {
        id: serverId,
      },
      include: {
        members: {
          include: {
            profile: true,
          },
          orderBy: {
            role: 'asc',
          },
        },
        channels: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });

    return server;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function editServer(prevState: any, formdata: FormData) {
  const serverId = formdata.get('serverId') as string;
  const serverName = formdata.get('serverName') as string;
  const serverIcon = formdata.get('serverIcon') as File;
  const prevImageUrl = formdata.get('prevImageUrl') as string;
  let isSameFile = serverIcon.size === 0;
  let imageUrl;

  if (isSameFile) {
    imageUrl = prevImageUrl;
  } else {
    const fileKey = `serverIcons/${uuidv4()}-${serverIcon.name}`;
    const fileContent = Buffer.from(await serverIcon.arrayBuffer());
    imageUrl = await uploadFileToS3(fileKey, fileContent);
  }

  try {
    await db.server.update({
      where: {
        id: serverId,
      },
      data: {
        name: serverName,
        imageUrl,
      },
    });

    revalidatePath(`/server/${serverId}`);

    return {
      message: 'Success!',
    };
  } catch (error: any) {
    return {
      message: 'Failed to edit server',
    };
  }
}
