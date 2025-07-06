"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import * as React from "react";

const events = [
  {
    title: "Sunrise Yoga on the Beach",
    date: "Saturday, August 24, 2024",
    time: "6:00 AM - 7:00 AM",
    location: "Sunny Side Beach",
    description: "Start your day with the rising sun. A gentle yoga flow suitable for all levels, set to the sound of the waves.",
    image: "https://placehold.co/600x400.png",
    hint: "beach yoga sunrise",
  },
  {
    title: "Guided Meditation Workshop (Virtual)",
    date: "Wednesday, August 28, 2024",
    time: "7:00 PM - 8:00 PM",
    location: "Online via Zoom",
    description: "Join us from the comfort of your home to explore various meditation techniques for stress reduction and mental clarity.",
    image: "https://placehold.co/600x400.png",
    hint: "person meditating indoors",
  },
  {
    title: "Mindful Movement Retreat",
    date: "Friday, September 6 - Sunday, September 8, 2024",
    time: "All Weekend",
    location: "Whispering Pines Center",
    description: "A full weekend dedicated to reconnecting with your body through mindful movement, nature walks, and community.",
    image: "https://placehold.co/600x400.png",
    hint: "serene forest retreat",
  },
];

function NotificationForm() {
  const { toast } = useToast();
  const [email, setEmail] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Subscription Successful!",
        description: `We'll send updates for ${email}.`,
      });
      setEmail("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Stay Updated</CardTitle>
          <CardDescription>
            Sign up for notifications about upcoming events and changes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">Subscribe</Button>
        </CardFooter>
      </Card>
    </form>
  );
}

export default function EventsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">
          Our Events
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Join our community for experiences designed to nourish your mind, body, and spirit.
        </p>
      </section>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-8">
            {events.map((event) => (
              <Card key={event.title} className="flex flex-col md:flex-row overflow-hidden shadow-md">
                <div className="md:w-1/3">
                  <Image
                    src={event.image}
                    alt={event.title}
                    data-ai-hint={event.hint}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="md:w-2/3 flex flex-col">
                  <CardHeader>
                    <CardTitle className="font-headline text-2xl">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <p className="mt-4">{event.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button>Register Now</Button>
                  </CardFooter>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <aside className="lg:col-span-1">
          <div className="sticky top-24">
            <NotificationForm />
          </div>
        </aside>
      </div>
    </div>
  );
}
