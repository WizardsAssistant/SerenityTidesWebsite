# Testing Guide

This document outlines the testing strategy, guidelines, and best practices for the Serenity Tides website project.

## 🧪 Testing Philosophy

### Our Testing Approach
- **Reliability First**: Tests should catch real bugs and prevent regressions
- **User-Focused**: Test behavior that users actually experience
- **Maintainable**: Tests should be easy to understand and update
- **Fast Feedback**: Quick test execution for rapid development cycles

### Testing Pyramid
```
    🔺 E2E Tests (Future)
   🔺🔺 Integration Tests
  🔺🔺🔺 Unit Tests (Current Focus)
```

## 🛠️ Testing Stack

### Core Testing Tools
- **Jest**: Test runner and assertion library
- **React Testing Library**: Component testing utilities
- **@testing-library/jest-dom**: Additional Jest matchers
- **@testing-library/user-event**: User interaction simulation

### Configuration Files
- `jest.config.js` - Jest configuration
- `jest.setup.js` - Test environment setup
- `__tests__/` - Test files directory

## 📁 Test Structure

### Current Test Suite
```
__tests__/
├── basic.test.ts              # Infrastructure tests (4 tests)
└── lib/
    └── contentful.test.ts     # CMS integration tests (7 tests)
```

### Test Categories

#### 1. Infrastructure Tests (`basic.test.ts`)
Tests that verify the testing framework and basic functionality:
- JavaScript/TypeScript execution
- Array and object handling
- Async operation support
- Environment variable access

#### 2. Integration Tests (`contentful.test.ts`)
Tests that verify external service integration:
- Contentful API fallback system
- Data structure validation
- Error handling for missing data
- Content type validation

## 🚀 Running Tests

### Available Test Commands
```bash
# Run all tests once
npm run test

# Run tests in watch mode (development)
npm run test:watch

# Run tests for CI/CD (with coverage)
npm run test:ci

# Run tests with coverage report
npm run test:coverage
```

### Test Output Example
```
Test Suites: 2 passed, 2 total
Tests:       11 passed, 11 total
Snapshots:   0 total
Time:        2.634 s
Coverage:    3.05% statements, 0% branches, 0% functions, 1.6% lines
```

## ✍️ Writing Tests

### Test File Naming
- Use `.test.ts` or `.test.tsx` extension
- Place tests in `__tests__/` directory
- Mirror source file structure: `src/lib/utils.ts` → `__tests__/lib/utils.test.ts`

### Basic Test Structure
```typescript
// __tests__/lib/example.test.ts
import { functionToTest } from '../../src/lib/example';

describe('Example Function', () => {
  it('should return expected result', () => {
    // Arrange
    const input = 'test input';
    
    // Act
    const result = functionToTest(input);
    
    // Assert
    expect(result).toBe('expected output');
  });
});
```

### Component Testing Example
```typescript
// __tests__/components/event-card.test.tsx
import { render, screen } from '@testing-library/react';
import { EventCard } from '../../src/components/event-card';

describe('EventCard Component', () => {
  const mockEvent = {
    id: '1',
    title: 'Mindful Morning',
    description: 'Start your day with intention',
    date: new Date('2025-08-01'),
  };

  it('should display event information', () => {
    render(<EventCard event={mockEvent} />);
    
    expect(screen.getByText('Mindful Morning')).toBeInTheDocument();
    expect(screen.getByText('Start your day with intention')).toBeInTheDocument();
  });

  it('should handle click events', async () => {
    const mockOnClick = jest.fn();
    render(<EventCard event={mockEvent} onClick={mockOnClick} />);
    
    await userEvent.click(screen.getByRole('button'));
    
    expect(mockOnClick).toHaveBeenCalledWith(mockEvent);
  });
});
```

## 🎯 Testing Best Practices

### What to Test
- ✅ **User interactions**: Clicking, typing, form submission
- ✅ **Data transformations**: Utility functions and calculations
- ✅ **Error handling**: How components handle invalid data
- ✅ **Integration points**: API calls and external services
- ✅ **Business logic**: Core functionality and rules

### What NOT to Test
- ❌ **Implementation details**: Internal component state
- ❌ **Third-party libraries**: Assume they work correctly
- ❌ **Styling**: Visual appearance (use visual regression tests instead)
- ❌ **Trivial code**: Simple getters/setters without logic

### Testing Guidelines

#### 1. Write Descriptive Test Names
```typescript
// Good: Describes behavior and expected outcome
it('should display error message when API request fails', () => {});

// Bad: Vague and unclear
it('should work correctly', () => {});
```

#### 2. Use Arrange-Act-Assert Pattern
```typescript
it('should calculate total price with tax', () => {
  // Arrange
  const price = 100;
  const taxRate = 0.08;
  
  // Act
  const total = calculateTotalWithTax(price, taxRate);
  
  // Assert
  expect(total).toBe(108);
});
```

#### 3. Test Edge Cases
```typescript
describe('Event Date Validation', () => {
  it('should handle past dates', () => {
    const pastDate = new Date('2020-01-01');
    expect(isValidEventDate(pastDate)).toBe(false);
  });

  it('should handle invalid dates', () => {
    const invalidDate = new Date('invalid');
    expect(isValidEventDate(invalidDate)).toBe(false);
  });

  it('should handle null/undefined dates', () => {
    expect(isValidEventDate(null)).toBe(false);
    expect(isValidEventDate(undefined)).toBe(false);
  });
});
```

## 🔧 Mocking and Test Utilities

### Mocking External Dependencies
```typescript
// Mock Contentful API
jest.mock('contentful', () => ({
  createClient: jest.fn(() => ({
    getEntries: jest.fn().mockResolvedValue({
      items: [/* mock data */],
    }),
  })),
}));
```

### Custom Test Utilities
```typescript
// __tests__/utils/test-utils.tsx
import { render } from '@testing-library/react';
import { ReactElement } from 'react';

// Custom render function with providers
export function renderWithProviders(ui: ReactElement) {
  return render(ui, {
    wrapper: ({ children }) => (
      <div data-testid="test-wrapper">
        {children}
      </div>
    ),
  });
}
```

## 📊 Coverage Guidelines

### Current Coverage
- **Statements**: 3.05%
- **Branches**: 0%
- **Functions**: 0%
- **Lines**: 1.6%

### Coverage Goals
- **Critical paths**: 90%+ coverage
- **Utility functions**: 100% coverage
- **Components**: 80%+ coverage
- **Integration points**: 95%+ coverage

### Viewing Coverage Reports
```bash
# Generate coverage report
npm run test:coverage

# View HTML coverage report
open coverage/lcov-report/index.html
```

## 🚨 Debugging Tests

### Common Issues and Solutions

#### Tests Failing in CI but Passing Locally
```bash
# Run tests in CI mode locally
npm run test:ci

# Check for timezone issues
TZ=UTC npm run test
```

#### Mock Not Working
```typescript
// Ensure mocks are properly hoisted
jest.mock('module-name', () => ({
  // Mock implementation
}));

// Clear mocks between tests
beforeEach(() => {
  jest.clearAllMocks();
});
```

#### Async Test Issues
```typescript
// Use async/await for async operations
it('should handle async operations', async () => {
  const result = await asyncFunction();
  expect(result).toBe('expected');
});

// Wait for elements to appear
await waitFor(() => {
  expect(screen.getByText('Loading complete')).toBeInTheDocument();
});
```

## 🔮 Future Testing Enhancements

### Planned Improvements
1. **Component Tests**: Add tests for all React components
2. **E2E Tests**: Implement Playwright for end-to-end testing
3. **Visual Regression**: Add screenshot testing
4. **Performance Tests**: Monitor bundle size and load times
5. **Accessibility Tests**: Automated a11y testing

### Test Expansion Roadmap
```
Phase 1: ✅ Infrastructure & Integration Tests (Current)
Phase 2: 🔄 Component Unit Tests
Phase 3: 🔄 End-to-End Tests
Phase 4: 🔄 Visual & Performance Tests
```

## 📚 Resources

### Documentation
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

### Useful Patterns
- [Testing Recipes](https://reactjs.org/docs/testing-recipes.html)
- [Mock Service Worker](https://mswjs.io/) for API mocking
- [Testing Playground](https://testing-playground.com/) for query debugging

---

*Happy testing! 🧪 Remember: Good tests make confident deployments.*

