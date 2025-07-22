# Serenity Tides Website

A modern, responsive website for Serenity Tides spiritual wellness retreats, built with Next.js and integrated with Contentful CMS for easy content management.

## 🌊 Features

- **Modern Design**: Clean, responsive design optimized for all devices
- **Content Management**: Integrated with Contentful CMS for non-technical content editing
- **Event Management**: Dynamic event listings with detailed information
- **Team Profiles**: Showcase team members with photos and bios
- **Fallback System**: Works without CMS credentials during development
- **Performance Optimized**: Built with Next.js for fast loading and SEO

## 🚀 Live Website

**Current Live URL**: https://9002-i240rghd9yasjdetmsmxr-c139f381.manusvm.computer

## 🛠 Technology Stack

- **Framework**: Next.js 15.3.3 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **CMS**: Contentful (with fallback data system)
- **Deployment**: Vercel (recommended)
- **Icons**: Lucide React

## 📋 Content Structure

The website includes:

### Pages
- **Homepage**: Hero section with upcoming event banner
- **About**: Mission, values, approach, and team profiles
- **Events**: Complete list of 2025 Summer Series events
- **Live Location**: Interactive location information

### CMS Content Types
- **Events**: Title, date, time, location, description, images
- **Team Members**: Name, role, bio, avatar, display order
- **Page Content**: Editable page content and headlines
- **Global Settings**: Site-wide settings and contact information

## 🔧 Setup Instructions

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/ErikTheWizard/SerenityTidesWebsite.git
   cd SerenityTidesWebsite
   git checkout master  # Important: Use master branch, not main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   
   The website works with fallback data by default. To enable CMS functionality:
   
   - Copy `.env.local` and update with your Contentful credentials:
   ```env
   CONTENTFUL_SPACE_ID=your_actual_space_id
   CONTENTFUL_ACCESS_TOKEN=your_actual_access_token
   CONTENTFUL_PREVIEW_ACCESS_TOKEN=your_actual_preview_token
   CONTENTFUL_ENVIRONMENT=master
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   
   Visit `http://localhost:9002`

### Production Build

```bash
npm run build
npm start
```

## 📝 Contentful CMS Setup

### Quick Setup Guide

1. **Create Contentful Account**
   - Sign up at [contentful.com](https://www.contentful.com)
   - Create a new space called "Serenity Tides"

2. **Get API Keys**
   - Go to Settings > API keys
   - Create new API key named "Serenity Tides Website"
   - Copy Space ID and access tokens

3. **Create Content Models**

   **Event Content Model** (`event`):
   - Title (Short text, required)
   - Date (Date & time, required)
   - Time (Short text, required) - e.g., "8:00 AM - 10:00 AM"
   - Location (Short text, required)
   - Description (Long text, required)
   - Image (Media, required)
   - Slug (Short text, required)

   **Team Member Content Model** (`teamMember`):
   - Name (Short text, required)
   - Role (Short text, required)
   - Bio (Long text, optional)
   - Avatar (Media, required)
   - Order (Integer, required) - for display ordering

   **Page Content Model** (`pageContent`):
   - Title (Short text, required)
   - Content (Rich text, required)
   - Slug (Short text, required) - e.g., "homepage", "about"

   **Global Settings Model** (`globalSettings`):
   - Site Name (Short text, required)
   - Site Description (Long text, required)
   - Contact Email (Short text, required)
   - Contact Phone (Short text, optional)
   - Address (Long text, optional)
   - Social Media (JSON object, optional)

### Sample Content

The repository includes detailed sample content in the Contentful setup guide. Key events include:

- **2025 Summer Series - Week 1**: Mindful Mornings (June 14, Lincoln Park)
- **2025 Summer Series - Week 2**: Sunset Serenity (June 21, Millennium Park)
- **2025 Summer Series - Week 3**: Community Connection (June 28, Grant Park)
- **2025 Summer Series - Week 4**: Nature's Embrace (July 5, North Avenue Beach)

## 👥 Team Management

Team members are displayed in order based on the `order` field:

1. Erik Beitel - Founder & Lead Instructor
2. Julia Fetty - Yoga & Movement Specialist
3. Amanda LeVine - Community Manager
4. Isabel Fudali - Mindfulness Coach
5. Drew Schwartz - Creative Director

## 🎨 Design System

### Colors
- Primary: Teal/Turquoise theme
- Background: Clean whites and light grays
- Accent: Purple highlights for CTAs

### Typography
- Headlines: Custom font stack optimized for readability
- Body: Clean, modern sans-serif
- Responsive sizing for all screen sizes

### Components
- Responsive navigation header
- Event cards with image, details, and CTAs
- Team member profile cards
- Newsletter signup forms
- Footer with social links

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🔄 Content Updates

### For Non-Technical Users

1. **Log into Contentful**
   - Visit your Contentful space
   - Go to the "Content" tab

2. **Edit Events**
   - Click on any event entry
   - Update title, date, time, location, or description
   - Upload new images if needed
   - Click "Publish" to make changes live

3. **Update Team Information**
   - Edit team member entries
   - Update bios, roles, or profile photos
   - Changes appear automatically on the website

4. **Modify Page Content**
   - Edit homepage or about page content
   - Use rich text editor for formatting
   - Publish changes to update the website

### For Developers

- All content fetching includes fallback data
- CMS integration is in `/src/lib/contentful.ts`
- Fallback data is in `/src/lib/contentful-fallback.ts`
- TypeScript types ensure type safety

## 🚀 Deployment

### Recommended: Vercel

1. **Connect Repository**
   - Import project from GitHub
   - Select the `master` branch

2. **Environment Variables**
   - Add Contentful credentials in Vercel dashboard
   - Use the same variable names as in `.env.local`

3. **Deploy**
   - Automatic deployments on push to master
   - Preview deployments for pull requests

### Alternative: Other Platforms

The website can be deployed to any platform supporting Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 🔧 Development Notes

### Key Files
- `/src/app/page.tsx` - Homepage
- `/src/app/about/page.tsx` - About page
- `/src/app/events/page.tsx` - Events page
- `/src/lib/contentful.ts` - CMS integration
- `/src/components/upcoming-event-banner.tsx` - Homepage event banner

### Image Configuration
External images are configured in `next.config.ts` for:
- Unsplash (fallback images)
- Contentful CDN (images.ctfassets.net)

### Build Process
- TypeScript compilation with error tolerance
- Static page generation for optimal performance
- Image optimization for web delivery

## 📞 Support

For technical support or questions about the CMS integration:

1. Check the Contentful setup guide in the repository
2. Review the fallback data structure for content examples
3. Ensure all environment variables are correctly configured
4. Verify content model field names match the TypeScript interfaces

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with ❤️ for Serenity Tides**

*Bringing mindfulness, movement, and connection to the Chicago community.*

