#!/bin/bash

echo "🚀 Starting optimized Render deployment..."

# Remove frontend dependencies to save memory
echo "🧹 Cleaning up frontend dependencies..."
rm -rf node_modules
rm -rf src
rm -rf public
rm -f package-lock.json

# Navigate to backend
cd backend

# Install only production dependencies
echo "📦 Installing backend production dependencies..."
npm install --production --no-optional --no-audit --no-fund

# Create uploads directory
mkdir -p uploads

echo "✅ Backend deployment ready!"
echo "🎯 Starting server..."
npm start
