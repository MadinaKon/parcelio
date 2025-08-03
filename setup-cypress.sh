#!/bin/bash

echo "🚀 Setting up Cypress with MailSlurp..."

# Check if API key is already set
if [ -n "$CYPRESS_MAILSLURP_API_KEY" ]; then
    echo "✅ CYPRESS_MAILSLURP_API_KEY is already set"
else
    echo "❌ CYPRESS_MAILSLURP_API_KEY is not set"
    echo ""
    echo "To get your MailSlurp API key:"
    echo "1. Go to https://app.mailslurp.com/sign-up/"
    echo "2. Create a free account"
    echo "3. Get your API key from the dashboard"
    echo ""
    echo "Then set the environment variable:"
    echo "export CYPRESS_MAILSLURP_API_KEY='your_api_key_here'"
    echo ""
    echo "Or add it to your ~/.bashrc or ~/.zshrc file for persistence"
    echo ""
fi

echo ""
echo "To run Cypress tests:"
echo "npm run cypress:open    # Open Cypress UI"
echo "npm run cypress:run     # Run tests in headless mode" 