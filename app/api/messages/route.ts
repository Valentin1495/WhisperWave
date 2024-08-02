import db from '@/lib/db';
import { NextRequest } from 'next/server';

export async function POST(request: Request) {
  const res = await request.json();

  const { newMessage, channelId, currentMemberId, fileUrl } = res;

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
      { message: 'An error occurred while sending a message' },
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
      { message: 'An error occured while fetching messages' },
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
  } catch (error) {
    console.error(error);

    return Response.json(
      { message: 'An error occurred while editing a message' },
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

    return Response.json('Success');
  } catch (error) {
    console.error(error);

    return Response.json(
      { message: 'An error occurred while deleting a message' },
      { status: 500 }
    );
  }
}
