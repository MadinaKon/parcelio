#!/bin/bash

echo "🚀 Setting up environment variables for Parcelio..."

# Check if .env.local exists
if [ -f ".env.local" ]; then
    echo "✅ .env.local file already exists"
else
    echo "❌ .env.local file not found"
    echo ""
    echo "Creating .env.local file..."
    
    # Generate a random secret
    SECRET=$(openssl rand -base64 32)
    
    cat > .env.local << EOF
# NextAuth Configuration
NEXTAUTH_SECRET=$SECRET
NEXTAUTH_URL=http://localhost:3000

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/parcelio

# Email Configuration (Required for email sign-in)
# For Gmail SMTP:
# EMAIL_SERVER_HOST=smtp.gmail.com
# EMAIL_SERVER_PORT=587
# EMAIL_SERVER_USER=your-email@gmail.com
# EMAIL_SERVER_PASSWORD=your-app-password
# EMAIL_FROM=noreply@yourdomain.com

# OAuth Providers (Optional)
# GITHUB_ID=your-github-client-id
# GITHUB_SECRET=your-github-client-secret
# GOOGLE_CLIENT_ID=your-google-client-id
# GOOGLE_CLIENT_SECRET=your-google-client-secret

EOF

    echo "✅ .env.local file created with default values"
    echo ""
    echo "⚠️  IMPORTANT: You need to configure the email settings manually!"
    echo "   - Uncomment and fill in the email configuration"
    echo "   - For Gmail: Use an App Password, not your regular password"
    echo "   - For testing: Use MailSlurp (already configured)"
    echo ""
fi

echo ""
echo "📋 Next steps:"
echo "1. Edit .env.local and configure email settings"
echo "2. Start MongoDB: brew services start mongodb-community"
echo "3. Start the development server: npm run dev"
echo "4. Test the application"
echo ""
