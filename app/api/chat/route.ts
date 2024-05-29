import { ServerWithMembers } from '@/types';
import { Member, Profile } from '@prisma/client';
import db from '@/lib/db';
import { getCurrentProfile } from '@/actions/profile.action';
import { findServer } from '@/actions/server.action';

export async function POST(request: Request) {
  const formData = await request.formData();

  let message = formData.get('message') as string;
  message = message.trim();
  const channelId = formData.get('channelId') as string;
  const serverId = formData.get('serverId') as string;
  const currentProfile = (await getCurrentProfile()) as Profile;
  const server = (await findServer(serverId)) as ServerWithMembers;

  const currentMember = server.members.find(
    (member) => member.profileId === currentProfile.id
  ) as Member;

  try {
    const newMessage = await db.message.create({
      data: {
        content: message,
        fileUrl: null,
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
