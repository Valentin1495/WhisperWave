import { ServerWithMembers } from '@/types';
import { Member, Profile } from '@prisma/client';
import db from '@/lib/db';
import { findServer, uploadFile } from '@/actions/server.action';
import { getCurrentProfile } from '@/actions/profile.action';
import { NextRequest } from 'next/server';

export async function POST(request: Request) {
  const res = await request.json();

  const { newMessage, channelId, currentMemberId, fileUrl } = res;
  // const server = (await findServer(serverId)) as ServerWithMembers;
  // const currentProfile = (await getCurrentProfile()) as Profile;
  // const currentMember = server.members.find(
  //   (member) => member.profileId === currentProfile.id
  // ) as Member;

  try {
    const message = await db.message.create({
      data: {
        content: newMessage.trim(),
        fileUrl,
        channelId,
        memberId: currentMemberId,
      },
      include: {
        member: {
          include: {
            profile: true,
          },
        },
      },
    });

    return Response.json(message);
  } catch (error) {
    console.error(error);

    return Response.json(
      { message: 'An error occurred while processing the form submission' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const channelId = searchParams.get('channel') as string;

  try {
    const messages = await db.message.findMany({
      where: {
        channelId,
      },
      include: {
        member: {
          include: {
            profile: true,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return Response.json(messages);
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: 'An error occured while fetching messages.' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  const { messageId, channelId, editedContent } = await request.json();

  try {
    const editedMessage = await db.message.update({
      where: {
        id: messageId,
        channelId,
      },
      data: {
        content: editedContent,
      },
    });

    return Response.json(editedMessage);
  } catch (error: any) {
    console.error(error);
    return Response.json(
      { message: 'An error occurred while editing message' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const messageId = searchParams.get('id') as string;

  try {
    await db.message.delete({
      where: {
        id: messageId,
      },
    });

    return Response.json('Success!');
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: 'An error occurred while deleting message' },
      { status: 500 }
    );
  }
}
