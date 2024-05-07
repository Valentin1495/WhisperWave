import { create } from 'zustand';

export type DialogType = 'addServer' | 'invitePeople';

type DialogStore = {
  type: DialogType | null;
  open: boolean;
  serverName: string | null;
  openDialog: (type: DialogType, serverName: string | null) => void;
  closeDialog: () => void;
};

export const useDialog = create<DialogStore>((set) => ({
  type: null,
  open: false,
  serverName: null,
  openDialog: (type: DialogType, serverName: string | null) => {
    set({
      type,
      open: true,
      serverName,
    });
  },
  closeDialog: () => {
    set({
      type: null,
      open: false,
    });
  },
}));
