# User & Payment Flow Architecture

## 🏗️ Clean, Clerk-First Design

This app uses a **single source of truth** for user identity: **Clerk**.  
All users MUST be created through Clerk authentication. Payment webhooks only update existing users.

## ✅ How It Works

### Step 1: User Signs Up

```
User signs up with Clerk
    ↓
Clerk webhook fires
    ↓
Creates user in database:
  - clerkId ✓
  - email ✓
  - name ✓
  - status: "free"
  - priceId: null
```

**File**: `src/app/api/webhook/register/route.ts`

### Step 2: User Makes Payment

```
User clicks "Choose Plan"
    ↓
Stripe checkout (includes clerkId in metadata)
    ↓
Payment succeeds
    ↓
Stripe webhook fires
    ↓
UPDATES existing user:
  - customerID ✓
  - priceId ✓
  - status: "active"
```

**File**: `src/lib/payments.ts` → `updateUserWithPaymentInfo()`

### Step 3: User Uploads PDF

```
User uploads PDF
    ↓
UploadThing processes file
    ↓
Background: AI generates summary
    ↓
Summary saved with userId (linked to clerkId)
    ↓
Dashboard shows all user's summaries
```

**File**: `src/actions/summary.ts`, `src/app/api/uploadthing/core.ts`

## 🔒 Key Security Features

1. **No orphaned users** - Every user has a Clerk ID
2. **Payment requires auth** - Can't pay without signing up first
3. **One email = one user** - No duplicate records
4. **Summaries protected** - Linked to authenticated user only

## 📊 Database Flow

```
┌─────────────┐
│   Clerk     │ (Authentication)
└──────┬──────┘
       │ creates
       ▼
┌─────────────┐
│    users    │
│  clerkId ✓  │
└──────┬──────┘
       │
       ├──────► Stripe updates (adds customerID, priceId)
       │
       └──────► summaries (userId references users.id)
```

## 🚫 What We Prevent

❌ Users without Clerk ID  
❌ Duplicate user records  
❌ Payment without signup  
❌ Summaries linked to wrong user

## 💡 Why This Design?

**Before (problematic)**:

- Stripe webhook created users → No Clerk ID
- Clerk webhook created users → No payment info
- Result: 2 users per email, summaries on wrong account

**After (clean)**:

- Only Clerk creates users
- Stripe only updates existing users
- Result: 1 user per email, everything linked correctly

## 🧪 Testing Checklist

- [ ] Sign up new account → User created with clerkId
- [ ] Make payment → User updated with priceId and status="active"
- [ ] Check navbar → Shows correct plan name
- [ ] Upload PDF → Summary appears in dashboard
- [ ] Log out & back in → Still see all summaries
- [ ] Check database → Only one user record per email

## 🔧 Database Schema

```typescript
users {
  id               serial primary key
  clerkId          varchar(255) NOT NULL UNIQUE  // From Clerk
  email            varchar(255) NOT NULL UNIQUE
  name             varchar(255) NOT NULL
  image            varchar(512)
  customerID       varchar(255) UNIQUE           // From Stripe
  priceId          varchar(255)                  // From Stripe
  status           varchar(50) DEFAULT 'free'    // 'free', 'active', 'cancelled'
  createdAt        timestamp DEFAULT now()
  updatedAt        timestamp DEFAULT now()
}

summaries {
  id               serial primary key
  userId           integer REFERENCES users(id)
  fileName         varchar(255) NOT NULL
  originFileUrl    varchar(512) NOT NULL
  summaryText      text NOT NULL
  status           varchar(50) DEFAULT 'processing'
  title            varchar(255)
  createdAt        timestamp DEFAULT now()
  updatedAt        timestamp DEFAULT now()
}
```

## 📝 Important Notes

1. **Users must sign up before paying** - Payment webhook expects existing user
2. **All webhooks are protected** - Verified via webhook signatures
3. **No manual user creation needed** - Everything automated via webhooks
4. **Dashboard is server-side rendered** - Always shows fresh data

## 🎯 Benefits

✅ Single source of truth (Clerk)  
✅ No race conditions  
✅ Easy to debug  
✅ Secure by default  
✅ Scales cleanly
