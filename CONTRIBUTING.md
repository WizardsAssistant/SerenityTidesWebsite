# Contributing to Serenity Tides Website

Thank you for your interest in contributing! This guide will help you get started.

## Quick Start for Contributors

### 1. Fork and Clone

```bash
git clone https://github.com/YOUR_USERNAME/SerenityTidesWebsite.git
cd SerenityTidesWebsite
```

### 2. Get Access to Contentful

**You must be invited to the Contentful space to develop locally.**

See the [README section "Getting Contentful Access"](README.md#getting-contentful-access) for detailed instructions on how to:
- Request an invitation from the maintainer
- Find your Space ID and Access Token
- Configure your local environment

### 3. Install Dependencies

```bash
npm install
```

### 4. Set Up Environment

```bash
cp .env.example .env.local
# Edit .env.local with your Contentful credentials (see README)
```

### 5. Start Development Server

```bash
npm run dev
# Visit http://localhost:9002
```

## Development Workflow

We follow a standard Pull Request workflow. **Never push directly to master.**

### Detailed Process

See [docs/SOP_PR_Workflow.md](docs/SOP_PR_Workflow.md) for the complete PR workflow.

**Summary:**
1. Create feature branch: `git checkout -b feature/your-feature-name`
2. Make changes and commit: `git commit -m "feat: your description"`
3. Run tests: `npm run test`
4. Push branch: `git push origin feature/your-feature-name`
5. Create Pull Request on GitHub
6. Address review feedback
7. Maintainer will merge after approval

### Branch Naming

- `feature/` - New features (e.g., `feature/event-filtering`)
- `fix/` - Bug fixes (e.g., `fix/mobile-navigation`)
- `docs/` - Documentation only (e.g., `docs/update-readme`)
- `refactor/` - Code refactoring (e.g., `refactor/simplify-api`)

### Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `test:` - Tests
- `refactor:` - Code refactoring
- `chore:` - Maintenance

**Examples:**
```bash
git commit -m "feat: add event filtering functionality"
git commit -m "fix: resolve mobile navigation overflow issue"
git commit -m "docs: update API documentation"
```

## Coding Standards

See [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) for comprehensive guidelines.

**Key Points:**
- Use TypeScript for all code
- Follow existing code style
- Write tests for new features
- Update documentation as needed
- Avoid `any` type - use proper typing
- Use functional components with hooks

## Testing

Before submitting a PR, run all tests:

```bash
# Run all tests
npm run test

# Run tests in watch mode during development
npm run test:watch

# Check TypeScript types
npm run typecheck

# Build to verify no errors
npm run build
```

**All tests must pass before your PR can be merged.**

## Pull Request Guidelines

Your PR should include:
- Clear description of changes
- Link to related issue (if applicable)
- Screenshots for UI changes
- Updated tests
- Updated documentation

See [docs/SOP_PR_Workflow.md](docs/SOP_PR_Workflow.md) for detailed PR requirements.

## Getting Help

- **Questions about an issue?** Comment on the issue
- **Stuck on setup?** Open a new issue with "Setup Help" label
- **Found a bug?** Open a new issue with detailed reproduction steps
- **Need Contentful access?** Contact the repository maintainer

## Code of Conduct

Be respectful, inclusive, and constructive in all interactions.

---

Thank you for contributing to Serenity Tides! 🌊
