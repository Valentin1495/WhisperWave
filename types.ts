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
      name: string;
      imageUrl: string;
    };
  };
};

export type EditedMessage = {
  messageId: string;
  channelId: string;
  editedContent: string;
};
