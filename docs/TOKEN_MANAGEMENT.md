# Token Management Strategy Documentation

## Overview

This application uses a **hybrid token management approach** that combines the security of HttpOnly cookies with the flexibility of localStorage. This ensures both security and seamless client-side API calls.

## Architecture

### Three-Layer Token Storage

1. **HttpOnly Cookies** (Primary - Server-side)

   - Most secure option
   - Automatically sent with Next.js API route requests
   - Protected from XSS attacks
   - Cannot be accessed by JavaScript

2. **localStorage** (Secondary - Client-side)

   - Used for direct API calls from the browser
   - Accessible by React Query hooks and client components
   - Synced with cookies via API routes

3. **Zustand Store** (State Management)
   - Global state management for React
   - Persisted to localStorage
   - Provides reactive updates across components

## Token Flow

### 1. Login/Signup Flow

```
User Login → Server Action (auth.ts)
    ↓
Set HttpOnly Cookies
    ↓
Return sessionData to client
    ↓
Client stores in:
    - localStorage
    - Zustand store
```

### 2. API Request Flow

```
Client makes API request
    ↓
Axios interceptor adds token from localStorage
    ↓
If 401 (Unauthorized)
    ↓
Attempt token refresh
    ↓
Update all storage locations
    ↓
Retry original request
```

### 3. Token Refresh Flow

```
Access token expires (401 error)
    ↓
Get refreshToken from localStorage
    ↓
Call /auth/refresh/token endpoint
    ↓
Receive new accessToken & refreshToken
    ↓
Sync to all locations:
    - localStorage
    - Zustand store
    - Server cookies (via /api/auth/sync-tokens)
    ↓
Retry failed request with new token
```

## Implementation Details

### Server Actions (`app/actions/auth.ts`)

- **Purpose**: Handle authentication on the server
- **Storage**: Sets HttpOnly cookies
- **Returns**: Session data to client for localStorage sync

### Client API Client (`lib/api/client-client.ts`)

- **Purpose**: Handle client-side API calls
- **Features**:
  - Automatic token attachment from localStorage
  - Automatic token refresh on 401 errors
  - Request queuing during refresh
  - Syncs refreshed tokens to all storage locations

### Token Sync Utility (`lib/auth/token-sync.ts`)

- **Purpose**: Centralized token synchronization
- **Functions**:
  - `syncTokens()`: Update tokens in all locations
  - `clearAllTokens()`: Remove tokens from all locations
  - `initializeTokens()`: Load tokens on app start
  - `hasValidTokens()`: Check token validity

### Zustand Store (`zustand/store.ts`)

- **Purpose**: Global state management
- **Features**:
  - Persists user, sessionData, auth status
  - `updateTokens()`: Update tokens in store
  - `clearAuth()`: Clear all auth data

## Usage Examples

### Making Authenticated API Calls

```typescript
import { clientApiClient } from "@/lib/api/client-client";

// The client automatically handles tokens
const data = await clientApiClient.get("/marketplace/get/all/products");
```

### Handling Login

```typescript
import { useLogin } from "@/hooks/useAuth";
import { syncTokens } from "@/lib/auth/token-sync";

const { login } = useLogin();

const handleLogin = async (credentials) => {
  const result = await login(credentials);

  if (result.success && result.sessionData) {
    // Tokens are automatically synced by the login hook
    // But you can manually sync if needed:
    await syncTokens(
      result.sessionData.accessToken,
      result.sessionData.refreshToken
    );
  }
};
```

### Initializing App

```typescript
// In your root layout or _app.tsx
import { initializeTokens } from "@/lib/auth/token-sync";
import { useEffect } from "react";

export default function RootLayout({ children }) {
  useEffect(() => {
    // Load tokens from localStorage to Zustand on app start
    initializeTokens();
  }, []);

  return <>{children}</>;
}
```

### Handling Logout

```typescript
import { clearAllTokens } from "@/lib/auth/token-sync";
import { useRouter } from "next/navigation";

const handleLogout = async () => {
  await clearAllTokens();
  router.push("/login");
};
```

## Security Considerations

### Why Both Cookies and localStorage?

1. **Cookies (HttpOnly)**:

   - ✅ Secure from XSS
   - ✅ Automatic with server requests
   - ❌ Not accessible for client-side API calls

2. **localStorage**:

   - ✅ Accessible for client-side API calls
   - ✅ Works with React Query
   - ⚠️ Vulnerable to XSS (mitigated by CSP headers)

3. **Combined Approach**:
   - ✅ Best of both worlds
   - ✅ Cookies for server routes
   - ✅ localStorage for client API calls
   - ✅ Synced to prevent inconsistencies

### Protection Measures

1. **Content Security Policy (CSP)**: Prevents XSS attacks
2. **HttpOnly Cookies**: Primary storage is XSS-proof
3. **Secure Flag**: Cookies only sent over HTTPS in production
4. **SameSite**: Prevents CSRF attacks
5. **Token Rotation**: Refresh tokens are rotated on each use

## Token Lifecycle

### Access Token

- **Lifetime**: 1 hour (configurable)
- **Storage**: Cookies + localStorage
- **Purpose**: Authenticate API requests
- **Refresh**: Automatically when expired

### Refresh Token

- **Lifetime**: 30 days (configurable)
- **Storage**: Cookies + localStorage
- **Purpose**: Get new access tokens
- **Rotation**: New refresh token issued on each refresh

## Troubleshooting

### Tokens Not Syncing

**Problem**: Tokens in localStorage don't match cookies

**Solution**:

```typescript
import { syncTokens } from "@/lib/auth/token-sync";

// Manually sync tokens
await syncTokens(accessToken, refreshToken);
```

### 401 Errors After Refresh

**Problem**: Still getting 401 after token refresh

**Possible Causes**:

1. Refresh token expired
2. Token sync failed
3. Network issues

**Solution**:

```typescript
// Check if tokens exist
import { hasValidTokens } from "@/lib/auth/token-sync";

if (!hasValidTokens()) {
  // Redirect to login
  router.push("/login");
}
```

### Tokens Lost on Page Refresh

**Problem**: User logged out on page refresh

**Solution**:

- Ensure `initializeTokens()` is called in root layout
- Check Zustand persist configuration
- Verify localStorage is accessible

## Best Practices

1. **Always use the provided utilities** for token management
2. **Never manually manipulate tokens** outside the utilities
3. **Initialize tokens on app start** using `initializeTokens()`
4. **Use `clientApiClient`** for all client-side API calls
5. **Use server actions** for server-side operations
6. **Clear tokens on logout** using `clearAllTokens()`
7. **Monitor token sync errors** in production

## API Routes

### `/api/auth/sync-tokens` (POST)

Syncs tokens from localStorage to server cookies.

**Request**:

```json
{
  "accessToken": "...",
  "refreshToken": "..."
}
```

**Response**:

```json
{
  "success": true,
  "message": "Tokens synced successfully"
}
```

### `/auth/refresh/token` (POST)

Backend endpoint to refresh access token.

**Request**:

```json
{
  "refreshToken": "..."
}
```

**Response**:

```json
{
  "success": true,
  "message": "Access token refreshed successfully",
  "token": {
    "accessToken": "...",
    "refreshToken": "..."
  }
}
```

## Conclusion

This hybrid approach provides:

- ✅ **Security**: HttpOnly cookies protect against XSS
- ✅ **Flexibility**: localStorage enables client-side API calls
- ✅ **Consistency**: Automatic synchronization across all storage
- ✅ **Reliability**: Automatic token refresh with request queuing
- ✅ **Developer Experience**: Simple, unified API for token management
