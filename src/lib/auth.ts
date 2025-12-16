import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { createPrismaClient } from './prisma-client.factory';

// Reference to the Prisma Client
const prisma = createPrismaClient();

/**
 * Reference to a better-auth instance configured with:
 *   - Prisma adapter (PostgreSQL)
 *   - Email+password login enabled
 *   - Trusted origin: localhost:3000
 *   - Disables origin check outside production
 *
 * Endpoints (by default, mounted at `/api/auth`):
 *   - POST   /sign-up/email            (Register)
 *   - POST   /sign-up/:provider        (Register with provider)
 *   - POST   /sign-in/email            (Login)
 *   - POST   /sign-in/:provider        (Login with provider)
 *   - POST   /sign-out                 (Logout)
 *   - GET    /session                  (Current session details)
 *   - POST   /session/refresh          (Refresh session)
 *   - POST   /verify/email             (Verify email token)
 *   - POST   /password/reset           (Reset password by token)
 *   - POST   /password/forgot          (Request password reset email)
 *   - [OAuth providers if enabled]
 */
export const auth: ReturnType<typeof betterAuth> = betterAuth({
  url: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: { enabled: true },
  trustedOrigins: ['http://localhost:3000'],
  advanced: {
    disableOriginCheck: process.env.NODE_ENV === 'development',
  },
});