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
  | 'deleteMessage'
  | 'uploadFile';

export type DialogData = {
  server?: ServerWithMembers;
  channel?: {
    id: string;
    name: string;
  };
  memberId?: string;
};

type DialogStore = {
  type: DialogType | null;
  open: boolean;
  data: DialogData | null;
  fileUrl: string | null;
  fileName: string | null;
  openDialog: (type: DialogType, data?: DialogData) => void;
  closeDialog: () => void;
  addAttachment: (fileUrl: string, fileName: string) => void;
  removeAttachment: () => void;
};

export const useDialog = create<DialogStore>((set) => ({
  type: null,
  open: false,
  data: null,
  fileUrl: null,
  fileName: null,
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
  addAttachment: (fileUrl: string, fileName: string) => {
    set({
      fileUrl,
      fileName,
    });
  },
  removeAttachment: () => {
    set({
      fileUrl: null,
      fileName: null,
    });
  },
}));
