import db from '@/lib/db';

export async function DELETE(request: Request) {
  const { messageId } = await request.json();

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
      { message: 'An error occurred while processing the form submission' },
      { status: 500 }
    );
  }
}
