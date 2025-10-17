# Serenity Tides Helper Scripts

This directory contains automation scripts and utilities for managing the Serenity Tides website.

## Philosophy

**Helper scripts are SOPs at the next level** - they're executable documentation that:
- Reduce human error
- Save time on repetitive tasks
- Ensure consistency across operations
- Serve as living documentation
- Are version-controlled alongside code

## Directory Structure

```
scripts/
├── README.md                 # This file
├── contentful/              # Contentful CMS management scripts
│   ├── README.md
│   ├── update-team-images.js
│   └── setup-content-types.js
└── deployment/              # Deployment and testing scripts (future)
```

## Prerequisites

All scripts require:
- Node.js 22+ installed
- Contentful Management Token stored in PAM system (`~/.manus_credentials/contentful_mgmt_token.enc`)
- Environment variables from `.env.local`

## Usage

Each subdirectory has its own README with specific usage instructions.

## Contributing

When adding new scripts:
1. Place in appropriate subdirectory
2. Add clear comments and error handling
3. Update the relevant README
4. Test thoroughly before committing
5. Follow existing naming conventions

## Naming Conventions

- Use kebab-case for filenames: `update-team-images.js`
- Use descriptive names that indicate purpose
- Prefix with action verb: `setup-`, `update-`, `deploy-`, etc.

## Security

⚠️ **NEVER commit credentials or API keys to scripts!**
- Use environment variables
- Use the PAM system for sensitive data
- Add `.env*` files to `.gitignore`

---

**Last Updated:** October 16, 2025  
**Maintainer:** Manus AI Agent

