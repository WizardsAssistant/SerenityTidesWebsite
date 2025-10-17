import { createClient } from 'contentful';
import { 
  fallbackEvents, 
  fallbackTeamMembers, 
  fallbackPageContent, 
  fallbackGlobalSettings 
} from './contentful-fallback';

// Check if Contentful credentials are available
const hasContentfulCredentials = 
  process.env.CONTENTFUL_SPACE_ID && 
  process.env.CONTENTFUL_ACCESS_TOKEN;

let client: any = null;

if (hasContentfulCredentials) {
  client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID!,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
    environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
  });
}

export default client;

// Type definitions for Contentful entries
export interface EventEntry {
  fields: {
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
    image: {
      fields: {
        file: {
          url: string;
        };
      };
    };
    slug: string;
  };
}

export interface AboutPageContentEntry {
  fields: {
    About_Us_Text: string;
    About_Us_Secondary_Text: string;
    Our_Mission_Text: string;
    Our_Values_Text: string;
    Our_Approach_Text: string;
    Hero_Image?: {
      fields: {
        file: {
          url: string;
          details: {
            image: {
              width: number;
              height: number;
            };
          };
        };
        title: string;
        description: string;
      };
    };
    Hero_Image_Alt_Text?: string;
  };
}

export interface HomepageContentEntry {
  fields: {
    heroHeadline: string;
    heroSubheading: string;
    heroBackgroundImage?: {
      fields: {
        file: {
          url: string;
          details: {
            image: {
              width: number;
              height: number;
            };
          };
        };
        title: string;
        description: string;
      };
    };
    primaryButtonText: string;
    primaryButtonLink: string;
    secondaryButtonText?: string;
    heroSecondaryButtonLink?: string;
  };
}

export interface TeamMemberEntry {
  fields: {
    Name: string;
    Role: string;
    Bio: string;
    Avatar: {
      fields: {
        file: {
          url: string;
        };
        title: string;
        description: string;
      };
    };
    Order: number;
  };
}

export interface PageContentEntry {
  fields: {
    title: string;
    content: any; // Rich text content
    slug: string;
  };
}

export interface GlobalSettingsEntry {
  fields: {
    siteName: string;
    siteDescription: string;
    contactEmail: string;
    contactPhone: string;
    address: string;
    socialMedia: {
      facebook?: string;
      instagram?: string;
      twitter?: string;
    };
  };
}

// Helper functions to fetch content with fallback support
export async function getEvents(): Promise<EventEntry[]> {
  // Content type 'event' doesn't exist in Contentful space - using fallback data
  console.log('Using fallback events data - event content type not configured in Contentful');
  return fallbackEvents;
}

export async function getTeamMembers(): Promise<TeamMemberEntry[]> {
  if (!client) {
    console.log('Using fallback team data - Contentful not configured');
    return fallbackTeamMembers;
  }

  try {
    const response = await client.getEntries({
      content_type: 'teamMember',
      order: 'fields.Order',
      include: 2, // Include linked assets (images)
    });

    if (response.items && response.items.length > 0) {
      return response.items as TeamMemberEntry[];
    }

    console.log('No team members found in Contentful - using fallback');
    return fallbackTeamMembers;
  } catch (error) {
    console.error('Error fetching team members from Contentful:', error);
    return fallbackTeamMembers;
  }
}

export async function getPageContent(slug: string): Promise<PageContentEntry | null> {
  // Content type 'pageContent' doesn't exist in Contentful space - using fallback data
  console.log(`Using fallback page content for ${slug} - pageContent content type not configured in Contentful`);
  return (fallbackPageContent as any)[slug] || null;
}

export async function getHomepageContent(): Promise<HomepageContentEntry | null> {
  if (!hasContentfulCredentials) {
    const { fallbackHomepageContent } = await import('./contentful-fallback');
    return fallbackHomepageContent;
  }

  try {
    const response = await client.getEntries({
      content_type: 'homepageContent',
      limit: 1,
    });
    
    if (response.items.length > 0) {
      return response.items[0] as HomepageContentEntry;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Contentful API Error:', error);
    const { fallbackHomepageContent } = await import('./contentful-fallback');
    return fallbackHomepageContent;
  }
}

export async function getAboutPageContent(): Promise<AboutPageContentEntry | null> {
  if (!hasContentfulCredentials) {
    const { fallbackAboutPageContent } = await import('./contentful-fallback');
    return fallbackAboutPageContent;
  }

  try {
    const response = await client.getEntries({
      content_type: 'aboutPageContent',
      limit: 1,
      include: 2, // Include linked assets (images)
    });
    
    if (response.items.length > 0) {
      return response.items[0] as AboutPageContentEntry;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Contentful API Error:', error);
    const { fallbackAboutPageContent } = await import('./contentful-fallback');
    return fallbackAboutPageContent;
  }
}

export async function getGlobalSettings(): Promise<GlobalSettingsEntry | null> {
  // Content type 'globalSettings' doesn't exist in Contentful space - using fallback data
  console.log('Using fallback global settings - globalSettings content type not configured in Contentful');
  return fallbackGlobalSettings;
}

