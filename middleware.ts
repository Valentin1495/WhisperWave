import { clerkMiddleware } from '@clerk/nextjs/server';
import { updateSession } from './actions/profile.action';

export default clerkMiddleware(async (_, req) => {
  return await updateSession(req);
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
