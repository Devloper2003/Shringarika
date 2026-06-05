#!/bin/bash
# Switch Prisma schema from SQLite to PostgreSQL for production deployment
# This script is used before deploying to Vercel with Neon database

SCHEMA_FILE="prisma/schema.prisma"

if [ -z "$DATABASE_URL" ]; then
  echo "⚠️  DATABASE_URL not set. Please set it to your Neon connection string."
  echo "   export DATABASE_URL=postgresql://user:pass@host/db?sslmode=require"
  exit 1
fi

# Switch provider to postgresql
if [[ "$DATABASE_URL" == postgresql://* ]] || [[ "$DATABASE_URL" == postgres://* ]]; then
  echo "🔄 Switching Prisma provider to PostgreSQL..."
  sed -i 's/provider = "sqlite"/provider = "postgresql"/' "$SCHEMA_FILE"
  echo "✅ Provider switched to PostgreSQL"
  
  # Generate and push
  npx prisma generate
  npx prisma db push
  
  echo "✅ Schema pushed to Neon database"
else
  echo "ℹ️  DATABASE_URL is not PostgreSQL, keeping SQLite provider"
fi
