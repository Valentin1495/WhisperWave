import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { generateUploadDropzone } from '@uploadthing/react';
import type { OurFileRouter } from '@/app/api/uploadthing/core';
import { MessageWithMember, PostRequestType } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

export const fetchMessages = async (
  channelId: string
): Promise<MessageWithMember[]> => {
  const res = await fetch(`/api/messages?channel=${channelId}`);
  if (!res.ok) throw new Error('Failed to fetch messages');

  const messages = await res.json();
  return messages;
};

export const sendMessage = async (
  postRequest: PostRequestType
): Promise<MessageWithMember> => {
  const { channelId, currentMemberId, fileUrl, newMessage } = postRequest;

  const res = await fetch('/api/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      newMessage,
      channelId,
      currentMemberId,
      fileUrl,
    }),
  });
  if (!res.ok) throw new Error('Failed to send message');

  const message = await res.json();
  return message;
};

export const generateRandomUsername = () => {
  const prefix = 'guest-';
  const length = 8;
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters[randomIndex];
  }

  return prefix + randomString; // 예: user-vg7ry8io8y
};

export const generateRandomColor = () => {
  const arr = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
  ];

  let hexNum = '';

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    hexNum += arr[randomIndex];
  }

  return `#${hexNum}`;
};
