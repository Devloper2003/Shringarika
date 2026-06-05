# 🏛️ SHRINGARIKA — Deployment Guide

## House of Shringarika — Luxury Bridal & Couture

### Complete guide to push to GitHub, connect Neon database, and deploy on Vercel

---

## 📋 Prerequisites

Before starting, make sure you have:
- [GitHub account](https://github.com) with access to `Devloper2003/Shringarika` repo
- [Neon account](https://console.neon.tech) (free tier works)
- [Vercel account](https://vercel.com) (free tier works)
- Node.js 18+ and npm/bun installed locally

---

## Step 1: Push to GitHub

### Option A: From this machine (if you have GitHub access)

```bash
# Create a GitHub Personal Access Token
# Go to: https://github.com/settings/tokens
# Create new token with scopes: repo, workflow

# Set remote with token
git remote set-url origin https://<YOUR_USERNAME>:<YOUR_TOKEN>@github.com/Devloper2003/Shringarika.git

# Push to GitHub
git push -u origin main

# Remove token from remote URL for security
git remote set-url origin https://github.com/Devloper2003/Shringarika.git
```

### Option B: From your local machine

```bash
# Clone the existing repo
git clone https://github.com/Devloper2003/Shringarika.git
cd Shringarika

# Copy all project files from this server into the cloned repo
# Then:
git add -A
git commit -m "feat: Complete Shringarika website with Super Admin Panel"
git push origin main
```

---

## Step 2: Create Neon PostgreSQL Database

### Option A: Via Neon Console (Recommended)

1. Go to [https://console.neon.tech](https://console.neon.tech)
2. Sign up / Log in with GitHub
3. Click **"New Project"**
4. Name: `shringarika`
5. Region: Select closest to your users (e.g., `ap-south-1` for India)
6. Click **"Create Project"**
7. Copy the **connection string** (looks like):
   ```
   postgresql://shringarika:xxxx@ep-cool-name-12345.ap-south-1.aws.neon.tech/neondb?sslmode=require
   ```

### Option B: Via Neon CLI

```bash
# Install Neon CLI
npm install -g neonctl

# Authenticate
neonctl auth

# Create project
neonctl projects create --name shringarika --region ap-south-1

# Get connection string
neonctl connection-string
```

---

## Step 3: Set Up Database Schema

Once you have the Neon connection string:

```bash
# Set the DATABASE_URL environment variable
export DATABASE_URL="postgresql://shringarika:xxxx@ep-cool-name-12345.ap-south-1.aws.neon.tech/neondb?sslmode=require"

# IMPORTANT: Switch Prisma to PostgreSQL provider
# In prisma/schema.prisma, change:
#   provider = "sqlite"
# to:
#   provider = "postgresql"

# Generate Prisma client
npx prisma generate

# Push schema to Neon database
npx prisma db push

# Seed the database with default data
# Start the dev server temporarily
bun run dev &
sleep 10

# Seed via API
curl -X POST http://localhost:3000/api/admin/seed

# Stop the dev server
kill %1
```

Default super admin credentials:
- **Email**: `admin@shringarika.com`
- **Password**: `admin123`
- ⚠️ **CHANGE THIS PASSWORD IMMEDIATELY** after first login!

---

## Step 4: Deploy to Vercel

### Option A: Via Vercel Dashboard (Easiest)

1. Go to [https://vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Select `Devloper2003/Shringarika`
4. Configure:
   - **Framework Preset**: Next.js
   - **Build Command**: `npx prisma generate && next build`
   - **Output Directory**: `.next`
5. Add **Environment Variables**:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | `postgresql://shringarika:xxxx@ep-cool-name-12345.ap-south-1.aws.neon.tech/neondb?sslmode=require` |
| `JWT_SECRET` | (generate a secure random string) |

6. Click **"Deploy"**
7. After deployment, visit your Vercel URL

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod

# Set environment variables
vercel env add DATABASE_URL production
vercel env add JWT_SECRET production

# Redeploy with env vars
vercel --prod
```

---

## Step 5: Post-Deployment Setup

### 1. Change Admin Password
1. Go to `https://your-domain.vercel.app/auth/login`
2. Login with: `admin@shringarika.com` / `admin123`
3. Go to Settings → Change Password
4. Set a strong new password

### 2. Configure Theme
1. Go to `/admin/theme`
2. The "Classic Rose Gold" theme is already active
3. You can customize colors, fonts, and effects
4. Create additional themes and switch between them

### 3. Set Up Social Media Links
1. Go to `/admin/social`
2. Add your actual social media URLs
3. Toggle "Show in Footer/Header" as needed
4. Use the "Optimize" tab for Open Graph and SEO settings

### 4. Upload Media Content
1. Go to `/admin/media`
2. Upload your portfolio images, hero images, product photos
3. Set categories and featured flags

### 5. Edit Page Content
1. Go to `/admin/content`
2. Select page tabs (Home, About, Collections, etc.)
3. Edit section titles, subtitles, and content
4. Add images to sections

### 6. Generate AI Reports
1. Go to `/admin/ai-reports`
2. Click "Generate Report"
3. Choose type (Analytics, SEO, Content, Social, Performance, Custom)
4. Enter your prompt and generate
5. View, bookmark, and manage reports

---

## 🔧 Admin Panel Features

| Feature | Path | Description |
|---------|------|-------------|
| Dashboard | `/admin` | Overview stats, recent inquiries, appointments |
| Blog Posts | `/admin/blogs` | Create and manage blog articles |
| Products | `/admin/products` | Manage product catalog |
| Inquiries | `/admin/inquiries` | View and respond to customer inquiries |
| Appointments | `/admin/appointments` | Manage appointment bookings |
| Gallery | `/admin/gallery` | Gallery image management |
| **Content** | `/admin/content` | ✨ NEW - Edit all page sections from admin |
| **Media Library** | `/admin/media` | ✨ NEW - Upload and manage photos/content |
| **Theme** | `/admin/theme` | ✨ NEW - Live theme editor with color pickers |
| **Social Media** | `/admin/social` | ✨ NEW - Link & optimize social accounts |
| **AI Reports** | `/admin/ai-reports` | ✨ NEW - Generate AI-powered website reports |
| Users | `/admin/users` | User management |
| Permissions | `/admin/permissions` | Staff permission management |
| Settings | `/admin/settings` | Site-wide settings |

---

## 🌐 Production Checklist

- [ ] Change super admin password from default
- [ ] Set up Neon database connection
- [ ] Deploy to Vercel with correct env vars
- [ ] Upload real product/portfolio images
- [ ] Update social media links with actual URLs
- [ ] Customize theme colors if needed
- [ ] Add real page content via Content Management
- [ ] Test all forms (contact, appointments, inquiries)
- [ ] Verify all pages load correctly
- [ ] Set up Google Analytics (via Settings → SEO)
- [ ] Add custom domain in Vercel dashboard
- [ ] Test mobile responsiveness

---

## 🚨 Important Notes

1. **Prisma Provider**: For local dev, the schema uses SQLite. For production (Neon), change to `postgresql`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

2. **Environment Variables**: Never commit `.env` files. The `.env.example` file shows what's needed.

3. **Database Seeding**: The seed route (`/api/admin/seed`) should be called once after setting up the database.

4. **AI Reports**: The AI report feature uses the `z-ai-web-dev-sdk` which is pre-configured. No additional API keys needed.

5. **File Uploads**: Uploaded files go to `/public/uploads/`. For production, consider using a cloud storage service (AWS S3, Cloudinary, etc.) for better performance.

---

## 📞 Support

- GitHub Repo: https://github.com/Devloper2003/Shringarika
- Neon Docs: https://neon.tech/docs
- Vercel Docs: https://vercel.com/docs
