# Protected Routes - Quick Answer

## Your Question

> "Would I need to create a layout file to protect cart, checkout, payment, profile pages and apply useAuthSync? How do we handle protection and ensuring auth syncs?"

## Answer: YES - I've Created It For You!

### What I Created

#### 1. **Protected Layout** (`app/(landing-page)/(protected)/layout.tsx`)

```typescript
"use client";

export default function ProtectedLayout({ children }) {
  const { isAuthenticated, isVerified, isLoading } = useAuthSync();

  // Automatically:
  // ✓ Verifies authentication
  // ✓ Syncs tokens across all storage
  // ✓ Handles token refresh
  // ✓ Redirects if not authenticated
  // ✓ Shows loading state

  if (isLoading) return <LoadingSpinner />;
  if (!isAuthenticated) return null; // Will redirect

  return <>{children}</>;
}
```

**This layout protects:**

- ✅ `/cart`
- ✅ `/checkout`
- ✅ `/payment`
- ✅ `/profile`

#### 2. **Enhanced Middleware** (`middleware.ts`)

```typescript
// Server-side protection
// Checks cookies for tokens
// Redirects if NO tokens at all
// Allows through if has refresh token (client will handle)
```

## How It Works

### Two-Layer Protection

```
┌──────────────────────────────────┐
│  Layer 1: Middleware             │
│  - Server-side                   │
│  - Checks cookies                │
│  - Redirects if no tokens        │
└────────┬─────────────────────────┘
         │
         ▼
┌──────────────────────────────────┐
│  Layer 2: Protected Layout       │
│  - Client-side                   │
│  - Uses useAuthSync()            │
│  - Verifies auth                 │
│  - Handles token refresh         │
└──────────────────────────────────┘
```

### Auth Sync is Automatic

**All your hooks already use `clientApiClient`:**

```typescript
// hooks/useCart.ts
export function useCart() {
  return useQuery({
    queryFn: async () => {
      return await clientApiClient.get("/marketplace/cart");
      // ✓ Tokens automatically attached
      // ✓ Automatic refresh on 401
      // ✓ Syncs to all storage locations
    },
  });
}

// hooks/useCheckout.ts
export function usePlaceOrder() {
  return useMutation({
    mutationFn: async (data) => {
      return await clientApiClient.post("/marketplace/place/orders", data);
      // ✓ Tokens automatically attached
      // ✓ Automatic refresh on 401
      // ✓ Syncs to all storage locations
    },
  });
}
```

**You don't need to do anything!** The system handles it automatically.

## What Happens When User Performs Actions

### Example: User Adds Item to Cart

```
1. User clicks "Add to Cart"
   ↓
2. useAddToCart() hook called
   ↓
3. clientApiClient.post('/marketplace/cart', data)
   ↓
4. Axios interceptor adds token from localStorage
   ↓
5. If token expired (401):
   → Automatically refreshes token
   → Updates all storage locations
   → Retries request
   ↓
6. Request succeeds ✓
```

### Example: User Checks Out

```
1. User navigates to /checkout
   ↓
2. Middleware checks cookies
   - Has refresh token? ✓
   ↓
3. Allows request through
   ↓
4. Protected Layout renders
   ↓
5. useAuthSync() verifies auth
   - Syncs tokens if needed
   ↓
6. Page loads ✓
   ↓
7. User fills form and clicks "Pay"
   ↓
8. useInitiatePayment() hook called
   ↓
9. clientApiClient handles token automatically
   ↓
10. Payment initiated ✓
```

## Endpoints & Hooks Analysis

### All Your Hooks Use clientApiClient ✓

| Feature          | Hook                   | Endpoint                                | Auto Token? | Auto Refresh? |
| ---------------- | ---------------------- | --------------------------------------- | ----------- | ------------- |
| Cart             | `useCart()`            | GET `/marketplace/cart`                 | ✓           | ✓             |
| Add to Cart      | `useAddToCart()`       | POST `/marketplace/cart`                | ✓           | ✓             |
| Update Cart      | `useUpdateCartItem()`  | PUT `/marketplace/cart/item/{id}`       | ✓           | ✓             |
| Remove from Cart | `useRemoveFromCart()`  | DELETE `/marketplace/cart/{id}`         | ✓           | ✓             |
| Place Order      | `usePlaceOrder()`      | POST `/marketplace/place/orders`        | ✓           | ✓             |
| Initiate Payment | `useInitiatePayment()` | POST `/marketplace/payment/initiate`    | ✓           | ✓             |
| Verify Payment   | `useVerifyPayment()`   | GET `/marketplace/payment/verify/{ref}` | ✓           | ✓             |
| Profile          | `useProfile()`         | GET `/auth/profile`                     | ✓           | ✓             |

**Result**: All your endpoints are already protected and handle auth automatically!

## Do You Need to Do Anything?

### NO! Everything is Already Set Up

✅ **Protected layout created** - Wraps all protected pages
✅ **Middleware enhanced** - Handles server-side protection
✅ **useAuthSync() integrated** - Automatic token synchronization
✅ **All hooks use clientApiClient** - Automatic token management
✅ **Token refresh automatic** - On 401 errors
✅ **All storage synced** - Cookies, localStorage, Zustand

### What You DON'T Need to Do

❌ Don't manually check auth in components
❌ Don't manually refresh tokens
❌ Don't manually sync storage
❌ Don't add auth headers to requests
❌ Don't handle 401 errors manually

## Testing

### Test 1: Try Accessing Cart While Logged Out

```bash
1. Clear cookies and localStorage
2. Navigate to /cart
3. ✓ Redirected to /auth?callbackUrl=/cart
4. Log in
5. ✓ Redirected back to /cart
```

### Test 2: Add Item to Cart with Expired Token

```bash
1. Log in
2. Wait for token to expire (or manually expire it)
3. Add item to cart
4. ✓ Token automatically refreshed
5. ✓ Item added successfully
```

### Test 3: Complete Checkout Flow

```bash
1. Log in
2. Add items to cart
3. Go to /checkout
4. Fill form
5. Click "Pay"
6. ✓ All requests authenticated automatically
7. ✓ Payment initiated successfully
```

## File Structure

```
app/
├── (landing-page)/
│   └── (protected)/
│       ├── layout.tsx          ← NEW! Protected layout
│       ├── cart/
│       │   └── page.tsx        ← Protected by layout
│       ├── checkout/
│       │   └── page.tsx        ← Protected by layout
│       ├── payment/
│       │   └── success/
│       │       └── page.tsx    ← Protected by layout
│       └── profile/
│           └── page.tsx        ← Protected by layout
├── middleware.ts               ← ENHANCED! Better token handling
hooks/
├── useAuthSync.ts              ← NEW! Auto auth sync
├── useCart.ts                  ← Already uses clientApiClient ✓
├── useCheckout.ts              ← Already uses clientApiClient ✓
└── useProfile.ts               ← Already uses clientApiClient ✓
```

## Summary

### Question: "How do we handle protection and auth sync?"

### Answer: **It's All Automatic!**

1. **Protection**:

   - Middleware (server-side) ✓
   - Protected Layout (client-side) ✓

2. **Auth Sync**:

   - useAuthSync() in layout ✓
   - clientApiClient in all hooks ✓
   - Automatic token refresh ✓
   - Automatic storage sync ✓

3. **Your Endpoints**:
   - All use clientApiClient ✓
   - All handle auth automatically ✓
   - All refresh tokens automatically ✓

### Result

✅ Cart, checkout, payment, profile are all protected
✅ Auth is automatically synchronized
✅ Tokens automatically refresh
✅ No manual token management needed
✅ Great user experience

**You don't need to change anything in your existing code!** Just use the pages as normal, and the protection + auth sync happens automatically.

## Need More Details?

📖 **Full Documentation**: `docs/PROTECTED_ROUTES_STRATEGY.md`
📖 **Token Management**: `docs/TOKEN_MANAGEMENT.md`
📖 **Token Refresh**: `docs/TOKEN_REFRESH_EXPLAINED.md`
