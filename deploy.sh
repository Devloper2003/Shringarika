#!/bin/bash
# ═══════════════════════════════════════════════════════════════
# SHRINGARIKA - Deployment Script
# House of Shringarika — Luxury Bridal & Couture
# ═══════════════════════════════════════════════════════════════
#
# This script helps you:
# 1. Push code to GitHub
# 2. Create Neon PostgreSQL database
# 3. Deploy to Vercel
#
# Usage: bash deploy.sh
# ═══════════════════════════════════════════════════════════════

set -e

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  SHRINGARIKA — Deployment Setup"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# ─── Colors ───
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# ─── Step 1: GitHub Push ───
echo -e "${YELLOW}Step 1: Push to GitHub${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Repository: https://github.com/Devloper2003/Shringarika.git"
echo ""

# Check if GitHub CLI is installed
if command -v gh &> /dev/null; then
  echo "GitHub CLI found. Attempting authentication..."
  gh auth status || gh auth login
  git push -u origin main
  echo -e "${GREEN}✓ Code pushed to GitHub!${NC}"
else
  echo "GitHub CLI not found. Using git credentials..."
  echo ""
  echo "You need a GitHub Personal Access Token (PAT)."
  echo "Create one at: https://github.com/settings/tokens"
  echo "Required scopes: repo, workflow"
  echo ""
  read -p "Enter your GitHub username: " GITHUB_USERNAME
  read -p "Enter your GitHub Personal Access Token: " GITHUB_TOKEN
  
  # Set remote with token
  git remote set-url origin "https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@github.com/Devloper2003/Shringarika.git"
  git push -u origin main
  echo -e "${GREEN}✓ Code pushed to GitHub!${NC}"
  
  # Remove token from remote URL for security
  git remote set-url origin "https://github.com/Devloper2003/Shringarika.git"
fi

echo ""
echo ""

# ─── Step 2: Neon Database Setup ───
echo -e "${YELLOW}Step 2: Neon PostgreSQL Database Setup${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "You need a Neon database. Options:"
echo ""
echo "Option A: Create via Neon Console (Recommended)"
echo "  1. Go to: https://console.neon.tech"
echo "  2. Sign up / Log in"
echo "  3. Create a new project (name: shringarika)"
echo "  4. Select region closest to your users"
echo "  5. Copy the connection string"
echo ""
echo "Option B: Use Neon CLI"
echo "  1. Install: npm install -g neonctl"
echo "  2. Login: neonctl auth"
echo "  3. Create: neonctl projects create --name shringarika"
echo "  4. Get connection string: neonctl connection-string"
echo ""
read -p "Paste your Neon connection string: " NEON_CONNECTION_STRING

# Update .env file
cat > .env << EOF
DATABASE_URL=${NEON_CONNECTION_STRING}
JWT_SECRET=shringarika-luxury-production-secret-$(openssl rand -hex 16)
EOF

echo ""
echo "Generating Prisma client and pushing schema to Neon..."
npx prisma generate
npx prisma db push

echo -e "${GREEN}✓ Database connected and schema pushed!${NC}"
echo ""
echo ""

# ─── Step 3: Seed the Database ───
echo -e "${YELLOW}Step 3: Seed Database with Default Data${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Start the dev server temporarily to seed
echo "Starting server to seed database..."
bun run dev &
SERVER_PID=$!
sleep 10

# Seed via API
TOKEN=""
# First, we need to create a super admin user
echo "Creating super admin user..."
SEED_RESPONSE=$(curl -s -X POST http://localhost:3000/api/admin/seed)
echo "Seed response: $SEED_RESPONSE"

# Kill the dev server
kill $SERVER_PID 2>/dev/null || true

echo -e "${GREEN}✓ Database seeded!${NC}"
echo ""
echo ""

# ─── Step 4: Vercel Deployment ───
echo -e "${YELLOW}Step 4: Deploy to Vercel${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if command -v vercel &> /dev/null || npx vercel --version &> /dev/null; then
  echo "Vercel CLI found."
  echo ""
  read -p "Do you want to deploy now? (y/n): " DEPLOY_NOW
  
  if [ "$DEPLOY_NOW" = "y" ] || [ "$DEPLOY_NOW" = "Y" ]; then
    # Login to Vercel
    npx vercel login
    
    # Deploy to production
    npx vercel --prod
    
    # Set environment variables
    echo ""
    echo "Setting environment variables on Vercel..."
    npx vercel env add DATABASE_URL production <<< "${NEON_CONNECTION_STRING}"
    npx vercel env add JWT_SECRET production <<< "$(grep JWT_SECRET .env | cut -d= -f2)"
    
    echo -e "${GREEN}✓ Deployed to Vercel!${NC}"
  fi
else
  echo "Vercel CLI not found. Install with: npm install -g vercel"
  echo ""
  echo "Alternative: Deploy via Vercel Dashboard"
  echo "  1. Go to: https://vercel.com/new"
  echo "  2. Import the GitHub repository: Devloper2003/Shringarika"
  echo "  3. Set environment variables:"
  echo "     - DATABASE_URL: ${NEON_CONNECTION_STRING}"
  echo "     - JWT_SECRET: (from .env file)"
  echo "  4. Click Deploy"
fi

echo ""
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}  ✓ Deployment Complete!${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Next Steps:"
echo "  1. Visit your Vercel URL to see the website"
echo "  2. Go to /auth/login to access the admin panel"
echo "  3. Default super admin credentials will be shown after seeding"
echo "  4. Change the default password immediately!"
echo ""
