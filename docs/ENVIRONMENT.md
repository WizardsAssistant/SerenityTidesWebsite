# Environment Configuration

This document explains how to configure environment variables and settings for the Serenity Tides website.

## 🔧 Environment Variables

### Required Variables

#### Contentful CMS Configuration
```bash
# Contentful Space ID - identifies your Contentful space
CONTENTFUL_SPACE_ID=your_space_id_here

# Contentful Access Token - API key for content delivery
CONTENTFUL_ACCESS_TOKEN=your_access_token_here

# Contentful Environment (optional, defaults to 'master')
CONTENTFUL_ENVIRONMENT=master
```

### Optional Variables

#### Development Configuration
```bash
# Node environment (development, production, test)
NODE_ENV=development

# Custom port for development server (defaults to 9002)
PORT=9002

# Enable/disable TypeScript build errors (defaults to true)
TYPESCRIPT_IGNORE_BUILD_ERRORS=true
```

## 📁 Environment Files

### Local Development (.env.local)
Create a `.env.local` file in the project root for local development:

```bash
# .env.local (not committed to version control)
CONTENTFUL_SPACE_ID=your_development_space_id
CONTENTFUL_ACCESS_TOKEN=your_development_access_token
CONTENTFUL_ENVIRONMENT=master
NODE_ENV=development
```

### Environment File Priority
Next.js loads environment variables in this order:
1. `.env.local` (always loaded, ignored by git)
2. `.env.development` (when NODE_ENV=development)
3. `.env.production` (when NODE_ENV=production)
4. `.env` (default)

## 🔒 Security Best Practices

### Environment Variable Security
- ✅ **DO**: Store sensitive data in environment variables
- ✅ **DO**: Use different credentials for development and production
- ✅ **DO**: Validate required environment variables at startup
- ❌ **DON'T**: Commit `.env.local` or any file with real credentials
- ❌ **DON'T**: Use production credentials in development

### Validation Example
```typescript
// lib/env-validation.ts
const requiredEnvVars = {
  CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
  CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
} as const;

// Validate at startup
Object.entries(requiredEnvVars).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

export const env = requiredEnvVars;
```

## 🌐 Deployment Environments

### Netlify Configuration
Environment variables are configured in the Netlify dashboard:

1. Go to Site Settings → Environment Variables
2. Add the required variables:
   - `CONTENTFUL_SPACE_ID`
   - `CONTENTFUL_ACCESS_TOKEN`
   - `CONTENTFUL_ENVIRONMENT`

### Production Environment
```bash
# Production environment variables (set in Netlify dashboard)
CONTENTFUL_SPACE_ID=production_space_id
CONTENTFUL_ACCESS_TOKEN=production_access_token
CONTENTFUL_ENVIRONMENT=master
NODE_ENV=production
```

## 🧪 Testing Environment

### Test Configuration
```bash
# Test environment variables
NODE_ENV=test
CONTENTFUL_SPACE_ID=test-space-id
CONTENTFUL_ACCESS_TOKEN=test-access-token
```

### Jest Environment Setup
The Jest configuration automatically sets up test environment variables:

```javascript
// jest.setup.js
process.env.CONTENTFUL_SPACE_ID = 'test-space-id';
process.env.CONTENTFUL_ACCESS_TOKEN = 'test-access-token';
process.env.CONTENTFUL_ENVIRONMENT = 'master';
```

## 📋 Environment Setup Checklist

### For New Developers
- [ ] Clone the repository
- [ ] Copy `.env.example` to `.env.local` (if available)
- [ ] Request development Contentful credentials from team lead
- [ ] Add credentials to `.env.local`
- [ ] Run `npm run dev` to verify setup
- [ ] Confirm site loads with content

### For Deployment
- [ ] Set up production Contentful space
- [ ] Configure environment variables in deployment platform
- [ ] Test deployment with production credentials
- [ ] Verify fallback system works if CMS is unavailable

## 🔍 Troubleshooting

### Common Issues

#### "Missing required environment variable" Error
```bash
Error: Missing required environment variable: CONTENTFUL_SPACE_ID
```
**Solution**: Add the missing variable to your `.env.local` file or deployment environment.

#### Content Not Loading
If content isn't loading from Contentful:
1. Check environment variables are set correctly
2. Verify Contentful credentials are valid
3. Confirm Contentful space has published content
4. Check network connectivity to Contentful API

#### Fallback Content Showing
If you see fallback content instead of CMS content:
1. Check Contentful environment variables
2. Verify API token has correct permissions
3. Check Contentful space ID is correct
4. Review browser network tab for API errors

### Debug Commands
```bash
# Check environment variables are loaded
npm run dev
# Look for "Environment variables loaded" in console

# Test Contentful connection
curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  "https://cdn.contentful.com/spaces/YOUR_SPACE_ID/entries"
```

## 📚 Additional Resources

### Contentful Setup
1. Create a Contentful account at https://contentful.com
2. Create a new space for your project
3. Set up content models (Events, Team Members, etc.)
4. Generate API keys in Settings → API keys
5. Use Content Delivery API token (not Content Management API)

### Next.js Environment Variables
- [Next.js Environment Variables Documentation](https://nextjs.org/docs/basic-features/environment-variables)
- [Environment Variable Loading Order](https://nextjs.org/docs/basic-features/environment-variables#environment-variable-load-order)

---

*Need help? Check the troubleshooting section or contact the development team.*

