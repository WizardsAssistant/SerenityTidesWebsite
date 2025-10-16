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
    name: string;
    role: string;
    bio: string;
    avatar: {
      fields: {
        file: {
          url: string;
        };
      };
    };
    order: number;
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
  if (!hasContentfulCredentials) {
    console.log('Using fallback event data - configure Contentful credentials for CMS functionality');
    return fallbackEvents;
  }

  try {
    const response = await client.getEntries({
      content_type: 'event',
      order: 'fields.date',
    });
    return response.items as EventEntry[];
  } catch (error) {
    console.error('Error fetching events from Contentful, using fallback:', error);
    return fallbackEvents;
  }
}

export async function getTeamMembers(): Promise<TeamMemberEntry[]> {
  if (!hasContentfulCredentials) {
    console.log('Using fallback team data - configure Contentful credentials for CMS functionality');
    return fallbackTeamMembers;
  }

  try {
    const response = await client.getEntries({
      content_type: 'teamMember',
      order: 'fields.order',
    });
    return response.items as TeamMemberEntry[];
  } catch (error) {
    console.error('Error fetching team members from Contentful, using fallback:', error);
    return fallbackTeamMembers;
  }
}

export async function getPageContent(slug: string): Promise<PageContentEntry | null> {
  if (!hasContentfulCredentials) {
    console.log(`Using fallback page content for ${slug} - configure Contentful credentials for CMS functionality`);
    return (fallbackPageContent as any)[slug] || null;
  }

  try {
    const response = await client.getEntries({
      content_type: 'pageContent',
      'fields.slug': slug,
      limit: 1,
    });
    return response.items[0] as PageContentEntry || null;
  } catch (error) {
    console.error('Error fetching page content from Contentful, using fallback:', error);
    return (fallbackPageContent as any)[slug] || null;
  }
}

export async function getHomepageContent(): Promise<HomepageContentEntry | null> {
  // 🔍 DIAGNOSTIC LOGGING - Remove after fixing
  console.log('🔍 CONTENTFUL DEBUG - Environment Variables:');
  console.log('CONTENTFUL_SPACE_ID:', process.env.CONTENTFUL_SPACE_ID ? '✅ Present' : '❌ Missing');
  console.log('CONTENTFUL_ACCESS_TOKEN:', process.env.CONTENTFUL_ACCESS_TOKEN ? '✅ Present' : '❌ Missing');
  console.log('CONTENTFUL_ENVIRONMENT:', process.env.CONTENTFUL_ENVIRONMENT || 'master');
  console.log('hasContentfulCredentials:', hasContentfulCredentials);
  
  if (!hasContentfulCredentials) {
    console.log('🚨 Using fallback homepage content - Contentful credentials not available');
    const { fallbackHomepageContent } = await import('./contentful-fallback');
    return fallbackHomepageContent;
  }

  console.log('🚀 Attempting Contentful API call...');
  
  try {
    const response = await client.getEntries({
      content_type: 'homepageContent',
      limit: 1,
    });
    
    console.log('✅ Contentful API Success!');
    console.log('Response items count:', response.items.length);
    
    if (response.items.length > 0) {
      console.log('✅ Homepage content found!');
      console.log('Hero image present:', !!response.items[0].fields.heroBackgroundImage);
      return response.items[0] as HomepageContentEntry;
    } else {
      console.log('⚠️ No homepage content entries found');
      return null;
    }
  } catch (error) {
    console.error('🚨 Contentful API Error:', error);
    console.error('Error details:', {
      message: error.message,
      name: error.name,
      stack: error.stack
    });
    const { fallbackHomepageContent } = await import('./contentful-fallback');
    return fallbackHomepageContent;
  }
}

export async function getGlobalSettings(): Promise<GlobalSettingsEntry | null> {
  if (!hasContentfulCredentials) {
    console.log('Using fallback global settings - configure Contentful credentials for CMS functionality');
    return fallbackGlobalSettings;
  }

  try {
    const response = await client.getEntries({
      content_type: 'globalSettings',
      limit: 1,
    });
    return response.items[0] as GlobalSettingsEntry || null;
  } catch (error) {
    console.error('Error fetching global settings from Contentful, using fallback:', error);
    return fallbackGlobalSettings;
  }
}

