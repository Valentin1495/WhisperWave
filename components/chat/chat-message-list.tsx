import { getMessages } from '@/actions/message.action';
import { Member } from '@prisma/client';
import ChatMessage from './chat-message';

type ChatMessagesListProps = {
  currentMember: Member;
  name: string;
  type: string;
  paramValue: string;
};

export default async function ChatMessagesList({
  paramValue,
  currentMember,
}: ChatMessagesListProps) {
  const messages = await getMessages(paramValue);

  return (
    <div className='space-y-3'>
      {messages.map(
        ({ id, content, createdAt, deleted, fileUrl, member, updatedAt }) => (
          <ChatMessage
            id={id}
            key={id}
            createdAt={createdAt}
            content={content}
            deleted={deleted}
            fileUrl={fileUrl}
            member={member}
            currentMemberId={currentMember.id}
            currentMemberRole={currentMember.role}
            updatedAt={updatedAt}
          />
        )
      )}
    </div>
  );
}
