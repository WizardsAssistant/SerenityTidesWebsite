# 🌊 Serenity Tides Website

A beautiful, responsive website for Serenity Tides Spiritual Wellness Retreat, built with Next.js and powered by modern web technologies.

## ✨ Features

- 🎨 **Modern Design**: Clean, serene interface with Tailwind CSS
- 📱 **Responsive**: Mobile-first design that works on all devices
- ⚡ **Fast Performance**: Optimized with Next.js and CDN delivery
- 🧘 **AI-Powered**: Personalized mindfulness tips via Google Genkit
- 📝 **Content Management**: Dynamic content via Contentful CMS
- 🛡️ **Reliable**: Comprehensive fallback system ensures uptime
- 🧪 **Well-Tested**: Automated testing with Jest and React Testing Library

## 🚀 Quick Start

### Prerequisites
- Node.js 20.x or later
- npm package manager

### Installation
```bash
# Clone the repository
git clone https://github.com/WizardsAssistant/SerenityTidesWebsite.git
cd SerenityTidesWebsite

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Contentful credentials

# Start development server
npm run dev
```

Visit [http://localhost:9002](http://localhost:9002) to see the website.

### Getting Contentful Access

This project uses Contentful CMS for content management. To develop locally, you'll need access to the Contentful space.

**For External Contributors:**

1. **Request Access**: Contact the repository maintainer to be invited to the Contentful space
2. **Accept Invitation**: Check your email for the Contentful invitation and create/log in to your account
3. **Find Your Credentials**:
   - Log in to [Contentful](https://app.contentful.com)
   - Select the "Serenity Tides Website" space
   - Navigate to **Settings → API keys**
   - Find or create a "Content Delivery API" key
   - Copy the **Space ID** and **Content Delivery API - access token**
4. **Configure Locally**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local and replace placeholders with your actual credentials:
   # - CONTENTFUL_SPACE_ID (from Settings → General Settings)
   # - CONTENTFUL_ACCESS_TOKEN (from Settings → API keys)
   ```

**Important:** Never commit `.env.local` to version control. It's already in `.gitignore`.

**Need Help?** Open an issue or contact the maintainers.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15.3.3](https://nextjs.org/) with App Router
- **Language**: [TypeScript 5.7.3](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Radix UI](https://www.radix-ui.com/)
- **Content**: [Contentful CMS](https://www.contentful.com/)
- **AI**: [Google Genkit](https://firebase.google.com/docs/genkit)
- **Testing**: [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/)
- **Deployment**: [Netlify](https://www.netlify.com/)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── events/            # Events listing
│   ├── live-location/     # Live location page
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
│   ├── ui/               # Base components (Radix UI)
│   └── layout/           # Layout components
├── lib/                  # Utilities and configurations
├── hooks/                # Custom React hooks
└── ai/                   # AI integration (Genkit)
```

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run CI tests
npm run test:ci
```

Current test coverage: **11 tests passing** covering infrastructure and CMS integration.

## 🌐 Deployment

The website is automatically deployed to Netlify on every push to the master branch.

- **Live Site**: https://serenity-tides-website-v2.netlify.app
- **Build Command**: `npm run test:ci && npm run build`
- **Deploy Branch**: `master`

## 📚 Documentation

Comprehensive documentation is available in the `docs/` directory:

- [📖 Project Overview](docs/PROJECT_OVERVIEW.md) - Complete project guide
- [🛠️ Development Guide](docs/DEVELOPMENT.md) - Coding standards and workflows
- [🔧 Environment Setup](docs/ENVIRONMENT.md) - Configuration and environment variables
- [🧪 Testing Guide](docs/TESTING.md) - Testing strategy and best practices

## 🎯 Available Scripts

```bash
npm run dev          # Start development server (port 9002)
npm run build        # Build for production
npm run start        # Start production server
npm run test         # Run test suite
npm run test:watch   # Run tests in watch mode
npm run test:ci      # Run tests for CI/CD
npm run typecheck    # Check TypeScript types
npm run lint         # Run ESLint
```

## 🔧 Environment Variables

Required environment variables for Contentful CMS:

```bash
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
CONTENTFUL_ENVIRONMENT=master
```

See [Environment Setup Guide](docs/ENVIRONMENT.md) for detailed configuration.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Follow our [Development Guidelines](docs/DEVELOPMENT.md)
4. Run tests (`npm run test`)
5. Commit changes (`git commit -m 'Add amazing feature'`)
6. Push to branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📊 Project Status

### ✅ Phase 1 Complete - Live and Operational
- [x] Modern Next.js website with TypeScript
- [x] Responsive design with Tailwind CSS
- [x] Contentful CMS integration with fallback system
- [x] AI-powered mindfulness features
- [x] Comprehensive testing infrastructure
- [x] Automated deployment pipeline
- [x] Complete documentation

### 🔄 Future Enhancements
- [ ] Enhanced component test coverage
- [ ] End-to-end testing with Playwright
- [ ] Performance monitoring and analytics
- [ ] Advanced CMS features and workflows
- [ ] Multi-language support

## 🌟 Key Features

### Content Management
- **Dynamic Events**: Manage retreat events through Contentful
- **Team Profiles**: Showcase instructors and organizers
- **Fallback System**: Local content ensures site reliability
- **Rich Content**: Support for rich text and media

### User Experience
- **Mobile-First**: Optimized for all screen sizes
- **Fast Loading**: Optimized images and code splitting
- **Accessible**: Built with accessibility best practices
- **SEO-Friendly**: Proper meta tags and structured data

### Developer Experience
- **TypeScript**: Full type safety and IntelliSense
- **Modern Tooling**: Latest Next.js with App Router
- **Testing**: Comprehensive test suite with CI/CD
- **Documentation**: Detailed guides and examples

## 📞 Support

- 📧 **Issues**: [GitHub Issues](https://github.com/WizardsAssistant/SerenityTidesWebsite/issues)
- 📖 **Documentation**: See `docs/` directory
- 🔧 **Development**: Follow [Development Guide](docs/DEVELOPMENT.md)

## 📄 License

This project is private and proprietary to Serenity Tides Spiritual Wellness Retreat.

---

**Built with 💙 for the Serenity Tides community**

*Find your flow with mindfulness, movement, and connection* 🌊

