# Understanding Token Refresh and Auth Synchronization

## Your Questions Answered

### Question 1: "How do I handle checkVerificationStatus with Zustand?"

**Answer**: Use the `useAuthSync()` hook instead of calling `checkVerificationStatus()` directly.

**Before** (Server Component):

```typescript
// app/page.tsx
export default async function Home() {
  const verificationStatus = await checkVerificationStatus(); // Server-side only

  return (
    <div>{verificationStatus.isAuthenticated && <AuthenticatedContent />}</div>
  );
}
```

**After** (Client Component with Zustand):

```typescript
// app/page.tsx
"use client";

import { useAuthSync } from "@/hooks/useAuthSync";

export default function Home() {
  const { isAuthenticated, isVerified, isLoading } = useAuthSync();

  if (isLoading) return <LoadingSpinner />;

  return <div>{isAuthenticated && isVerified && <AuthenticatedContent />}</div>;
}
```

### Question 2: "I deleted the access token from cookies and nothing happened. When will the refresh work?"

**Answer**: The refresh will trigger when you make an API request that returns a 401 error.

## How Token Refresh Actually Works

### Scenario 1: You Delete Access Token from Cookies

```
1. You manually delete accessToken cookie
   ↓
2. localStorage still has the token
   ↓
3. useAuthSync() detects mismatch
   ↓
4. Syncs localStorage token back to cookies
   ↓
5. Everything works again ✓
```

**Why nothing happened?**

- The client-side code still has tokens in localStorage
- `useAuthSync()` automatically re-syncs them to cookies
- No API request was made, so no 401 error occurred

### Scenario 2: Access Token Expires Naturally

```
1. Access token expires (after 1 hour)
   ↓
2. User makes an API request
   ↓
3. Server returns 401 (Unauthorized)
   ↓
4. Axios interceptor catches the 401
   ↓
5. Gets refreshToken from localStorage
   ↓
6. Calls /auth/refresh/token
   ↓
7. Receives new accessToken + refreshToken
   ↓
8. Updates ALL locations:
   - localStorage ✓
   - Zustand store ✓
   - Server cookies ✓
   ↓
9. Retries the original request
   ↓
10. Request succeeds ✓
```

### Scenario 3: You Delete BOTH Tokens from Cookies

```
1. You delete both accessToken and refreshToken cookies
   ↓
2. localStorage still has tokens
   ↓
3. useAuthSync() detects mismatch
   ↓
4. Syncs localStorage tokens to cookies
   ↓
5. User stays logged in ✓
```

### Scenario 4: You Delete Tokens from BOTH Cookies AND localStorage

```
1. You delete tokens from cookies AND localStorage
   ↓
2. Zustand store still has sessionData (persisted)
   ↓
3. useAuthSync() detects tokens in Zustand
   ↓
4. Syncs Zustand tokens to localStorage and cookies
   ↓
5. User stays logged in ✓
```

### Scenario 5: You Delete Tokens from EVERYWHERE

```
1. Delete from cookies, localStorage, AND clear Zustand store
   ↓
2. No tokens anywhere
   ↓
3. useAuthSync() detects no auth
   ↓
4. isAuthenticated = false
   ↓
5. User sees login page ✓
```

## When Does Token Refresh Trigger?

Token refresh is triggered by **401 errors from API requests**, not by checking cookies.

### Triggers Token Refresh:

✅ Making an API request with an expired access token
✅ Server returns 401 Unauthorized
✅ Axios interceptor catches it and refreshes

### Does NOT Trigger Token Refresh:

❌ Manually deleting cookies
❌ Checking `checkVerificationStatus()`
❌ Just loading the page
❌ Zustand store updates

## The Flow in Detail

### 1. Initial Page Load

```typescript
// app/page.tsx loads
useAuthSync() runs
   ↓
Checks:
- localStorage tokens? ✓
- Zustand sessionData? ✓
- Server cookies? ✗ (you deleted them)
   ↓
Action: Sync localStorage → cookies
   ↓
Result: User stays logged in
```

### 2. Making an API Request

```typescript
// User clicks "View Products"
clientApiClient.get('/marketplace/products')
   ↓
Axios interceptor adds: Authorization: Bearer <token from localStorage>
   ↓
If token is valid:
  → Request succeeds ✓
   ↓
If token is expired:
  → Server returns 401
  → Interceptor catches it
  → Gets refreshToken from localStorage
  → Calls /auth/refresh/token
  → Gets new tokens
  → Updates all storage locations
  → Retries original request
  → Request succeeds ✓
```

## Testing Token Refresh

### Test 1: Simulate Expired Access Token

```typescript
// In browser console
localStorage.setItem("accessToken", "expired-token-here");

// Then make an API request
// The interceptor will catch the 401 and refresh automatically
```

### Test 2: Delete Cookies and See Sync

```typescript
// 1. Open DevTools → Application → Cookies
// 2. Delete accessToken cookie
// 3. Refresh the page
// 4. Check cookies again - they're back! (synced from localStorage)
```

### Test 3: Force Token Refresh

```typescript
// In browser console
import { tokenManager } from "@/lib/api/client-client";

// Manually trigger refresh
await tokenManager.refreshAccessToken();
console.log("Tokens refreshed!");
```

## Why Your Test Didn't Work

**What you did:**

1. Deleted accessToken from cookies
2. Expected something to happen
3. Nothing happened

**Why nothing happened:**

1. localStorage still had the token
2. `useAuthSync()` detected the mismatch
3. Automatically synced localStorage → cookies
4. No API request was made, so no 401 error
5. No need to refresh because tokens are still valid

**To actually trigger a refresh:**

1. Wait for access token to expire (1 hour)
2. OR manually set an invalid token in localStorage
3. OR make the token expired on the backend
4. Then make an API request
5. You'll see the refresh happen automatically

## The Three Storage Locations

### 1. Cookies (Server-side)

- **Purpose**: Secure storage, auto-sent with requests
- **Set by**: Server actions, sync API route
- **Read by**: Server components, server actions
- **Deleted when**: Logout, manual deletion

### 2. localStorage (Client-side)

- **Purpose**: Token source for API requests
- **Set by**: Login hook, token sync utility
- **Read by**: Axios interceptor, useAuthSync hook
- **Deleted when**: Logout, manual deletion

### 3. Zustand Store (Client-side, persisted)

- **Purpose**: React state management
- **Set by**: Login hook, auth actions
- **Read by**: React components, hooks
- **Deleted when**: Logout, clearAuth()
- **Persisted to**: localStorage (survives page refresh)

## Synchronization Priority

When there's a mismatch, here's the priority:

```
1. Zustand Store (persisted sessionData)
   ↓
2. localStorage (tokens)
   ↓
3. Server Cookies
```

**Example:**

- Zustand has tokens ✓
- localStorage missing ✗
- Cookies missing ✗

**Result**: Zustand → localStorage → Cookies (all synced)

## Common Scenarios

### Scenario: User Logs In

```
Login → Server sets cookies → Client gets sessionData
→ Zustand stores it → localStorage stores tokens
→ All synced ✓
```

### Scenario: User Refreshes Page

```
Page loads → useAuthSync() runs
→ Checks Zustand (persisted) → Has sessionData ✓
→ Checks localStorage → Has tokens ✓
→ Checks cookies → Has tokens ✓
→ All in sync, user stays logged in ✓
```

### Scenario: User Closes Browser and Returns Next Day

```
Page loads → useAuthSync() runs
→ Checks Zustand (persisted) → Has sessionData ✓
→ Checks localStorage → Has tokens ✓
→ Checks cookies → May be expired
→ Syncs localStorage → cookies
→ User stays logged in ✓
```

### Scenario: Access Token Expires During Session

```
User makes request → 401 error
→ Interceptor catches → Refreshes token
→ Updates all locations → Retries request
→ User doesn't notice anything ✓
```

### Scenario: Refresh Token Expires

```
User makes request → 401 error
→ Interceptor tries to refresh → Refresh fails (refresh token expired)
→ Clears all tokens → Redirects to login
→ User must log in again
```

## Summary

**Your Question**: "When will the refresh work?"

**Answer**: Token refresh triggers when:

1. You make an API request
2. The access token is expired
3. Server returns 401
4. Axios interceptor catches it
5. Automatically refreshes using refreshToken

**It does NOT trigger when:**

- You manually delete cookies
- You just load the page
- You check auth status

**What happens when you delete cookies:**

- `useAuthSync()` detects the mismatch
- Syncs tokens from localStorage back to cookies
- User stays logged in
- No refresh needed (tokens still valid)

**To actually see a refresh:**

1. Wait for token to expire (1 hour)
2. OR set an invalid token
3. Then make an API request
4. Watch the console - you'll see the refresh happen automatically
