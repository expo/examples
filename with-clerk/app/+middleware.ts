import { createClerkClient } from '@clerk/backend'
import { StatusError } from 'expo-server'

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
  publishableKey: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
})

export const unstable_settings = {
  matcher: {
    patterns: ['/api'],
  }
}

export default async function middleware(req: Request) {
  const { isAuthenticated } = await clerkClient.authenticateRequest(req)

  if (!isAuthenticated) {
    throw new StatusError(401, 'Unauthorized')
  }
}