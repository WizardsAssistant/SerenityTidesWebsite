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
import { events } from "@/lib/events";

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
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-center">Stay Updated</CardTitle>
          <CardDescription className="text-center">
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

      <div className="space-y-8">
        {events.map((event) => (
          <Card key={event.title} className="flex flex-col md:flex-row overflow-hidden shadow-md max-w-4xl mx-auto">
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

      <section className="mt-16 pt-16 border-t">
        <NotificationForm />
      </section>
    </div>
  );
}
