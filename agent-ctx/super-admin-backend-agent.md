# Task: Super Admin Backend Features

## Summary

All backend features for the Super Admin system have been implemented successfully.

## Changes Made

### 1. Prisma Schema (`prisma/schema.prisma`)
- Added `permissions` (String?) field to User model — stores JSON permission flags
- Added `encryptedData` (String?) field to User model — E2E encrypted personal data
- Added `dataIv` (String?) field to User model — AES initialization vector
- Added `staffPermission` (StaffPermission?) relation to User model
- Created new `StaffPermission` model with 9 granular permission boolean fields:
  - canAccessDashboard (default: true)
  - canManageBlogs (default: false)
  - canManageProducts (default: false)
  - canViewInquiries (default: false)
  - canManageAppointments (default: false)
  - canManageGallery (default: false)
  - canViewUsers (default: false, super admin only)
  - canManageSettings (default: false, super admin only)
  - canChangePassword (default: true)
- Ran `npx prisma db push` — database synced successfully

### 2. Encryption Utility (`src/lib/encryption.ts`)
- AES-256-CBC encryption with scrypt key derivation
- `encryptData()` — encrypts plaintext, returns {encrypted, iv}
- `decryptData()` — decrypts using IV and ciphertext
- `encryptUserData()` — encrypts {phone, address, measurements} object
- `decryptUserData()` — decrypts and parses user data object

### 3. Super Admin Password Change API (`src/app/api/admin/change-password/route.ts`)
- POST endpoint, super_admin only
- Validates current password, enforces 6-char minimum on new password
- Uses comparePassword and hashPassword from auth lib

### 4. Staff Permissions API (`src/app/api/admin/permissions/route.ts`)
- GET — lists all staff permissions with user info (super_admin only)
- POST — upsert staff permissions (super_admin only)
- Also updates User.permissions JSON field for quick lookup

### 5. Individual Staff Permissions API (`src/app/api/admin/permissions/[userId]/route.ts`)
- GET — fetch permissions for a specific user (super_admin only)
- DELETE — reset/remove permissions for a user (super_admin only)

### 6. Updated Users API (`src/app/api/admin/users/route.ts`)
- Added `encryptedData` and `dataIv` to select fields
- Added `decrypt` query parameter support
- When `decrypt=true`, decrypts user sensitive data using decryptUserData
- Returns `decryptedInfo` field with decrypted data or null

## Verification
- All API endpoints respond correctly (return 401 without auth as expected)
- Prisma schema pushed to database successfully
- Dev server running without errors
