import { clerkMiddleware } from '@clerk/nextjs/server';
import { updateSession } from './actions/profile.action';

// const isProtectedRoute = createRouteMatcher(['/server(.*)', '/invite(.*)']);

export default clerkMiddleware(async (auth, req) => {
  // if (isProtectedRoute(req)) {
  //   auth().protect();
  // }

  return await updateSession(req);
});

// export async function middleware(request: NextRequest) {
//   return await updateSession(request);
// }

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
