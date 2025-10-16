# Deployment Infrastructure

This document describes the deployment infrastructure and automation for the Serenity Tides website.

---

## Overview

The Serenity Tides website uses a **continuous deployment** workflow that automatically publishes content changes from Contentful CMS to the live website.

**Tech Stack**:
- **Hosting**: Netlify
- **CMS**: Contentful
- **Framework**: Next.js (Static Site Generation)
- **Automation**: Webhooks

---

## Deployment Flow

```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐      ┌──────────────┐
│  Contentful │─────▶│   Webhook    │─────▶│   Netlify   │─────▶│  Live Site   │
│     CMS     │      │   Trigger    │      │   Build     │      │   Updated    │
└─────────────┘      └──────────────┘      └─────────────┘      └──────────────┘
   (Publish)         (Auto-trigger)         (Rebuild)            (1-3 minutes)
```

### Step-by-Step:

1. **Content Editor** makes changes in Contentful CMS
2. **Content Editor** clicks "Publish changes"
3. **Contentful** fires webhook to Netlify build hook
4. **Netlify** automatically rebuilds the site
5. **Next.js** fetches fresh content from Contentful API during build
6. **Netlify** deploys the updated static site
7. **Changes go live** (typically 1-3 minutes after publish)

---

## Webhook Configuration

### Netlify Build Hook

**Created**: October 16, 2025  
**Name**: Contentful Content Updates  
**URL**: `https://api.netlify.com/build_hooks/68f12111451f894cdc2e339c`  
**Branch**: `master`  
**Purpose**: Triggers site rebuild when called

**Location in Netlify**:
- Site Settings → Build & Deploy → Build Hooks

### Contentful Webhook

**Created**: October 16, 2025  
**Name**: Netlify Auto-Deploy on Publish  
**Webhook ID**: `3su2h9uJ2EOKQmjWGMF90f`  
**Trigger**: `Entry.publish` events  
**Filter**: Only `homepageContent` content type  
**Target**: Netlify build hook URL  
**Status**: Active ✅

**Location in Contentful**:
- Settings → Webhooks

**Configuration Details**:
```json
{
  "name": "Netlify Auto-Deploy on Publish",
  "url": "https://api.netlify.com/build_hooks/68f12111451f894cdc2e339c",
  "topics": ["Entry.publish"],
  "filters": [
    {
      "equals": [
        {"doc": "sys.contentType.sys.id"},
        "homepageContent"
      ]
    }
  ],
  "active": true
}
```

---

## Manual Deployment

If you need to manually trigger a deployment (e.g., for code changes), you have two options:

### Option 1: Via Netlify Dashboard
1. Log into Netlify
2. Navigate to the Serenity Tides site
3. Click "Deploys" tab
4. Click "Trigger deploy" → "Deploy site"

### Option 2: Via Build Hook (curl)
```bash
curl -X POST https://api.netlify.com/build_hooks/68f12111451f894cdc2e339c
```

### Option 3: Via Git Push
Pushing to the `master` branch automatically triggers a deployment:
```bash
git push origin master
```

---

## Environment Variables

The following environment variables are required for the deployment to work:

### Contentful (Required)
- `CONTENTFUL_SPACE_ID`: Space identifier for Contentful
- `CONTENTFUL_ACCESS_TOKEN`: Delivery API token (read-only)
- `CONTENTFUL_ENVIRONMENT`: Environment name (default: "master")

### Build Configuration
- Set in `netlify.toml`
- Build command: `npm run test:ci && npm run build`
- Publish directory: `.next`

**Location**: Netlify Site Settings → Environment Variables

---

## Troubleshooting

### Content Changes Not Appearing

**Symptom**: Published changes in Contentful don't appear on the live site

**Possible Causes**:
1. **Webhook not firing**: Check Contentful → Settings → Webhooks → Activity log
2. **Build failed**: Check Netlify → Deploys for error messages
3. **Cache issue**: Try hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
4. **Wrong environment**: Ensure content is published in the correct Contentful environment

**Solution**:
1. Check webhook activity in Contentful
2. Check deployment logs in Netlify
3. Manually trigger a rebuild if needed
4. Clear browser cache

### Webhook Not Triggering

**Symptom**: Webhook doesn't fire when content is published

**Check**:
1. Webhook is active in Contentful
2. Webhook filter matches the content type being published
3. Netlify build hook URL is correct

**Solution**:
- Review webhook configuration in Contentful
- Test webhook manually using "Send test" in Contentful
- Recreate webhook if necessary (see Setup section below)

---

## Setup Instructions

### Creating a New Build Hook (if needed)

**Via Netlify API**:
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_NETLIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Contentful Content Updates",
    "branch": "master"
  }' \
  "https://api.netlify.com/api/v1/sites/SITE_ID/build_hooks"
```

**Via Netlify Dashboard**:
1. Go to Site Settings → Build & Deploy → Build Hooks
2. Click "Add build hook"
3. Name: "Contentful Content Updates"
4. Branch: master
5. Save and copy the URL

### Creating a New Contentful Webhook (if needed)

**Via Contentful API**:
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_CONTENTFUL_MANAGEMENT_TOKEN" \
  -H "Content-Type: application/vnd.contentful.management.v1+json" \
  -d '{
    "name": "Netlify Auto-Deploy on Publish",
    "url": "NETLIFY_BUILD_HOOK_URL",
    "topics": ["Entry.publish"],
    "filters": [
      {
        "equals": [
          {"doc": "sys.contentType.sys.id"},
          "homepageContent"
        ]
      }
    ]
  }' \
  "https://api.contentful.com/spaces/SPACE_ID/webhook_definitions"
```

**Via Contentful Dashboard**:
1. Go to Settings → Webhooks
2. Click "Add webhook"
3. Name: "Netlify Auto-Deploy on Publish"
4. URL: Paste Netlify build hook URL
5. Triggers: Select "Entry" → "Publish"
6. Filters: Add filter for `sys.contentType.sys.id` equals `homepageContent`
7. Save

---

## Security Considerations

### Build Hook URL
- The build hook URL is **not sensitive** - it only triggers builds
- No authentication required to call it
- Does not expose any data or configuration
- Safe to include in documentation

### API Tokens
- **Never commit** Contentful or Netlify tokens to the repository
- Store tokens in Netlify environment variables
- Rotate tokens if compromised
- Use read-only tokens where possible (Delivery API vs Management API)

### Webhook Security
- Webhooks are sent over HTTPS
- Contentful includes signature headers for verification (optional)
- Build hook only triggers builds, no data exposure

---

## Monitoring

### Netlify Deploy Logs
- View at: Netlify → Deploys → [Specific Deploy] → Deploy log
- Shows build output, errors, and warnings

### Contentful Webhook Activity
- View at: Contentful → Settings → Webhooks → [Webhook] → Activity
- Shows webhook calls, responses, and errors

### Recommended Monitoring
- Set up Netlify deploy notifications (email/Slack)
- Monitor webhook activity in Contentful
- Check deploy status after publishing content

---

## Related Documentation

- [User Guide: Changing Content via Contentful](./user-guides/Changing_Content_via_Contentful.md)
- [Project Overview](./PROJECT_OVERVIEW.md)
- [Netlify Documentation](https://docs.netlify.com/)
- [Contentful Webhooks Documentation](https://www.contentful.com/developers/docs/webhooks/)

---

*Last Updated: October 16, 2025*

