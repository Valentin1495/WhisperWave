import type { Metadata } from 'next';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'WhisperWave - Group Chat',
  description:
    'WhisperWave is great for chilling with friends, or even building a worldwide community. Customize your own space to talk, play, and hang out.',
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      {children}
    </div>
  );
}
