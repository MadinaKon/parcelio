# Cypress Setup with MailSlurp

This guide will help you set up Cypress with MailSlurp for email testing in your Parcelio application.

## Prerequisites

1. **MailSlurp Account**: You need a free MailSlurp account
2. **Node.js**: Make sure you have Node.js installed
3. **Next.js Development Server**: Your application should be running

## Setup Steps

### 1. Get MailSlurp API Key

1. Go to [https://app.mailslurp.com/sign-up/](https://app.mailslurp.com/sign-up/)
2. Create a free account
3. Navigate to the dashboard
4. Copy your API key

### 2. Configure Environment Variables

You have several options to set the API key:

#### Option A: Environment Variable (Recommended)
```bash
export CYPRESS_MAILSLURP_API_KEY="your_actual_api_key_here"
```

#### Option B: Cypress Environment File
The `cypress.env.json` file is already configured with your API key.

#### Option C: Add to Shell Profile (Permanent)
Add this line to your `~/.bashrc` or `~/.zshrc`:
```bash
export CYPRESS_MAILSLURP_API_KEY="your_actual_api_key_here"
```

### 3. Start the Development Server

Before running Cypress tests, make sure your Next.js development server is running:

```bash
npm run dev
```

### 4. Run Cypress Tests

#### Open Cypress UI
```bash
npm run cypress:open
```

#### Run Tests Headlessly
```bash
npm run cypress:run
```

## Troubleshooting

### "MailSlurp API Key not found" Error
- Make sure you've set the `CYPRESS_MAILSLURP_API_KEY` environment variable
- Check that the API key is valid and not expired
- Verify the API key in your MailSlurp dashboard

### "Development server not running" Error
- Start the Next.js development server with `npm run dev`
- Make sure it's running on `http://localhost:3000`

### "User not found for API KEY" Error
- Your API key might be invalid or expired
- Check your MailSlurp account status
- Generate a new API key if necessary

## Test Structure

The current test setup:
- Creates a temporary email inbox using MailSlurp
- Visits the signin page
- Uses the generated email address for testing
- Handles graceful skipping when services are unavailable

## Files Modified

- `cypress.config.ts` - Cypress configuration with baseUrl and environment setup
- `cypress/e2e/spec.cy.ts` - Test file with MailSlurp integration
- `cypress.env.json` - Environment variables for Cypress
- `package.json` - Added Cypress scripts
- `setup-cypress.sh` - Setup helper script

## Next Steps

1. Customize the test logic in `cypress/e2e/spec.cy.ts`
2. Add more test cases for different scenarios
3. Set up CI/CD pipeline with proper environment variables
4. Consider using MailSlurp's waitForLatestEmail functionality for email verification tests 