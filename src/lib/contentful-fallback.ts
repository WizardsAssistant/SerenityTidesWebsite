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
      Name: "Erik Beitel",
      Role: "Founder & Lead Instructor",
      Bio: "Erik founded Serenity Tides with a vision of bringing mindful practices to urban communities. With over 10 years of experience in yoga and meditation, he creates welcoming spaces for all practitioners.",
      Avatar: {
        fields: {
          file: {
            url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
          }
        }
      },
      Order: 1
    }
  },
  {
    fields: {
      Name: "Julia Fetty",
      Role: "Yoga & Movement Specialist",
      Bio: "Julia brings a dynamic approach to movement, blending traditional yoga with modern fitness techniques. Her classes are known for their inclusive atmosphere and creative sequences.",
      Avatar: {
        fields: {
          file: {
            url: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
          }
        }
      },
      Order: 2
    }
  },
  {
    fields: {
      Name: "Amanda LeVine",
      Role: "Community Manager",
      Bio: "Amanda ensures our community feels connected and supported. She coordinates events, manages communications, and helps create the warm, welcoming environment Serenity Tides is known for.",
      Avatar: {
        fields: {
          file: {
            url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
          }
        }
      },
      Order: 3
    }
  },
  {
    fields: {
      Name: "Isabel Fudali",
      Role: "Mindfulness Coach",
      Bio: "Isabel specializes in meditation and mindfulness practices. Her gentle guidance helps participants develop sustainable daily practices for stress reduction and mental clarity.",
      Avatar: {
        fields: {
          file: {
            url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face"
          }
        }
      },
      Order: 4
    }
  },
  {
    fields: {
      Name: "Drew Schwartz",
      Role: "Creative Director",
      Bio: "Drew brings artistic vision to our events and communications. He ensures that every aspect of the Serenity Tides experience reflects our values of beauty, authenticity, and connection.",
      Avatar: {
        fields: {
          file: {
            url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
          }
        }
      },
      Order: 5
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

export const fallbackAboutPageContent = {
  fields: {
    About_Us_Text: "We believe in the transformative power of integrating mind, body, and nature. Our mission is to guide you towards a more peaceful and connected life.",
    About_Us_Secondary_Text: "Following the success of our 2024 event at Gilson Beach, we're excited to bring you our 2025 Summer Series in Chicago, continuing our journey of mindful community building.",
    Our_Mission_Text: "To provide accessible, high-quality mindfulness and movement experiences that foster inner peace and community connection.",
    Our_Values_Text: "We value authenticity, compassion, inclusivity, and a deep respect for the natural world in all that we do.",
    Our_Approach_Text: "We blend ancient wisdom with modern science, creating unique events that are both grounding and uplifting."
  }
};

export const fallbackHomepageContent = {
  fields: {
    heroHeadline: "Find Your Flow with Serenity Tides",
    heroSubheading: "Discover inner peace and mindful living through our transformative meditation retreats, wellness workshops, and spiritual guidance. Join our community of seekers on a journey toward deeper awareness and lasting serenity.",
    heroBackgroundImage: {
      fields: {
        file: {
          url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=500&fit=crop&crop=center",
          details: {
            image: {
              width: 1200,
              height: 500
            }
          }
        },
        title: "Serenity Tides Hero Background",
        description: "Peaceful ocean waves representing tranquility and mindfulness"
      }
    },
    primaryButtonText: "Explore Events",
    primaryButtonLink: "/events",
    secondaryButtonText: "About Us",
    heroSecondaryButtonLink: "/about"
  }
};

