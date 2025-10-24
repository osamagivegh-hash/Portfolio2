#!/bin/bash

# Render build script for portfolio backend
echo "🚀 Starting Render build process..."

# Navigate to backend directory
cd backend

# Install only production dependencies
echo "📦 Installing production dependencies..."
npm install --production --no-optional

# Create uploads directory if it doesn't exist
mkdir -p uploads

echo "✅ Build completed successfully!"
