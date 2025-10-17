# Editable Components Reference

**Last Updated:** October 17, 2025  
**Purpose:** Quick reference guide for all CMS-editable components on the Serenity Tides website

---

## Overview

This document provides a complete list of all website content that can be edited through Contentful CMS. Each section includes the page location, Contentful entry name, and specific fields that can be modified.

---

## Homepage

**Contentful Entry:** `Homepage Content`  
**Entry ID:** `4oLtw3Ta7rnAKbNbpYTvhP`  
**Page URL:** `/` (homepage)

### Editable Fields

| Field Name | Content Type | Description | Example |
|------------|--------------|-------------|---------|
| `Hero_Headline` | Short Text | Main headline in hero section | "Find Your Flow with Serenity Tides" |
| `Hero_Subheading` | Long Text | Subheading text below headline | "Join us for transformative..." |
| `Hero_Background_Image` | Media (Image) | Large background image | Landscape/nature photo |
| `Primary_CTA_Text` | Short Text | Main call-to-action button text | "Explore Events" |
| `Secondary_CTA_Text` | Short Text | Secondary button text | "Learn More" |

### Visual Location
- **Hero Section:** Top of homepage, full-width banner
- **Buttons:** Below subheading text

---

## About Page

**Contentful Entry:** `About Page Content`  
**Entry ID:** `4ggue1PTv0yXffip466vY2`  
**Page URL:** `/about`

### Editable Fields

| Field Name | Content Type | Description | Location on Page |
|------------|--------------|-------------|------------------|
| `About_Us_Text` | Long Text | Main about paragraph | Top section, first paragraph |
| `About_Us_Secondary_Text` | Long Text | Secondary about paragraph | Top section, second paragraph |
| `Hero_Image` | Media (Image) | Hero section background image | Top of About page, full-width |
| `Our_Mission_Text` | Long Text | Mission statement | Three-column section, left column |
| `Our_Values_Text` | Long Text | Values statement | Three-column section, center column |
| `Our_Approach_Text` | Long Text | Approach description | Three-column section, right column |

### Visual Location
- **About Us Section:** Top of page, centered text
- **Three Pillars:** Below hero image, three equal columns with icons

---

## Events Page

**Status:** 🚧 Not yet CMS-enabled  
**Current:** Static content in code  
**Future:** Will be integrated with Contentful

### Planned Editable Fields
- Event title
- Event description
- Event date/time
- Event location
- Event image
- Registration link

---

## Live Location Page

**Status:** 🚧 Not yet CMS-enabled  
**Current:** Static content in code  
**Future:** Will be integrated with Contentful

### Planned Editable Fields
- Location name
- Address
- Map embed
- Directions text
- Contact information

---

## Global Components

### Header/Navigation
**Status:** 🚧 Not yet CMS-enabled  
**Current:** Static in `src/components/layout/Header.tsx`

### Footer
**Status:** 🚧 Not yet CMS-enabled  
**Current:** Static in `src/components/layout/Footer.tsx`

---

## Content Type Details

### Homepage Content Type

**Content Type ID:** `homepageContent`  
**Display Field:** `Title`  
**Number of Fields:** 6

```typescript
interface HomepageContentEntry {
  Title: string;
  Hero_Headline: string;
  Hero_Subheading: string;
  Hero_Background_Image: Asset;
  Primary_CTA_Text: string;
  Secondary_CTA_Text: string;
}
```

### About Page Content Type

**Content Type ID:** `aboutPageContent`  
**Display Field:** `Title`  
**Number of Fields:** 7

```typescript
interface AboutPageContentEntry {
  Title: string;
  About_Us_Text: string;
  About_Us_Secondary_Text: string;
  Hero_Image: Asset;
  Our_Mission_Text: string;
  Our_Values_Text: string;
  Our_Approach_Text: string;
}
```

### Team Member Content Type

**Content Type ID:** `teamMember`  
**Display Field:** `Name`  
**Number of Fields:** 5

```typescript
interface TeamMemberEntry {
  Name: string;
  Role: string;
  Bio: string;
  Avatar: Asset;
  Order: number;
}
```

---

## Naming Conventions

### Field Naming
- Use descriptive names with underscores: `About_Us_Text`
- Avoid generic names: ~~`text1`~~, ~~`content`~~
- Be specific about location: `Hero_Headline` not just `Headline`

### Entry Naming
- Use functional, descriptive names: "Homepage Content"
- Avoid thematic names: ~~"Find Your Flow with Serenity Tides"~~
- Format: "[Page Name] Content"

---

## How to Edit Content

### Quick Steps
1. Log into [Contentful](https://app.contentful.com)
2. Click **Content** tab
3. Find the entry you want to edit (e.g., "Homepage Content")
4. Make your changes
5. Click **Publish changes**
6. Wait 2-3 minutes for deployment

### Detailed Guide
See: [`docs/user-guides/Changing_Content_via_Contentful.md`](user-guides/Changing_Content_via_Contentful.md)

---

## Deployment Workflow

```
Edit in Contentful → Publish → Webhook (if configured) → Netlify Build → Live Site
                                  ↓
                          (Manual trigger if webhook not configured)
```

**Deployment Time:** 2-3 minutes after publishing

---

## Field Type Reference

| Contentful Type | Description | Example Use Case |
|----------------|-------------|------------------|
| **Short Text** | Single line, up to 256 characters | Headlines, button text |
| **Long Text** | Multiple paragraphs, rich text | Descriptions, body content |
| **Media** | Images, videos, PDFs | Background images, photos |
| **Boolean** | True/false toggle | Feature flags |
| **Number** | Numeric values | Prices, quantities |
| **Date** | Date/time picker | Event dates |

---

## Best Practices

### For Content Editors
- ✅ Preview changes before publishing (when available)
- ✅ Use descriptive alt text for images
- ✅ Keep headlines concise (under 60 characters)
- ✅ Test on mobile after major changes
- ❌ Don't delete fields, only edit content
- ❌ Don't unpublish entries unless intentional

### For Developers
- ✅ Always provide fallback content
- ✅ Use TypeScript interfaces for type safety
- ✅ Document new fields in this file
- ✅ Test with and without CMS connection
- ❌ Don't hardcode content that should be editable
- ❌ Don't create fields without clear purpose

---

## Troubleshooting

### Changes Not Appearing
1. Verify entry is **Published** (green status)
2. Wait 2-3 minutes for deployment
3. Clear browser cache (Ctrl+Shift+R)
4. Check Netlify deployment status

### Image Not Loading
1. Verify image is uploaded to Contentful
2. Check image file size (< 5MB recommended)
3. Ensure image format is supported (JPG, PNG, WebP)
4. Check browser console for errors

### Field Missing
1. Verify content type has the field
2. Check field is not hidden
3. Ensure you have correct permissions
4. Contact developer if field needs to be added

---

## Future Enhancements

### Planned CMS Integrations
- [ ] Events page content
- [ ] Live Location page content
- [x] Team member bios ✅
- [x] About page hero image ✅
- [ ] Navigation menu items
- [ ] Footer content
- [ ] Global settings (site title, meta tags)

### Planned Features
- [ ] Content preview mode
- [ ] Multi-language support
- [ ] Content scheduling
- [ ] Rich text formatting
- [ ] Image galleries
- [ ] Video embeds

---

## Related Documentation

- [CMS Integration Manual](cms_integration_manual.md) - For developers adding new CMS fields
- [User Guide](user-guides/Changing_Content_via_Contentful.md) - For content editors
- [Project Overview](PROJECT_OVERVIEW.md) - Overall project documentation
- [Testing SOP](SOP_CMS_Integration_Testing.md) - Testing procedures

---

## Changelog

### October 17, 2025
- ✅ Added Team Member content type (5 fields: Name, Role, Bio, Avatar, Order)
- ✅ Added Hero_Image field to About Page Content
- ✅ Deployed and verified in production
- ✅ All images loading from Contentful CDN

### October 16, 2025
- ✅ Added About Page Content (5 fields)
- ✅ Added Title field to all content types
- ✅ Updated entry names to be descriptive
- ✅ Created this reference document

### September 14, 2025
- ✅ Initial Homepage Content integration (5 fields)

---

**Maintained by:** Development Team  
**Questions?** See [User Guide](user-guides/Changing_Content_via_Contentful.md) or contact support

