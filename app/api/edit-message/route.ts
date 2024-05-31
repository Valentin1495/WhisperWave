import db from '@/lib/db';

export async function PATCH(request: Request) {
  const { messageId, channelId, editedContent, fileUrl } = await request.json();

  try {
    const editedMessage = await db.message.update({
      where: {
        id: messageId,
        channelId,
      },
      data: {
        content: editedContent,
        fileUrl,
      },
    });

    return Response.json(editedMessage);
  } catch (error: any) {
    console.error(error);
    return Response.json(
      { message: 'An error occurred while processing the form submission' },
      { status: 500 }
    );
  }
}
