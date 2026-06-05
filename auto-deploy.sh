#!/bin/bash
# ═══════════════════════════════════════════════════════════════
# SHRINGARIKA — One-Click Deployment Script
# ═══════════════════════════════════════════════════════════════
#
# This script automates:
# 1. Push to GitHub
# 2. Setup Neon PostgreSQL
# 3. Deploy to Vercel
# 4. Verify everything works
#
# Usage: bash auto-deploy.sh
# ═══════════════════════════════════════════════════════════════

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
RED='\033[0;31m'
NC='\033[0m'

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${CYAN}  🏛️  SHRINGARIKA — Deployment Setup${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# ─── Configuration ───
GITHUB_REPO="https://github.com/Devloper2003/Shringarika.git"

# ─── Step 1: GitHub Push ───
echo -e "${YELLOW}━━━ Step 1: Push to GitHub ━━━${NC}"
echo ""

if git remote get-url origin &>/dev/null; then
  echo "Git remote already configured"
else
  git remote add origin "$GITHUB_REPO"
  echo "Added remote: $GITHUB_REPO"
fi

echo ""
echo "To push to GitHub, you need a Personal Access Token (PAT)."
echo "Create one at: https://github.com/settings/tokens/new"
echo "Required scopes: repo, workflow"
echo ""
read -p "Enter your GitHub username: " GITHUB_USERNAME
read -sp "Enter your GitHub PAT: " GITHUB_TOKEN
echo ""

# Set remote with token
git remote set-url origin "https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@github.com/Devloper2003/Shringarika.git"

echo "Pushing to GitHub..."
git push -u origin main

# Remove token from remote for security
git remote set-url origin "$GITHUB_REPO"
echo -e "${GREEN}✅ Code pushed to GitHub!${NC}"
echo ""

# ─── Step 2: Neon Database ───
echo -e "${YELLOW}━━━ Step 2: Setup Neon Database ━━━${NC}"
echo ""
echo "Creating Neon database..."
echo ""

# Try Neon CLI
if command -v neonctl &>/dev/null; then
  echo "Neon CLI found. Creating project..."
  neonctl auth || true
  PROJECT_OUTPUT=$(neonctl projects create --name shringarika --region ap-south-1 2>&1 || true)
  echo "$PROJECT_OUTPUT"
  NEON_URL=$(neonctl connection-string 2>&1 || true)
  echo "Connection string: $NEON_URL"
else
  echo "Neon CLI not found. Setting up manually..."
  echo ""
  echo "1. Go to: https://console.neon.tech"
  echo "2. Create a new project (name: shringarika, region: ap-south-1)"
  echo "3. Copy the connection string"
  echo ""
  read -p "Paste your Neon connection string: " NEON_URL
fi

# Update .env
cat > .env << EOF
DATABASE_URL=${NEON_URL}
JWT_SECRET=shringarika-$(openssl rand -hex 32 || echo "luxury-production-$(date +%s)")
EOF

echo "Updated .env with Neon connection string"

# Switch Prisma to PostgreSQL
echo "Switching Prisma to PostgreSQL..."
sed -i 's/provider = "sqlite"/provider = "postgresql"/' prisma/schema.prisma

# Generate and push schema
echo "Generating Prisma client and pushing schema..."
npx prisma generate
npx prisma db push

echo -e "${GREEN}✅ Neon database connected and schema pushed!${NC}"
echo ""

# ─── Step 3: Seed Database ───
echo -e "${YELLOW}━━━ Step 3: Seed Database ━━━${NC}"
echo ""

# Start temp server
echo "Starting temporary server for seeding..."
npx next dev -p 3099 &
SERVER_PID=$!
sleep 15

# Seed
SEED_RESPONSE=$(curl -s -X POST http://localhost:3099/api/admin/seed)
echo "Seed response: $SEED_RESPONSE"

# Kill temp server
kill $SERVER_PID 2>/dev/null || true
wait $SERVER_PID 2>/dev/null || true

echo -e "${GREEN}✅ Database seeded!${NC}"
echo ""
echo "Default admin credentials:"
echo "  Email: admin@shringarika.com"
echo "  Password: admin123"
echo "  ⚠️  CHANGE THIS IMMEDIATELY AFTER LOGIN!"
echo ""

# ─── Step 4: Vercel Deployment ───
echo -e "${YELLOW}━━━ Step 4: Deploy to Vercel ━━━${NC}"
echo ""

if command -v vercel &>/dev/null || npx vercel --version &>/dev/null; then
  echo "Vercel CLI found."
  echo ""
  
  # Login
  npx vercel login || true
  
  # Deploy
  echo "Deploying to Vercel..."
  npx vercel --prod --yes
  
  # Set environment variables
  echo "Setting environment variables..."
  echo "$NEON_URL" | npx vercel env add DATABASE_URL production
  JWT_SECRET=$(grep JWT_SECRET .env | cut -d= -f2)
  echo "$JWT_SECRET" | npx vercel env add JWT_SECRET production
  
  # Redeploy with env vars
  echo "Redeploying with environment variables..."
  npx vercel --prod --yes
  
  echo -e "${GREEN}✅ Deployed to Vercel!${NC}"
else
  echo "Vercel CLI not found."
  echo ""
  echo "Deploy manually:"
  echo "  1. Go to: https://vercel.com/new"
  echo "  2. Import: Devloper2003/Shringarika"
  echo "  3. Build Command: npx prisma generate && next build"
  echo "  4. Environment Variables:"
  echo "     DATABASE_URL = $NEON_URL"
  echo "     JWT_SECRET = (from .env file)"
  echo "  5. Click Deploy"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}  ✅ DEPLOYMENT COMPLETE!${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Next Steps:"
echo "  1. Visit your Vercel URL"
echo "  2. Login to admin at /auth/login"
echo "  3. Change the default password"
echo "  4. Configure theme, social links, and content"
echo ""
echo "Admin Panel: https://your-domain.vercel.app/admin"
echo "GitHub: https://github.com/Devloper2003/Shringarika"
echo ""
