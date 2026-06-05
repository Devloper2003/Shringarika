# Task: User Authentication System for House of Shringarika

## Summary
Created a complete user authentication system for the luxury fashion website "House of Shringarika" with JWT-based auth, API routes, and luxury-styled frontend pages.

## Files Created/Modified

### Backend
1. **`/src/lib/auth.ts`** — Auth utility library
   - `hashPassword()` — SHA-256 with salt
   - `comparePassword()` — Verify password against hash
   - `createToken()` — Base64-encoded JWT-like token with HMAC signature
   - `verifyToken()` — Decode and verify token with expiration check

2. **`/src/app/api/auth/register/route.ts`** — POST handler
   - Validates name, email format, password min 6 chars
   - Checks for duplicate emails (409)
   - Hashes password, creates user with role "user"
   - Returns user data + token

3. **`/src/app/api/auth/login/route.ts`** — POST handler
   - Validates email/password
   - Checks user exists and is active
   - Compares password hash
   - Returns user data + token

4. **`/src/app/api/auth/me/route.ts`** — GET handler
   - Extracts Bearer token from Authorization header
   - Verifies token and fetches user data
   - Includes order count, wishlist count
   - Excludes password

### Frontend
5. **`/src/app/auth/login/page.tsx`** — Luxury login page
   - Dark bg-noir background with decorative circles
   - "SHRINGARIKA" logo with font-cinzel
   - "Welcome Back" heading with font-cormorant
   - Email/password inputs with border-b style
   - Show/hide password toggle
   - "Sign In" button with bg-zari-gold
   - Error display, loading spinner
   - Link to register page

6. **`/src/app/auth/register/page.tsx`** — Luxury register page
   - Same dark theme as login
   - "Join the House" heading
   - Name, email, phone (optional), password fields
   - "Create Account" button
   - Link to login page

7. **`/src/app/account/page.tsx`** — Account dashboard
   - Token check on mount, redirects to /auth/login if missing
   - Fetches user data from /api/auth/me
   - Profile card with avatar, name, email, phone, join date
   - Quick stats (orders, wishlist counts)
   - Tabbed content: My Orders, My Wishlist, My Measurements
   - Address section under Measurements tab
   - Edit Profile and Sign Out buttons
   - Sticky footer with bg-noir

### Modified
8. **`/src/components/shringarika/Header.tsx`** — Added Account link
   - User icon + "Account" text in desktop nav
   - Account link in mobile menu overlay

## Testing
All API routes tested and working:
- ✅ Register: creates user, returns token
- ✅ Login: authenticates, returns token
- ✅ Me: returns user data with valid token
- ✅ Duplicate email: returns 409
- ✅ Wrong password: returns 401
- ✅ Invalid email format: returns 400
- ✅ Short password: returns 400
- ✅ No auth header: returns 401
- ✅ Invalid token: returns 401
- ✅ All pages return 200
- ✅ ESLint passes with no errors
