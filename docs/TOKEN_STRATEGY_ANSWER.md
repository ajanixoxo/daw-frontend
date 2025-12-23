# Token Management Strategy - Answer to Your Question

## Your Question

> "We currently store the access and refresh token in localStorage persisting using Zustand. How do we go about making this work with the `/auth/refresh/token` endpoint? Would it be that we will be keeping users on the platform using the stored persisted tokens in localStorage or strictly using the cookie due to the retriggering of the access/refresh token or both?"

## The Answer: **BOTH (Hybrid Approach)**

You should use **BOTH cookies AND localStorage** for optimal security and functionality. Here's why:

### Why Not Just Cookies?

**Problem**: HttpOnly cookies can't be accessed by client-side JavaScript

- ❌ Can't attach tokens to direct API calls from React components
- ❌ Can't use with React Query hooks
- ❌ Can't make authenticated requests from the browser

**Use Case**: Cookies are perfect for Next.js Server Actions and API routes

### Why Not Just localStorage?

**Problem**: localStorage is vulnerable to XSS attacks

- ⚠️ Malicious scripts can steal tokens
- ⚠️ Less secure than HttpOnly cookies

**Use Case**: localStorage is necessary for client-side API calls

### The Solution: Hybrid Approach

**Use BOTH and keep them synchronized!**

## How It Works

### 1. Initial Login/Signup

```typescript
// Server Action sets cookies
await createServerSession(sessionData); // Sets HttpOnly cookies

// Client stores in localStorage + Zustand
useAuthStore.getState().login(user, sessionData); // Stores in Zustand
localStorage.setItem("accessToken", sessionData.accessToken); // Stores in localStorage
```

### 2. Making API Requests

**From Client Components** (React Query, hooks):

```typescript
// Uses token from localStorage
const data = await clientApiClient.get("/marketplace/products");
// Axios interceptor automatically adds: Authorization: Bearer <token from localStorage>
```

**From Server Actions**:

```typescript
// Uses token from cookies
const session = await getServerSession(); // Reads from cookies
const data = await apiClient.get("/api/endpoint", {
  token: session.accessToken,
});
```

### 3. Token Refresh Flow

When access token expires (401 error):

```
1. Client detects 401 error
   ↓
2. Get refreshToken from localStorage
   ↓
3. Call /auth/refresh/token with refreshToken
   ↓
4. Receive new accessToken + refreshToken
   ↓
5. Update ALL storage locations:
   - localStorage ✓
   - Zustand store ✓
   - Server cookies ✓ (via /api/auth/sync-tokens)
   ↓
6. Retry original request with new token
```

## Implementation

### Current Setup (What You Have)

✅ Zustand store persisting to localStorage
✅ Server actions setting cookies
✅ `/auth/refresh/token` endpoint

### What We Added

✅ **Token synchronization utility** (`lib/auth/token-sync.ts`)

- Syncs tokens across all storage locations
- Provides centralized token management

✅ **Enhanced client API client** (`lib/api/client-client.ts`)

- Automatic token refresh on 401
- Syncs refreshed tokens to all locations
- Request queuing during refresh

✅ **Sync API route** (`/api/auth/sync-tokens`)

- Updates server cookies when tokens refresh
- Called automatically after token refresh

✅ **Enhanced Zustand store** (`zustand/store.ts`)

- Added `updateTokens()` method
- Persists sessionData (including tokens)

✅ **React hook** (`hooks/useTokenSync.ts`)

- Easy-to-use token management
- Automatic initialization

## Answering Your Specific Question

### "Would we keep users on the platform using stored persisted tokens in localStorage?"

**Answer**: YES, but with synchronization to cookies.

**How**:

1. On app load, tokens from localStorage are loaded into Zustand store
2. These tokens are used for client-side API calls
3. When tokens refresh, ALL storage locations are updated
4. Server cookies are kept in sync via `/api/auth/sync-tokens`

### "Or strictly using the cookie?"

**Answer**: NO, not strictly cookies.

**Why**: Cookies alone don't work for client-side API calls to external backends.

### "Or both?"

**Answer**: YES, BOTH! This is the recommended approach.

**Benefits**:

- ✅ Cookies provide security (HttpOnly, protected from XSS)
- ✅ localStorage provides functionality (client-side API calls)
- ✅ Synchronization ensures consistency
- ✅ Automatic token refresh works seamlessly

## User Session Persistence

### Scenario 1: User Closes Browser and Returns

```
1. User returns to site
   ↓
2. App loads, calls initializeTokens()
   ↓
3. Tokens loaded from localStorage to Zustand
   ↓
4. Cookies still valid (30-day refresh token)
   ↓
5. User stays logged in ✓
```

### Scenario 2: Access Token Expires During Session

```
1. User makes API request
   ↓
2. Server returns 401 (token expired)
   ↓
3. Client automatically calls /auth/refresh/token
   ↓
4. New tokens received and synced to all locations
   ↓
5. Original request retried with new token
   ↓
6. User doesn't notice anything ✓
```

### Scenario 3: Refresh Token Expires

```
1. User makes API request
   ↓
2. Server returns 401
   ↓
3. Client tries to refresh token
   ↓
4. Refresh fails (refresh token expired)
   ↓
5. All tokens cleared from all locations
   ↓
6. User redirected to login page
```

## Code Examples

### Using in a Component

```typescript
import { useTokenSync } from "@/hooks/useTokenSync";

function MyComponent() {
  const { isAuthenticated, hasTokens } = useTokenSync();

  if (!isAuthenticated || !hasTokens) {
    return <LoginPrompt />;
  }

  return <AuthenticatedContent />;
}
```

### Making Authenticated Requests

```typescript
import { clientApiClient } from "@/lib/api/client-client";

// Tokens are automatically attached and refreshed
const products = await clientApiClient.get("/marketplace/get/all/products");
```

### Manual Token Update (if needed)

```typescript
import { syncTokens } from "@/lib/auth/token-sync";

// After getting new tokens from somewhere
await syncTokens(newAccessToken, newRefreshToken);
// Now all storage locations are updated
```

## Security Best Practices

1. **Primary Storage**: HttpOnly cookies (most secure)
2. **Secondary Storage**: localStorage (for functionality)
3. **Always Sync**: Keep both in sync
4. **CSP Headers**: Protect against XSS
5. **HTTPS Only**: In production
6. **Token Rotation**: Refresh tokens are rotated on each use

## Summary

**Your Question**: Should we use localStorage or cookies?

**Answer**: Use BOTH with synchronization!

**Why**:

- Cookies = Security (HttpOnly, XSS-proof)
- localStorage = Functionality (client-side API calls)
- Synchronization = Best of both worlds

**How**:

- Tokens stored in both locations
- Automatic refresh on 401 errors
- All locations updated when tokens refresh
- User stays logged in seamlessly

**Result**:

- ✅ Secure authentication
- ✅ Seamless user experience
- ✅ Automatic token refresh
- ✅ Persistent sessions
- ✅ Works with both server and client components
