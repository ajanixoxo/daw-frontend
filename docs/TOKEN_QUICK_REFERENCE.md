# Token Management Quick Reference

## TL;DR

**Use BOTH cookies AND localStorage with automatic synchronization.**

## Quick Setup

### 1. In Your Root Layout

```typescript
// app/layout.tsx
import { useTokenSync } from "@/hooks/useTokenSync";

export default function RootLayout({ children }) {
  useTokenSync(); // Automatically initializes and syncs tokens

  return <html>{children}</html>;
}
```

### 2. Making API Calls

```typescript
// Client-side (React components, hooks)
import { clientApiClient } from "@/lib/api/client-client";

const data = await clientApiClient.get("/marketplace/products");
// Tokens automatically attached and refreshed!

// Server-side (Server Actions)
import { apiClient } from "@/lib/api/client";
import { getServerSession } from "@/app/actions/auth";

const session = await getServerSession();
const data = await apiClient.get("/api/endpoint", {
  token: session.accessToken,
});
```

### 3. Login/Signup

```typescript
import { useLogin } from "@/hooks/useAuth";

const { login } = useLogin();

const handleLogin = async (credentials) => {
  await login(credentials);
  // Tokens automatically synced to all locations!
};
```

### 4. Logout

```typescript
import { clearAllTokens } from "@/lib/auth/token-sync";

const handleLogout = async () => {
  await clearAllTokens();
  router.push("/login");
};
```

## Token Storage Locations

| Location             | Purpose          | Security             | Auto-Refresh |
| -------------------- | ---------------- | -------------------- | ------------ |
| **HttpOnly Cookies** | Server requests  | 🔒 High (XSS-proof)  | ✅ Yes       |
| **localStorage**     | Client API calls | ⚠️ Medium (XSS risk) | ✅ Yes       |
| **Zustand Store**    | React state      | ⚠️ Medium (XSS risk) | ✅ Yes       |

## Token Refresh Flow

```
API Request → 401 Error → Auto Refresh → Update All Locations → Retry Request
```

## Key Files

| File                                | Purpose                         |
| ----------------------------------- | ------------------------------- |
| `lib/auth/token-sync.ts`            | Token synchronization utilities |
| `lib/api/client-client.ts`          | Client API with auto-refresh    |
| `hooks/useTokenSync.ts`             | React hook for token management |
| `app/api/auth/sync-tokens/route.ts` | Sync tokens to cookies          |
| `zustand/store.ts`                  | Global auth state               |
| `app/actions/auth.ts`               | Server-side auth actions        |

## Common Tasks

### Check if User is Authenticated

```typescript
import { useAuthStore } from "@/zustand/store";

const { isAuthenticated, sessionData } = useAuthStore();
```

### Manually Sync Tokens

```typescript
import { syncTokens } from "@/lib/auth/token-sync";

await syncTokens(accessToken, refreshToken);
```

### Check Token Validity

```typescript
import { hasValidTokens } from "@/lib/auth/token-sync";

if (!hasValidTokens()) {
  router.push("/login");
}
```

## Troubleshooting

| Problem                    | Solution                               |
| -------------------------- | -------------------------------------- |
| Tokens not syncing         | Call `syncTokens()` manually           |
| 401 errors after refresh   | Check if refresh token expired         |
| User logged out on refresh | Ensure `useTokenSync()` in root layout |
| Tokens in wrong state      | Call `initializeTokens()`              |

## Security Checklist

- ✅ HttpOnly cookies for primary storage
- ✅ Secure flag in production
- ✅ SameSite=lax for CSRF protection
- ✅ Token rotation on refresh
- ✅ CSP headers configured
- ✅ HTTPS in production

## Best Practices

1. ✅ Always use `clientApiClient` for client-side API calls
2. ✅ Use `useTokenSync()` hook in root layout
3. ✅ Never manually manipulate tokens
4. ✅ Use `clearAllTokens()` for logout
5. ✅ Monitor token sync errors in production
6. ✅ Set appropriate token expiry times

## Token Lifetimes

| Token         | Lifetime | Storage                |
| ------------- | -------- | ---------------------- |
| Access Token  | 1 hour   | Cookies + localStorage |
| Refresh Token | 30 days  | Cookies + localStorage |

## API Endpoints

| Endpoint                | Method | Purpose                |
| ----------------------- | ------ | ---------------------- |
| `/auth/refresh/token`   | POST   | Refresh access token   |
| `/api/auth/sync-tokens` | POST   | Sync tokens to cookies |
| `/auth/login`           | POST   | User login             |
| `/auth/logout`          | POST   | User logout            |

## Environment Variables

```env
NEXT_PUBLIC_API_URL=https://dawbackend.funtech.dev
NODE_ENV=production
```

## Need More Details?

- 📖 Full documentation: `docs/TOKEN_MANAGEMENT.md`
- ❓ Strategy explanation: `docs/TOKEN_STRATEGY_ANSWER.md`
