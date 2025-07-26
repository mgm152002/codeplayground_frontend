// app/api/auth/[auth0]/route.js
import { handleAuth } from '@auth0/nextjs-auth0';

export const GET = async (req, res) => {
  if (process.env.SKIP_AUTH === 'true') {
    // Bypass authentication for testing
    return new Response('Authentication bypassed', { status: 200 });
  } else {
    // Proceed with normal Auth0 authentication
    return handleAuth()(req, res);
  }
};
