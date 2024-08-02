import {
  Channel,
  Member,
  MemberRole,
  Message,
  Profile,
  Server,
} from '@prisma/client';

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

export type MemberWithProfile = Member & {
  profile: Profile;
};

export type MessageWithMember = Message & {
  member: {
    id: string;
    role: MemberRole;
    profile: {
      username: string;
      imageUrl: string;
    };
  };
};

export type PostRequestType = {
  newMessage: string;
  channelId: string;
  currentMemberId: string;
  fileUrl: string | null;
};

export type FileType = {
  url: string;
  name: string;
};
