import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from './ui/skeleton';

type AvatarPhotoProps = {
  src: string;
  alt: string;
  className: string;
};

export function AvatarPhoto({ src, alt, className }: AvatarPhotoProps) {
  return (
    <Avatar className={className}>
      <AvatarImage src={src} alt={alt} className='object-cover' />
      <AvatarFallback>
        <Skeleton className='rounded-full' />
      </AvatarFallback>
    </Avatar>
  );
}
