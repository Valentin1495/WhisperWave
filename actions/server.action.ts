'use server';

import { findProfile, getCurrentProfile } from './profile.action';
import db from '@/lib/db';
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { MemberRole, Profile } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { utapi } from '@/app/api/uploadthing/core';
import { auth } from '@clerk/nextjs/server';
// // import {
// //   PutObjectCommand,
// //   PutObjectCommandInput,
// //   S3Client,
// // } from '@aws-sdk/client-s3';

// // const s3Client = new S3Client({
// //   region: process.env.AWS_REGION!,
// //   credentials: {
// //     accessKeyId: process.env.ACCESS_KEY_ID!,
// //     secretAccessKey: process.env.SECRET_ACCESS_KEY!,
// //   },
// // });

// // export async function uploadFileToS3(fileKey: string, fileContent: Buffer) {
// //   const params: PutObjectCommandInput = {
// //     Bucket: 'whisperwave',
// //     Key: fileKey,
// //     Body: fileContent,
// //   };

// //   try {
// //     await s3Client.send(new PutObjectCommand(params));
// //     console.log('File uploaded successfully:');

// //     return `https://whisperwave.s3.ap-northeast-2.amazonaws.com/${fileKey}`;
// //   } catch (error: any) {
// //     throw new Error(error);
// //   }
// // }

export async function redirectToServer(profileId: string) {
  let redirectPath;

  try {
    const server = await db.server.findFirst({
      where: {
        members: {
          some: {
            profileId,
          },
        },
      },
    });

    if (!server) return;

    redirectPath = `/server/${server.id}`;
  } catch (error: any) {
    throw new Error(error);
  } finally {
    if (redirectPath) {
      redirect(redirectPath);
    }
  }
}

export async function uploadFile(file: File) {
  try {
    const response = await utapi.uploadFiles(file);
    const imageUrl = response.data!.url;

    return imageUrl;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function addServer(prevState: any, formdata: FormData) {
  let redirectPath;
  const { userId } = auth();
  const profile = (await findProfile(userId as string)) as Profile;
  const profileId = profile.id;
  const serverName = formdata.get('serverName') as string;
  const isDialog = formdata.get('isDialog') as string;
  let serverIcon = formdata.get('serverIcon') as string | File;

  if (serverIcon instanceof File) {
    serverIcon = await uploadFile(serverIcon);
  }

  // const fileKey = `serverIcons/${uuidv4()}-${serverIcon.name}`;
  // const fileContent = Buffer.from(await serverIcon.arrayBuffer());
  // const imageUrl = await uploadFileToS3(fileKey, fileContent);

  try {
    await db.server.create({
      data: {
        profileId,
        name: serverName,
        imageUrl: serverIcon,
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

    if (isDialog) {
      revalidatePath('/', 'layout');
    }

    return {
      message: 'Success',
    };
  } catch (error) {
    console.error(error);

    return {
      message: 'Failed to create a server',
    };
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

export async function findMyServers(profileId: string) {
  try {
    const myServers = await db.server.findMany({
      where: {
        members: {
          some: {
            profileId,
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

export async function findExistingServer(inviteCode: string) {
  const currentProfile = await getCurrentProfile();

  if (!currentProfile) {
    return null;
  }

  try {
    const existingServer = await db.server.findUnique({
      where: {
        inviteCode,
        members: {
          some: {
            profileId: currentProfile.id,
          },
        },
      },
    });

    return existingServer;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function editServer(prevState: any, formdata: FormData) {
  const serverId = formdata.get('serverId') as string;
  const serverName = formdata.get('serverName') as string;
  const serverIcon = formdata.get('serverIcon') as string;

  try {
    await db.server.update({
      where: {
        id: serverId,
      },
      data: {
        name: serverName,
        imageUrl: serverIcon,
      },
    });

    revalidatePath(`/server/${serverId}`);

    return {
      message: 'Success',
    };
  } catch (error) {
    console.error(error);

    return {
      message: 'Failed to edit server',
    };
  }
}

export async function inviteToServer(inviteCode: string) {
  const currentProfile = (await getCurrentProfile()) as Profile;

  if (!currentProfile) {
    return;
  }

  const existingServer = await findExistingServer(inviteCode);

  if (existingServer) return existingServer.id;

  try {
    const invitedServer = await db.server.update({
      where: {
        inviteCode,
      },
      data: {
        members: {
          create: [
            {
              profileId: currentProfile.id,
            },
          ],
        },
      },
    });

    return invitedServer.id;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function changeRole(
  serverId: string,
  memberId: string,
  newRole: MemberRole
) {
  try {
    await db.server.update({
      where: {
        id: serverId,
      },
      data: {
        members: {
          update: {
            where: {
              id: memberId,
            },
            data: {
              role: newRole,
            },
          },
        },
      },
    });

    revalidatePath(`/server/${serverId}/members`);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function kickMember(serverId?: string, memberId?: string) {
  try {
    await db.server.update({
      where: {
        id: serverId,
      },
      data: {
        members: {
          deleteMany: {
            id: memberId,
          },
        },
      },
    });

    revalidatePath(`/server/${serverId}/members`);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function createChannel(prevState: any, formData: FormData) {
  const currentProfile = await getCurrentProfile();

  if (!currentProfile) {
    return {
      message: 'Cannot find a current profile',
    };
  }

  const profileId = currentProfile.id;
  const serverId = formData.get('serverId') as string;
  const channelName = formData.get('channelName') as string;

  try {
    await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          create: {
            profileId,
            name: channelName,
          },
        },
      },
    });

    revalidatePath(`/server/${serverId}`);

    return {
      message: 'Success',
    };
  } catch (error) {
    console.error(error);

    return {
      message: 'Failed to create channel',
    };
  }
}

export async function leaveServer(serverId?: string) {
  const currentProfile = await getCurrentProfile();

  if (!currentProfile) return;

  const profileId = currentProfile.id;
  let redirectPath;

  try {
    await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId,
          },
        },
      },
      data: {
        members: {
          deleteMany: {
            profileId,
          },
        },
      },
    });

    redirectPath = '/';
  } catch (error: any) {
    throw new Error(error);
  } finally {
    if (redirectPath) {
      redirect(redirectPath);
    }
  }
}

export async function deleteServer(serverId?: string) {
  let redirectPath;

  try {
    await db.server.delete({
      where: {
        id: serverId,
      },
    });

    redirectPath = '/';
  } catch (error: any) {
    throw new Error(error);
  } finally {
    if (redirectPath) {
      redirect(redirectPath);
    }
  }
}

export async function deleteChannel(serverId?: string, channelId?: string) {
  let redirectPath;

  try {
    await db.server.update({
      where: {
        id: serverId,
      },
      data: {
        channels: {
          deleteMany: {
            id: channelId,
          },
        },
      },
    });

    redirectPath = `/server/${serverId}`;
  } catch (error: any) {
    throw new Error(error);
  } finally {
    if (redirectPath) redirect(redirectPath);
  }
}

export async function editChannel(prevState: any, formData: FormData) {
  const channelName = formData.get('channelName') as string;
  const serverId = formData.get('serverId') as string;
  const channelId = formData.get('channelId') as string;

  try {
    await db.server.update({
      where: {
        id: serverId,
      },
      data: {
        channels: {
          update: {
            where: {
              id: channelId,
            },
            data: {
              name: channelName,
            },
          },
        },
      },
    });

    revalidatePath(`/server/${serverId}/channel/${channelId}`);

    return {
      message: 'Success',
    };
  } catch (error) {
    console.error(error);

    return {
      message: 'Failed to edit channel',
    };
  }
}
