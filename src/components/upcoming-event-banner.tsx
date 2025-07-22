"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Calendar, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { getEvents, type EventEntry } from '@/lib/contentful';
import { useEffect, useState } from 'react';

export function UpcomingEventBanner() {
  const [upcomingEvent, setUpcomingEvent] = useState<EventEntry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUpcomingEvent() {
      try {
        const events = await getEvents();
        if (events.length > 0) {
          setUpcomingEvent(events[0]);
        }
      } catch (error) {
        console.error('Error loading upcoming event:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUpcomingEvent();
  }, []);

  if (loading) {
    return (
      <Card className="w-full overflow-hidden shadow-lg">
        <div className="p-8 text-center">
          <p>Loading upcoming event...</p>
        </div>
      </Card>
    );
  }

  if (!upcomingEvent) {
    return null;
  }

  return (
    <Card className="w-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="md:grid md:grid-cols-2">
        <div className="relative h-64 md:h-auto">
          <Image
            src={upcomingEvent.fields.image.fields.file.url}
            alt={upcomingEvent.fields.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6 sm:p-8 flex flex-col justify-center">
          <CardHeader className="p-0">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Upcoming Event</p>
            <CardTitle className="text-3xl font-headline text-card-foreground">{upcomingEvent.fields.title}</CardTitle>
          </CardHeader>
          <CardContent className="p-0 mt-4 mb-6">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-5 h-5" />
              <span>{new Date(upcomingEvent.fields.date).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
          </CardContent>
          <CardFooter className="p-0">
            <Button asChild size="lg" className="group">
              <Link href="/events">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
