import { ServerWithMembers } from '@/types';
import { create } from 'zustand';

export type DialogType =
  | 'addServer'
  | 'invitePeople'
  | 'editServer'
  | 'kickMember';

export type DialogData = {
  server: ServerWithMembers;
  memberId?: string;
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
