import { 
  fallbackEvents, 
  fallbackTeamMembers, 
  fallbackPageContent, 
  fallbackGlobalSettings 
} from '@/lib/contentful-fallback'

// Mock the contentful module
jest.mock('contentful', () => ({
  createClient: jest.fn(() => ({
    getEntries: jest.fn(),
    getEntry: jest.fn(),
  })),
}))

describe('Contentful Integration', () => {
  describe('Fallback Data', () => {
    it('provides fallback events data', () => {
      expect(fallbackEvents).toBeDefined()
      expect(Array.isArray(fallbackEvents)).toBe(true)
      expect(fallbackEvents.length).toBeGreaterThan(0)
      
      // Check structure of first event (Contentful structure with fields)
      const firstEvent = fallbackEvents[0]
      expect(firstEvent).toHaveProperty('fields')
      expect(firstEvent.fields).toHaveProperty('title')
      expect(firstEvent.fields).toHaveProperty('date')
      expect(firstEvent.fields).toHaveProperty('description')
    })

    it('provides fallback team members data', () => {
      expect(fallbackTeamMembers).toBeDefined()
      expect(Array.isArray(fallbackTeamMembers)).toBe(true)
      expect(fallbackTeamMembers.length).toBeGreaterThan(0)
      
      // Check structure of first team member (Contentful structure with fields)
      const firstMember = fallbackTeamMembers[0]
      expect(firstMember).toHaveProperty('fields')
      expect(firstMember.fields).toHaveProperty('name')
      expect(firstMember.fields).toHaveProperty('role')
      expect(firstMember.fields).toHaveProperty('bio')
    })

    it('provides fallback page content', () => {
      expect(fallbackPageContent).toBeDefined()
      expect(typeof fallbackPageContent).toBe('object')
      
      // Check for expected page content sections
      expect(fallbackPageContent).toHaveProperty('homepage')
      expect(fallbackPageContent).toHaveProperty('about')
      expect(fallbackPageContent.homepage.fields).toHaveProperty('title')
      expect(fallbackPageContent.homepage.fields).toHaveProperty('content')
    })

    it('provides fallback global settings', () => {
      expect(fallbackGlobalSettings).toBeDefined()
      expect(typeof fallbackGlobalSettings).toBe('object')
      
      // Check for expected global settings (Contentful structure with fields)
      expect(fallbackGlobalSettings).toHaveProperty('fields')
      expect(fallbackGlobalSettings.fields).toHaveProperty('siteName')
      expect(fallbackGlobalSettings.fields).toHaveProperty('siteDescription')
      expect(fallbackGlobalSettings.fields.siteName).toBe('Serenity Tides')
    })
  })

  describe('Environment Variables', () => {
    it('handles missing environment variables gracefully', () => {
      // Test environment variables are set in jest.setup.js
      expect(process.env.CONTENTFUL_SPACE_ID).toBe('test-space-id')
      expect(process.env.CONTENTFUL_ACCESS_TOKEN).toBe('test-access-token')
      expect(process.env.CONTENTFUL_ENVIRONMENT).toBe('master')
    })
  })

  describe('Data Validation', () => {
    it('ensures all events have required fields', () => {
      fallbackEvents.forEach((event, index) => {
        expect(event.fields).toBeDefined()
        expect(event.fields.title).toBeDefined()
        expect(event.fields.date).toBeDefined()
        expect(event.fields.description).toBeDefined()
        
        // Validate date format
        expect(new Date(event.fields.date).toString()).not.toBe('Invalid Date')
      })
    })

    it('ensures all team members have required fields', () => {
      fallbackTeamMembers.forEach((member, index) => {
        expect(member.fields).toBeDefined()
        expect(member.fields.name).toBeDefined()
        expect(member.fields.role).toBeDefined()
        expect(member.fields.bio).toBeDefined()
        
        // Validate name is not empty
        expect(member.fields.name.trim().length).toBeGreaterThan(0)
      })
    })
  })
})

