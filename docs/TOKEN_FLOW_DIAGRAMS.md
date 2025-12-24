# Token Management Flow Diagrams

## 1. Login Flow

```
┌─────────────┐
│   User      │
│  Submits    │
│ Credentials │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────┐
│  Server Action: loginUser()         │
│  - Calls /auth/login                │
│  - Receives tokens + user data      │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│  createServerSession()               │
│  ✓ Set HttpOnly cookies             │
│    - accessToken (1 hour)           │
│    - refreshToken (30 days)         │
│    - userId, email, role, etc.      │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│  Return sessionData to Client        │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│  Client: useLogin hook               │
│  ✓ Store in Zustand                 │
│  ✓ Store in localStorage            │
│  ✓ Update auth state                │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│  User Authenticated ✓                │
│  - Cookies: ✓                       │
│  - localStorage: ✓                  │
│  - Zustand: ✓                       │
└─────────────────────────────────────┘
```

## 2. API Request Flow (Client-Side)

```
┌─────────────────┐
│  Component      │
│  Makes API Call │
└────────┬────────┘
         │
         ▼
┌──────────────────────────────────────┐
│  clientApiClient.get('/products')    │
└────────┬─────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────┐
│  Axios Request Interceptor           │
│  - Get token from localStorage       │
│  - Add: Authorization: Bearer <token>│
└────────┬─────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────┐
│  Send Request to Backend             │
└────────┬─────────────────────────────┘
         │
         ├─── Success (200) ───────────┐
         │                             │
         │                             ▼
         │                    ┌────────────────┐
         │                    │ Return Data ✓  │
         │                    └────────────────┘
         │
         └─── Error (401) ────────────┐
                                      │
                                      ▼
                         ┌────────────────────────┐
                         │  Token Expired!        │
                         │  Trigger Auto-Refresh  │
                         └────────┬───────────────┘
                                  │
                                  ▼
                         [See Token Refresh Flow]
```

## 3. Token Refresh Flow

```
┌────────────────────┐
│  401 Error         │
│  (Token Expired)   │
└─────────┬──────────┘
          │
          ▼
┌──────────────────────────────────────┐
│  Check if already refreshing?        │
└─────────┬────────────────────────────┘
          │
          ├─── YES ──────────────────┐
          │                          │
          │                          ▼
          │                 ┌────────────────────┐
          │                 │  Queue Request     │
          │                 │  Wait for refresh  │
          │                 └────────────────────┘
          │
          └─── NO ───────────────────┐
                                     │
                                     ▼
                        ┌────────────────────────────┐
                        │  Set isRefreshing = true   │
                        └────────┬───────────────────┘
                                 │
                                 ▼
                        ┌────────────────────────────┐
                        │  Get refreshToken from     │
                        │  localStorage              │
                        └────────┬───────────────────┘
                                 │
                                 ▼
                        ┌────────────────────────────┐
                        │  POST /auth/refresh/token  │
                        │  Body: { refreshToken }    │
                        └────────┬───────────────────┘
                                 │
                                 ├─── Success ───────┐
                                 │                   │
                                 │                   ▼
                                 │      ┌────────────────────────┐
                                 │      │  Receive New Tokens    │
                                 │      │  - accessToken         │
                                 │      │  - refreshToken        │
                                 │      └────────┬───────────────┘
                                 │               │
                                 │               ▼
                                 │      ┌────────────────────────┐
                                 │      │  Update All Locations: │
                                 │      │  1. localStorage ✓     │
                                 │      │  2. Zustand store ✓   │
                                 │      │  3. Server cookies ✓  │
                                 │      └────────┬───────────────┘
                                 │               │
                                 │               ▼
                                 │      ┌────────────────────────┐
                                 │      │  Process Queued        │
                                 │      │  Requests              │
                                 │      └────────┬───────────────┘
                                 │               │
                                 │               ▼
                                 │      ┌────────────────────────┐
                                 │      │  Retry Original        │
                                 │      │  Request ✓             │
                                 │      └────────────────────────┘
                                 │
                                 └─── Failure ──────┐
                                                    │
                                                    ▼
                                       ┌────────────────────────┐
                                       │  Refresh Failed!       │
                                       │  - Clear all tokens    │
                                       │  - Redirect to login   │
                                       └────────────────────────┘
```

## 4. Token Synchronization Flow

```
┌──────────────────────────────────────┐
│  New Tokens Received                 │
│  (from login, signup, or refresh)    │
└────────┬─────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────┐
│  syncTokens(accessToken,             │
│             refreshToken)            │
└────────┬─────────────────────────────┘
         │
         ├──────────────────────────────┐
         │                              │
         ▼                              ▼
┌─────────────────┐          ┌─────────────────────┐
│  localStorage   │          │  Zustand Store      │
│  ✓ accessToken  │          │  ✓ updateTokens()   │
│  ✓ refreshToken │          │  ✓ sessionData      │
└─────────────────┘          └─────────────────────┘
         │                              │
         └──────────┬───────────────────┘
                    │
                    ▼
         ┌──────────────────────────────┐
         │  POST /api/auth/sync-tokens  │
         │  Body: { accessToken,        │
         │          refreshToken }      │
         └────────┬─────────────────────┘
                  │
                  ▼
         ┌──────────────────────────────┐
         │  Server: Update Cookies      │
         │  ✓ Set accessToken cookie    │
         │  ✓ Set refreshToken cookie   │
         └────────┬─────────────────────┘
                  │
                  ▼
         ┌──────────────────────────────┐
         │  All Locations Synced ✓      │
         │  - Cookies ✓                 │
         │  - localStorage ✓            │
         │  - Zustand ✓                 │
         └──────────────────────────────┘
```

## 5. App Initialization Flow

```
┌──────────────────┐
│  App Starts      │
│  (Page Load)     │
└────────┬─────────┘
         │
         ▼
┌──────────────────────────────────────┐
│  Root Layout Renders                 │
│  useTokenSync() hook called          │
└────────┬─────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────┐
│  initializeTokens()                  │
│  - Read from localStorage            │
│  - Load into Zustand store           │
└────────┬─────────────────────────────┘
         │
         ├─── Tokens Found ─────────────┐
         │                              │
         │                              ▼
         │                    ┌──────────────────┐
         │                    │  User Logged In  │
         │                    │  ✓ Restore state │
         │                    └──────────────────┘
         │
         └─── No Tokens ───────────────┐
                                       │
                                       ▼
                              ┌──────────────────┐
                              │  User Logged Out │
                              │  Show login page │
                              └──────────────────┘
```

## 6. Logout Flow

```
┌──────────────────┐
│  User Clicks     │
│  Logout          │
└────────┬─────────┘
         │
         ▼
┌──────────────────────────────────────┐
│  clearAllTokens()                    │
└────────┬─────────────────────────────┘
         │
         ├──────────────────────────────┐
         │                              │
         ▼                              ▼
┌─────────────────┐          ┌─────────────────────┐
│  localStorage   │          │  Zustand Store      │
│  ✗ Clear tokens │          │  ✗ clearAuth()      │
└─────────────────┘          └─────────────────────┘
         │                              │
         └──────────┬───────────────────┘
                    │
                    ▼
         ┌──────────────────────────────┐
         │  POST /api/auth/logout       │
         └────────┬─────────────────────┘
                  │
                  ▼
         ┌──────────────────────────────┐
         │  Server: Clear Cookies       │
         │  ✗ Delete all auth cookies   │
         └────────┬─────────────────────┘
                  │
                  ▼
         ┌──────────────────────────────┐
         │  Redirect to Login Page      │
         └──────────────────────────────┘
```

## 7. Storage Comparison

```
┌─────────────────────────────────────────────────────────┐
│                    TOKEN STORAGE                        │
└─────────────────────────────────────────────────────────┘

┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│  HttpOnly        │  │  localStorage    │  │  Zustand Store   │
│  Cookies         │  │                  │  │                  │
├──────────────────┤  ├──────────────────┤  ├──────────────────┤
│ Security: 🔒🔒🔒 │  │ Security: ⚠️⚠️   │  │ Security: ⚠️⚠️   │
│ XSS-Proof: ✓    │  │ XSS-Proof: ✗    │  │ XSS-Proof: ✗    │
│ Auto-Send: ✓    │  │ Auto-Send: ✗    │  │ Auto-Send: ✗    │
│ JS Access: ✗    │  │ JS Access: ✓    │  │ JS Access: ✓    │
│ Persist: ✓      │  │ Persist: ✓      │  │ Persist: ✓      │
│                  │  │                  │  │                  │
│ Use For:         │  │ Use For:         │  │ Use For:         │
│ - Server routes  │  │ - Client API     │  │ - React state    │
│ - Server actions │  │ - Direct calls   │  │ - Components     │
│ - Primary store  │  │ - Token source   │  │ - UI updates     │
└──────────────────┘  └──────────────────┘  └──────────────────┘
         │                     │                      │
         └─────────────────────┴──────────────────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │  ALL SYNCHRONIZED    │
                    │  via syncTokens()    │
                    └──────────────────────┘
```

## 8. Security Layers

```
┌─────────────────────────────────────────────────────────┐
│                    SECURITY LAYERS                       │
└─────────────────────────────────────────────────────────┘

Layer 1: HttpOnly Cookies (Primary Defense)
┌──────────────────────────────────────────────────────┐
│  ✓ Cannot be accessed by JavaScript                 │
│  ✓ Protected from XSS attacks                        │
│  ✓ Automatically sent with requests                  │
│  ✓ Secure flag in production (HTTPS only)            │
│  ✓ SameSite=lax (CSRF protection)                    │
└──────────────────────────────────────────────────────┘

Layer 2: Content Security Policy (CSP)
┌──────────────────────────────────────────────────────┐
│  ✓ Prevents inline script execution                  │
│  ✓ Restricts script sources                          │
│  ✓ Mitigates XSS risks for localStorage              │
└──────────────────────────────────────────────────────┘

Layer 3: Token Rotation
┌──────────────────────────────────────────────────────┐
│  ✓ New refresh token on each refresh                 │
│  ✓ Old refresh tokens invalidated                    │
│  ✓ Limits token theft impact                         │
└──────────────────────────────────────────────────────┘

Layer 4: Short Token Lifetimes
┌──────────────────────────────────────────────────────┐
│  ✓ Access token: 1 hour                              │
│  ✓ Refresh token: 30 days                            │
│  ✓ Automatic refresh reduces exposure                │
└──────────────────────────────────────────────────────┘

Layer 5: HTTPS Only (Production)
┌──────────────────────────────────────────────────────┐
│  ✓ Encrypted transmission                            │
│  ✓ Prevents man-in-the-middle attacks                │
│  ✓ Secure cookie flag enforced                       │
└──────────────────────────────────────────────────────┘
```

## Legend

```
✓ = Enabled/Available
✗ = Disabled/Not Available
⚠️ = Warning/Caution
🔒 = Security Feature
```
