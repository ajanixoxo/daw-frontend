# Protected Routes Strategy

## Overview

This document explains how protected routes (cart, checkout, payment, profile) are secured and how authentication is synchronized across the application.

## Architecture

### Two-Layer Protection

```
┌─────────────────────────────────────────────────────────┐
│  Layer 1: Middleware (Server-Side)                      │
│  - Checks cookies for tokens                            │
│  - Redirects if NO tokens at all                        │
│  - Allows through if has refresh token                  │
└────────┬────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────┐
│  Layer 2: Protected Layout (Client-Side)                │
│  - Uses useAuthSync() hook                              │
│  - Verifies authentication state                        │
│  - Handles token refresh automatically                  │
│  - Shows loading state during verification              │
└─────────────────────────────────────────────────────────┘
```

## Protected Routes

### Routes Protected by Middleware + Layout

1. **`/cart`** - Shopping cart page
2. **`/checkout`** - Checkout page
3. **`/payment`** - Payment pages
4. **`/profile`** - User profile page
5. **`/product/[id]`** - Individual product pages

## How It Works

### Scenario 1: User Has Valid Tokens

```
User visits /cart
   ↓
Middleware checks cookies
   - accessToken: ✓
   - refreshToken: ✓
   ↓
Middleware allows request through
   ↓
Protected Layout renders
   ↓
useAuthSync() verifies auth
   - Checks Zustand store: ✓
   - Checks localStorage: ✓
   - Checks server cookies: ✓
   ↓
Page renders ✓
```

### Scenario 2: Access Token Expired, Refresh Token Valid

```
User visits /checkout
   ↓
Middleware checks cookies
   - accessToken: ✗ (expired)
   - refreshToken: ✓
   ↓
Middleware allows through (client will refresh)
   ↓
Protected Layout renders
   ↓
useAuthSync() runs
   ↓
User makes API request (e.g., fetch cart data)
   ↓
Server returns 401 (token expired)
   ↓
Axios interceptor catches 401
   ↓
Automatically refreshes token
   - Gets refreshToken from localStorage
   - Calls /auth/refresh/token
   - Receives new tokens
   - Updates all storage locations
   ↓
Retries original request
   ↓
Page renders with data ✓
```

### Scenario 3: No Tokens at All

```
User visits /profile
   ↓
Middleware checks cookies
   - accessToken: ✗
   - refreshToken: ✗
   ↓
Middleware redirects to /auth?callbackUrl=/profile
   ↓
User sees login page
   ↓
After login, redirected back to /profile
```

### Scenario 4: Tokens in localStorage but Not in Cookies

```
User visits /cart
   ↓
Middleware checks cookies
   - accessToken: ✗
   - refreshToken: ✗
   ↓
Middleware redirects to /auth
   ↓
BUT Protected Layout loads first
   ↓
useAuthSync() detects tokens in localStorage
   ↓
Syncs localStorage → cookies
   ↓
User stays on page ✓
```

## File Structure

```
app/
├── (landing-page)/
│   └── (protected)/
│       ├── layout.tsx          ← Protected layout with useAuthSync
│       ├── cart/
│       │   └── page.tsx        ← Cart page (protected)
│       ├── checkout/
│       │   └── page.tsx        ← Checkout page (protected)
│       ├── payment/
│       │   └── success/
│       │       └── page.tsx    ← Payment success (protected)
│       └── profile/
│           └── page.tsx        ← Profile page (protected)
└── middleware.ts               ← Server-side route protection
```

## Middleware Logic

### Current Implementation

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const protectedRoutes = [
    "/profile",
    "/cart",
    "/product",
    "/checkout",
    "/payment",
  ];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    const accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;

    // No tokens at all - redirect to login
    if (!accessToken && !refreshToken) {
      const loginUrl = new URL("/auth", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Has refresh token but no access token
    // Allow through - client will refresh
    if (!accessToken && refreshToken) {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}
```

### Why This Approach?

1. **Prevents unnecessary redirects** - If user has refresh token, let client handle refresh
2. **Better UX** - No flash of login page during token refresh
3. **Automatic recovery** - Client-side interceptor handles expired tokens
4. **Callback URLs** - Users return to intended page after login

## Protected Layout Logic

### Current Implementation

```typescript
// app/(landing-page)/(protected)/layout.tsx
"use client";

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const router = useRouter();
  const { isAuthenticated, isVerified, isLoading } = useAuthSync();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      const currentPath = window.location.pathname;
      router.push(`/auth?callbackUrl=${encodeURIComponent(currentPath)}`);
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
```

### What It Does

1. **Uses `useAuthSync()`** - Automatically syncs auth state
2. **Shows loading state** - While verifying authentication
3. **Redirects if not authenticated** - With callback URL
4. **Prevents flash of content** - Returns null if not authenticated

## API Endpoints Used

### Cart Endpoints

| Endpoint                      | Method | Auth Required | Hook                  |
| ----------------------------- | ------ | ------------- | --------------------- |
| `/marketplace/cart`           | GET    | ✓             | `useCart()`           |
| `/marketplace/cart`           | POST   | ✓             | `useAddToCart()`      |
| `/marketplace/cart/item/{id}` | PUT    | ✓             | `useUpdateCartItem()` |
| `/marketplace/cart/{id}`      | DELETE | ✓             | `useRemoveFromCart()` |

### Checkout Endpoints

| Endpoint                            | Method | Auth Required | Hook                   |
| ----------------------------------- | ------ | ------------- | ---------------------- |
| `/marketplace/place/orders`         | POST   | ✓             | `usePlaceOrder()`      |
| `/marketplace/payment/initiate`     | POST   | ✓             | `useInitiatePayment()` |
| `/marketplace/payment/verify/{ref}` | GET    | ✓             | `useVerifyPayment()`   |

### Profile Endpoints

| Endpoint        | Method | Auth Required | Hook                 |
| --------------- | ------ | ------------- | -------------------- |
| `/auth/profile` | GET    | ✓             | `useProfile()`       |
| `/auth/profile` | PUT    | ✓             | `useUpdateProfile()` |

## Hooks Analysis

### Cart Hooks (`hooks/useCart.ts`)

```typescript
// All cart hooks use clientApiClient
export function useCart() {
  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      return await clientApiClient.get("/marketplace/cart");
      // ✓ Automatic token attachment
      // ✓ Automatic token refresh on 401
    },
  });
}
```

**Auth Handling:**

- ✅ Uses `clientApiClient` with automatic token management
- ✅ Tokens automatically attached from localStorage
- ✅ Automatic refresh on 401 errors
- ✅ No manual token handling needed

### Checkout Hooks (`hooks/useCheckout.ts`)

```typescript
export function usePlaceOrder() {
  return useMutation({
    mutationFn: async (orderData) => {
      return await clientApiClient.post("/marketplace/place/orders", orderData);
      // ✓ Automatic token attachment
      // ✓ Automatic token refresh on 401
    },
  });
}
```

**Auth Handling:**

- ✅ Uses `clientApiClient` with automatic token management
- ✅ Tokens automatically attached from localStorage
- ✅ Automatic refresh on 401 errors
- ✅ Zustand store for checkout state

### Profile Hooks (`hooks/useProfile.ts`)

```typescript
export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      return await clientApiClient.get("/auth/profile");
      // ✓ Automatic token attachment
      // ✓ Automatic token refresh on 401
    },
  });
}
```

**Auth Handling:**

- ✅ Uses `clientApiClient` with automatic token management
- ✅ Tokens automatically attached from localStorage
- ✅ Automatic refresh on 401 errors

## Token Synchronization Flow

### When User Performs Actions

```
User clicks "Add to Cart"
   ↓
useAddToCart() hook called
   ↓
clientApiClient.post('/marketplace/cart', data)
   ↓
Axios interceptor adds token from localStorage
   ↓
Request sent to backend
   ↓
If token valid:
  → Request succeeds ✓
   ↓
If token expired (401):
  → Interceptor catches error
  → Gets refreshToken from localStorage
  → Calls /auth/refresh/token
  → Receives new tokens
  → Updates all storage:
     - localStorage ✓
     - Zustand store ✓
     - Server cookies ✓
  → Retries original request
  → Request succeeds ✓
```

## Best Practices

### ✅ DO

1. **Use the protected layout** for all authenticated pages
2. **Use `clientApiClient`** for all API calls
3. **Let the system handle token refresh** automatically
4. **Use `useAuthSync()`** in layouts for auth verification
5. **Add callback URLs** to login redirects

### ❌ DON'T

1. **Don't manually check tokens** in every component
2. **Don't manually refresh tokens** in hooks
3. **Don't use server actions** for client-side API calls
4. **Don't bypass the protected layout**
5. **Don't store sensitive data** in localStorage

## Testing Protected Routes

### Test 1: Access Protected Route While Logged In

```
1. Log in to the application
2. Navigate to /cart
3. ✓ Page loads immediately
4. ✓ Cart data fetched successfully
```

### Test 2: Access Protected Route While Logged Out

```
1. Clear all cookies and localStorage
2. Navigate to /cart
3. ✓ Redirected to /auth?callbackUrl=/cart
4. Log in
5. ✓ Redirected back to /cart
```

### Test 3: Access Protected Route with Expired Token

```
1. Log in
2. Manually expire access token (wait 1 hour or set invalid token)
3. Navigate to /checkout
4. ✓ Page loads (has refresh token)
5. Make API request
6. ✓ Token automatically refreshed
7. ✓ Request succeeds
```

### Test 4: Token Sync Across Tabs

```
1. Open app in Tab 1, log in
2. Open app in Tab 2
3. ✓ Both tabs show authenticated state
4. Delete cookies in Tab 1
5. Refresh Tab 1
6. ✓ Tokens synced from localStorage
7. ✓ User stays logged in
```

## Security Considerations

### Why This Approach is Secure

1. **HttpOnly Cookies** - Primary storage, XSS-proof
2. **Middleware Protection** - Server-side route guarding
3. **Client-Side Verification** - Double-check with useAuthSync
4. **Automatic Token Refresh** - Minimal exposure time
5. **Token Rotation** - New refresh token on each refresh
6. **Callback URLs** - Prevent open redirects

### Potential Vulnerabilities

1. **localStorage XSS** - Mitigated by CSP headers
2. **Token Theft** - Mitigated by short token lifetimes
3. **CSRF** - Mitigated by SameSite cookies

## Troubleshooting

### Problem: Infinite Redirect Loop

**Cause**: Middleware and layout both redirecting

**Solution**:

- Middleware only redirects if NO tokens
- Layout only redirects if not authenticated after loading

### Problem: Token Not Refreshing

**Cause**: Refresh token expired or invalid

**Solution**:

- Check refresh token expiry (30 days)
- Clear all tokens and re-login
- Check backend logs for refresh errors

### Problem: User Logged Out After Page Refresh

**Cause**: Tokens not persisted properly

**Solution**:

- Check Zustand persist configuration
- Verify localStorage is accessible
- Ensure `useAuthSync()` is in root layout

## Summary

### Protection Strategy

1. **Middleware** - First line of defense (server-side)
2. **Protected Layout** - Second line (client-side)
3. **useAuthSync** - Automatic token synchronization
4. **clientApiClient** - Automatic token refresh

### Auth Sync Strategy

1. **Tokens stored in 3 locations** - Cookies, localStorage, Zustand
2. **Automatic synchronization** - Via useAuthSync and token utilities
3. **Automatic refresh** - Via Axios interceptors
4. **Seamless UX** - No interruptions during token refresh

### Result

- ✅ Protected routes are secure
- ✅ Tokens automatically refresh
- ✅ Auth state always synchronized
- ✅ Great user experience
- ✅ No manual token management needed
