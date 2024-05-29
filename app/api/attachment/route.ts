import { ServerWithMembers } from '@/types';
import { Member, Profile } from '@prisma/client';
import db from '@/lib/db';
import { getCurrentProfile } from '@/actions/profile.action';
import { findServer, uploadFileToS3 } from '@/actions/server.action';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  const formData = await request.formData();

  let message = formData.get('message') as string;
  message = message.trim();
  const file = formData.get('file') as File;
  const channelId = formData.get('channelId') as string;
  const serverId = formData.get('serverId') as string;
  const currentProfile = (await getCurrentProfile()) as Profile;
  const server = (await findServer(serverId)) as ServerWithMembers;
  const fileKey = `attachments/${uuidv4()}-${file.name}`;
  const fileContent = Buffer.from(await file.arrayBuffer());
  const fileUrl = await uploadFileToS3(fileKey, fileContent);
  const currentMember = server.members.find(
    (member) => member.profileId === currentProfile.id
  ) as Member;

  try {
    const newMessage = await db.message.create({
      data: {
        content: message,
        fileUrl,
        channelId,
        memberId: currentMember.id,
      },
    });
    return Response.json(newMessage);
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: 'An error occurred while processing the form submission' },
      { status: 500 }
    );
  }
}
