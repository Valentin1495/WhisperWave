'use client';

import { useEffect, useState } from 'react';
import AddServerDialog from '../dialogs/add-server-dialog';
import InvitePeopleDialog from '../dialogs/invite-people-dialog';
import EditServerDialog from '../dialogs/edit-server-dialog';
import KickMemberDialog from '../dialogs/kick-member-dialog';
import CreateChannelDialog from '../dialogs/create-channel-dialog';
import LeaveServerDialog from '../dialogs/leave-server-dialog';
import DeleteServerDialog from '../dialogs/delete-server-dialog';

export default function DialogProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div>
      <AddServerDialog />
      <InvitePeopleDialog />
      <EditServerDialog />
      <KickMemberDialog />
      <CreateChannelDialog />
      <LeaveServerDialog />
      <DeleteServerDialog />
    </div>
  );
}
