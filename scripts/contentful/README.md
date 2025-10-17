# Contentful CMS Scripts

Automation scripts for managing Contentful CMS content and configuration.

## Available Scripts

### `update-team-images.js`

Updates team member avatar images in Contentful.

**Purpose:** Replace team member profile images with new versions while maintaining all other data.

**Usage:**
```bash
node scripts/contentful/update-team-images.js
```

**What it does:**
1. Uploads new images to Contentful's asset library
2. Processes and publishes the assets
3. Updates team member entries with new avatar links
4. Publishes the updated entries

**Configuration:**
Edit the `imageFiles` object in the script to specify which team members to update and their new image paths.

**Example:**
```javascript
const imageFiles = {
  'Julia Fetty': '/path/to/new-julia-image.jpg',
  'Amanda LeVine': '/path/to/new-amanda-image.jpg'
};
```

---

### `setup-content-types.js`

Creates or updates Contentful content types programmatically.

**Purpose:** Automate content type creation instead of manual UI configuration.

**Usage:**
```bash
node scripts/contentful/setup-content-types.js
```

**What it does:**
1. Creates content types (aboutPageContent, teamMember, etc.)
2. Defines fields with proper validation
3. Publishes content types
4. Creates initial content entries

**When to use:**
- Setting up a new environment
- Adding new content types
- Migrating content model changes

---

## Prerequisites

### 1. Contentful Management Token

The scripts require a Contentful Management API token stored in the PAM system:

```bash
# Token should be encrypted at:
~/.manus_credentials/contentful_mgmt_token.enc
```

### 2. Space ID and Environment

Scripts use:
- **Space ID:** `yl1mk6fxklfe`
- **Environment:** `master`

These are hardcoded but can be made configurable if needed.

### 3. Node.js Dependencies

Scripts use only Node.js built-ins:
- `https` - API requests
- `fs` - File operations
- `child_process` - Decrypt credentials

No `npm install` required! ✨

---

## Common Patterns

### API Request Helper

All scripts use a common pattern for Contentful API requests:

```javascript
function apiRequest(hostname, path, method, headers, data = null) {
  return new Promise((resolve, reject) => {
    // ... implementation
  });
}
```

### Credential Retrieval

```javascript
const token = execSync(
  'openssl enc -aes-256-cbc -d -pbkdf2 ' +
  '-in ~/.manus_credentials/contentful_mgmt_token.enc ' +
  '-pass pass:"$(hostname)-$(whoami)-manus-secure-2025"'
).toString().trim();
```

### Asset Upload Flow

1. Upload binary to `upload.contentful.com`
2. Create asset linking to upload
3. Process asset files
4. Publish asset

---

## Troubleshooting

### "HTTP 401: Unauthorized"
- Check that management token is correctly encrypted
- Verify token has not expired
- Ensure token has proper permissions

### "HTTP 404: Not Found"
- Verify Space ID and Environment ID
- Check that content type exists
- Confirm entry IDs are correct

### "HTTP 409: Version Mismatch"
- Content was modified since last fetch
- Re-fetch the entry to get latest version
- Use `X-Contentful-Version` header with current version

### "Asset processing failed"
- Wait longer between process and publish (increase timeout)
- Check image file format (JPEG, PNG supported)
- Verify file size is reasonable (<10MB recommended)

---

## Best Practices

1. **Test in Development First**
   - Use a test space or environment
   - Verify changes before running in production

2. **Backup Before Bulk Changes**
   - Export content before major updates
   - Keep copies of replaced assets

3. **Use Descriptive Names**
   - Asset titles should match team member names
   - File names should be semantic

4. **Handle Errors Gracefully**
   - Scripts include try/catch blocks
   - Failed updates don't break entire batch

5. **Log Progress**
   - Scripts output status messages
   - Easy to track what's happening

---

## Future Enhancements

Potential additions to this directory:

- `export-content.js` - Backup all content to JSON
- `import-content.js` - Restore from backup
- `migrate-content-type.js` - Update existing content types
- `bulk-publish.js` - Publish multiple entries at once
- `validate-content.js` - Check content integrity

---

**Last Updated:** October 16, 2025  
**Maintainer:** Manus AI Agent

