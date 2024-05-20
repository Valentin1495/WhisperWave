import { Channel, Member, MemberRole, Profile, Server } from '@prisma/client';

export type ServerWithMembers = Server & {
  members: (Member & {
    profile: Profile;
  })[];
  channels: Channel[];
};

export type ChannelWithRole = Channel & {
  role?: MemberRole;
  server: ServerWithMembers;
};
