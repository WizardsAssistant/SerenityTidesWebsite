# Serenity Tides Website - Project Overview

Welcome to the Serenity Tides Spiritual Wellness Retreat website! This document provides a comprehensive overview of the project structure, architecture, and development guidelines.

## 🌊 Project Mission

Serenity Tides is a spiritual wellness retreat focused on mindfulness, movement, and connection. This website serves as the digital gateway for participants to discover events, learn about our mission, and connect with our community.

## 🏗️ Architecture Overview

### Technology Stack
- **Framework**: Next.js 15.3.3 with App Router
- **Language**: TypeScript 5.7.3
- **Styling**: Tailwind CSS + Radix UI components
- **Content Management**: Contentful CMS with local fallback
- **Testing**: Jest + React Testing Library
- **Deployment**: Netlify with continuous deployment
- **AI Integration**: Google Genkit for mindfulness features

### Project Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── events/            # Events listing page
│   ├── live-location/     # Live location page
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Homepage
├── components/            # Reusable UI components
│   ├── layout/           # Layout components (header, footer)
│   ├── ui/               # Base UI components (Radix UI)
│   └── *.tsx             # Feature-specific components
├── lib/                  # Utility functions and configurations
│   ├── contentful.ts     # Contentful CMS integration
│   ├── contentful-fallback.ts # Local fallback data
│   ├── events.ts         # Event data and utilities
│   └── utils.ts          # General utilities
├── hooks/                # Custom React hooks
└── ai/                   # AI integration (Google Genkit)
    ├── flows/            # AI flow definitions
    └── genkit.ts         # Genkit configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 20.x or later
- npm or yarn package manager
- Git for version control

### Installation
```bash
# Clone the repository
git clone https://github.com/WizardsAssistant/SerenityTidesWebsite.git
cd SerenityTidesWebsite

# Install dependencies
npm install

# Set up environment variables (see ENVIRONMENT.md)
cp .env.example .env.local

# Start development server
npm run dev
```

### Available Scripts
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run test` - Run test suite
- `npm run test:watch` - Run tests in watch mode
- `npm run test:ci` - Run tests for CI/CD
- `npm run typecheck` - Check TypeScript types
- `npm run lint` - Run ESLint

## 📱 Features

### Core Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Event Management**: Dynamic event listings with Contentful CMS
- **Team Profiles**: Meet the team section with bio information
- **AI-Powered Content**: Personalized mindfulness tips via Google Genkit
- **Fallback System**: Local content ensures site works even if CMS is down

### Content Management
- **Primary**: Contentful CMS for dynamic content updates
- **Fallback**: Local JSON data ensures reliability
- **Content Types**: Events, Team Members, Page Content, Global Settings

### Performance Optimizations
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic route-based code splitting
- **CDN Delivery**: Global content delivery via Netlify
- **Caching**: Browser and CDN caching strategies

## 🧪 Testing Strategy

### Test Coverage
- **Unit Tests**: Component and utility function testing
- **Integration Tests**: Contentful API and fallback system
- **CI/CD Integration**: Automated testing on every deployment

### Test Structure
```
__tests__/
├── basic.test.ts          # Infrastructure tests
├── lib/
│   └── contentful.test.ts # CMS integration tests
└── components/            # Component tests (future)
```

## 🔧 Configuration Files

### Key Configuration Files
- `next.config.ts` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `jest.config.js` - Testing configuration
- `netlify.toml` - Deployment configuration
- `package.json` - Dependencies and scripts

## 🌐 Deployment

### Production Environment
- **Platform**: Netlify
- **URL**: https://serenity-tides-website-v2.netlify.app
- **Build Command**: `npm run test:ci && npm run build`
- **Auto-Deploy**: Enabled on push to master branch

### Environment Variables
See `docs/ENVIRONMENT.md` for detailed environment configuration.

## 📚 Additional Documentation

- `DEVELOPMENT.md` - Development guidelines and best practices
- `ENVIRONMENT.md` - Environment variable configuration
- `TESTING.md` - Testing guidelines and examples
- `DEPLOYMENT.md` - Deployment procedures and troubleshooting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following our coding standards
4. Run tests (`npm run test`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📞 Support

For questions or support, please contact the development team or create an issue in the GitHub repository.

---

*Last updated: July 22, 2025*  
*Project Status: Phase 1 Complete - Live and Operational* ✅

