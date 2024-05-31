import { ServerWithMembers } from '@/types';
import { create } from 'zustand';

export type DialogType =
  | 'addServer'
  | 'invitePeople'
  | 'editServer'
  | 'kickMember'
  | 'createChannel'
  | 'leaveServer'
  | 'deleteServer'
  | 'deleteChannel'
  | 'editChannel'
  | 'deleteMessage';

export type DialogData = {
  server?: ServerWithMembers;
  channel?: {
    id: string;
    name: string;
  };
  memberId?: string;
  messageId?: string;
};

type DialogStore = {
  type: DialogType | null;
  open: boolean;
  data: DialogData | null;
  openDialog: (type: DialogType, data?: DialogData) => void;
  closeDialog: () => void;
};

export const useDialog = create<DialogStore>((set) => ({
  type: null,
  open: false,
  data: null,
  openDialog: (type: DialogType, data?: DialogData) => {
    set({
      type,
      open: true,
      data,
    });
  },
  closeDialog: () => {
    set({
      type: null,
      open: false,
    });
  },
}));
