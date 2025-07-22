// Fallback data that matches Contentful structure
// This allows the website to work without Contentful credentials during development

export const fallbackEvents = [
  {
    fields: {
      title: "2025 Summer Series - Week 1: Mindful Mornings",
      date: "2025-06-14T08:00:00",
      time: "8:00 AM - 10:00 AM",
      location: "Lincoln Park, Chicago",
      description: "Join us for the opening session of our 2025 Summer Series! Start your weekend with gentle yoga flows and guided meditation in the heart of Chicago.",
      image: {
        fields: {
          file: {
            url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&crop=center"
          }
        }
      },
      slug: "summer-series-week-1"
    }
  },
  {
    fields: {
      title: "2025 Summer Series - Week 2: Sunset Serenity",
      date: "2025-06-21T18:00:00",
      time: "6:00 PM - 8:00 PM",
      location: "Millennium Park, Chicago",
      description: "Experience the magic of sunset meditation and restorative yoga practices as we continue our summer journey together.",
      image: {
        fields: {
          file: {
            url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop&crop=center"
          }
        }
      },
      slug: "summer-series-week-2"
    }
  },
  {
    fields: {
      title: "2025 Summer Series - Week 3: Community Connection",
      date: "2025-06-28T10:00:00",
      time: "10:00 AM - 12:00 PM",
      location: "Grant Park, Chicago",
      description: "Build deeper connections with fellow practitioners through partner yoga, group meditation, and mindful movement exercises.",
      image: {
        fields: {
          file: {
            url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&crop=center"
          }
        }
      },
      slug: "summer-series-week-3"
    }
  },
  {
    fields: {
      title: "2025 Summer Series - Week 4: Nature's Embrace",
      date: "2025-07-05T09:00:00",
      time: "9:00 AM - 11:00 AM",
      location: "North Avenue Beach, Chicago",
      description: "Connect with the natural elements as we practice by Lake Michigan, incorporating the sounds and energy of water into our session.",
      image: {
        fields: {
          file: {
            url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&crop=center"
          }
        }
      },
      slug: "summer-series-week-4"
    }
  }
];

export const fallbackTeamMembers = [
  {
    fields: {
      name: "Erik Beitel",
      role: "Founder & Lead Instructor",
      bio: "Erik founded Serenity Tides with a vision of bringing mindful practices to urban communities. With over 10 years of experience in yoga and meditation, he creates welcoming spaces for all practitioners.",
      avatar: {
        fields: {
          file: {
            url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
          }
        }
      },
      order: 1
    }
  },
  {
    fields: {
      name: "Julia Fetty",
      role: "Yoga & Movement Specialist",
      bio: "Julia brings a dynamic approach to movement, blending traditional yoga with modern fitness techniques. Her classes are known for their inclusive atmosphere and creative sequences.",
      avatar: {
        fields: {
          file: {
            url: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
          }
        }
      },
      order: 2
    }
  },
  {
    fields: {
      name: "Amanda LeVine",
      role: "Community Manager",
      bio: "Amanda ensures our community feels connected and supported. She coordinates events, manages communications, and helps create the warm, welcoming environment Serenity Tides is known for.",
      avatar: {
        fields: {
          file: {
            url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
          }
        }
      },
      order: 3
    }
  },
  {
    fields: {
      name: "Isabel Fudali",
      role: "Mindfulness Coach",
      bio: "Isabel specializes in meditation and mindfulness practices. Her gentle guidance helps participants develop sustainable daily practices for stress reduction and mental clarity.",
      avatar: {
        fields: {
          file: {
            url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face"
          }
        }
      },
      order: 4
    }
  },
  {
    fields: {
      name: "Drew Schwartz",
      role: "Creative Director",
      bio: "Drew brings artistic vision to our events and communications. He ensures that every aspect of the Serenity Tides experience reflects our values of beauty, authenticity, and connection.",
      avatar: {
        fields: {
          file: {
            url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
          }
        }
      },
      order: 5
    }
  }
];

export const fallbackPageContent = {
  homepage: {
    fields: {
      title: "Find Your Flow with Serenity Tides",
      content: "Your personal guide to mindfulness, movement, and connection. Explore our events, discover our mission, and start your journey to a more peaceful you.",
      slug: "homepage"
    }
  },
  about: {
    fields: {
      title: "About Serenity Tides",
      content: "We believe in the transformative power of integrating mind, body, and nature. Our mission is to guide you towards a more peaceful and connected life. Following the success of our 2024 event at Gilson Beach, we're excited to bring you our 2025 Summer Series in Chicago, continuing our journey of mindful community building.",
      slug: "about"
    }
  }
};

export const fallbackGlobalSettings = {
  fields: {
    siteName: "Serenity Tides",
    siteDescription: "Your guide to mindfulness, movement, and connection with Serenity Tides.",
    contactEmail: "hello@serenitytides.com",
    contactPhone: "(555) 123-4567",
    address: "Chicago, IL",
    socialMedia: {
      instagram: "https://instagram.com/serenitytides",
      facebook: "https://facebook.com/serenitytides"
    }
  }
};

