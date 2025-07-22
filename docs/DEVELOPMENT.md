# Development Guidelines

This document outlines the development practices, coding standards, and workflows for the Serenity Tides website project.

## 🎯 Development Principles

### Core Values
- **Simplicity**: Write clear, readable code that's easy to understand
- **Reliability**: Ensure robust error handling and fallback systems
- **Performance**: Optimize for fast loading and smooth user experience
- **Accessibility**: Build inclusive experiences for all users
- **Maintainability**: Structure code for long-term sustainability

## 🛠️ Development Environment

### Required Tools
- **Node.js**: Version 20.x or later
- **Package Manager**: npm (included with Node.js)
- **Editor**: VS Code recommended with extensions:
  - TypeScript and JavaScript Language Features
  - Tailwind CSS IntelliSense
  - ES7+ React/Redux/React-Native snippets
  - Prettier - Code formatter

### Environment Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:9002
```

## 📝 Coding Standards

### TypeScript Guidelines
- Use TypeScript for all new files
- Define interfaces for all data structures
- Avoid `any` type - use proper typing
- Use strict mode configuration

```typescript
// Good: Proper interface definition
interface Event {
  id: string;
  title: string;
  date: Date;
  description: string;
}

// Good: Typed component props
interface EventCardProps {
  event: Event;
  onSelect?: (event: Event) => void;
}
```

### React Component Guidelines
- Use functional components with hooks
- Implement proper prop validation with TypeScript
- Follow single responsibility principle
- Use descriptive component and prop names

```tsx
// Good: Clean functional component
export function EventCard({ event, onSelect }: EventCardProps) {
  const handleClick = () => {
    onSelect?.(event);
  };

  return (
    <div className="event-card" onClick={handleClick}>
      <h3>{event.title}</h3>
      <p>{event.description}</p>
    </div>
  );
}
```

### Styling Guidelines
- Use Tailwind CSS utility classes
- Create reusable component variants with `class-variance-authority`
- Follow mobile-first responsive design
- Use semantic color names from the design system

```tsx
// Good: Tailwind utility classes
<button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
  Click me
</button>
```

## 🏗️ Project Structure Guidelines

### File Organization
```
src/
├── app/                    # Next.js pages (App Router)
├── components/             # Reusable components
│   ├── ui/                # Base UI components
│   ├── layout/            # Layout components
│   └── feature/           # Feature-specific components
├── lib/                   # Utilities and configurations
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript type definitions
└── ai/                    # AI integration code
```

### Naming Conventions
- **Files**: Use kebab-case for files (`event-card.tsx`)
- **Components**: Use PascalCase (`EventCard`)
- **Functions**: Use camelCase (`handleEventClick`)
- **Constants**: Use UPPER_SNAKE_CASE (`API_BASE_URL`)

## 🧪 Testing Guidelines

### Testing Strategy
- Write tests for all utility functions
- Test component behavior, not implementation details
- Use React Testing Library for component tests
- Maintain test coverage above 80% for critical paths

### Test Structure
```typescript
// Good: Descriptive test structure
describe('EventCard Component', () => {
  it('should display event title and description', () => {
    const mockEvent = {
      id: '1',
      title: 'Mindful Morning',
      description: 'Start your day with intention',
      date: new Date('2025-08-01'),
    };

    render(<EventCard event={mockEvent} />);
    
    expect(screen.getByText('Mindful Morning')).toBeInTheDocument();
    expect(screen.getByText('Start your day with intention')).toBeInTheDocument();
  });
});
```

## 🔄 Git Workflow

### Branch Strategy
- **master**: Production-ready code
- **feature/**: New features (`feature/event-filtering`)
- **fix/**: Bug fixes (`fix/mobile-navigation`)
- **docs/**: Documentation updates (`docs/api-reference`)

### Commit Guidelines
- Use conventional commit format
- Write clear, descriptive commit messages
- Keep commits focused and atomic

```bash
# Good commit messages
git commit -m "feat: add event filtering functionality"
git commit -m "fix: resolve mobile navigation overflow issue"
git commit -m "docs: update API documentation"
```

## 📦 Dependency Management

### Adding Dependencies
- Prefer well-maintained packages with good TypeScript support
- Check bundle size impact before adding new dependencies
- Update dependencies regularly for security

```bash
# Add production dependency
npm install package-name

# Add development dependency
npm install --save-dev package-name
```

### Package Guidelines
- **UI Components**: Use Radix UI for accessible components
- **Styling**: Tailwind CSS for utility-first styling
- **State Management**: React hooks for local state
- **API Calls**: Native fetch with proper error handling

## 🚀 Performance Guidelines

### Code Optimization
- Use dynamic imports for code splitting
- Optimize images with Next.js Image component
- Implement proper loading states
- Use React.memo for expensive components

```tsx
// Good: Dynamic import for code splitting
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Loading...</div>,
});

// Good: Optimized image
import Image from 'next/image';

<Image
  src="/event-image.jpg"
  alt="Event description"
  width={600}
  height={400}
  priority={isAboveFold}
/>
```

### Bundle Optimization
- Analyze bundle size with `npm run build`
- Remove unused dependencies
- Use tree shaking for library imports

## 🔒 Security Guidelines

### Environment Variables
- Never commit sensitive data to version control
- Use environment variables for API keys and secrets
- Validate environment variables at startup

```typescript
// Good: Environment variable validation
const requiredEnvVars = {
  CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
  CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
};

Object.entries(requiredEnvVars).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});
```

### API Security
- Validate all external data
- Implement proper error boundaries
- Use HTTPS for all external requests

## 🐛 Debugging Guidelines

### Development Tools
- Use React Developer Tools browser extension
- Enable TypeScript strict mode for better error catching
- Use console.log sparingly - prefer debugger statements

### Error Handling
- Implement error boundaries for React components
- Provide meaningful error messages
- Log errors for debugging but don't expose sensitive information

```tsx
// Good: Error boundary implementation
export function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundaryComponent
      fallback={<div>Something went wrong. Please try again.</div>}
    >
      {children}
    </ErrorBoundaryComponent>
  );
}
```

## 📋 Code Review Checklist

### Before Submitting PR
- [ ] Code follows TypeScript and React guidelines
- [ ] Tests are written and passing
- [ ] No console.log statements in production code
- [ ] Error handling is implemented
- [ ] Performance impact is considered
- [ ] Documentation is updated if needed

### Review Criteria
- Code readability and maintainability
- Proper TypeScript usage
- Test coverage for new functionality
- Performance implications
- Security considerations

---

*Happy coding! 🌊*

