import { MindfulnessTipGenerator } from "@/components/mindfulness-tip-generator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Waves } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <section className="text-center mb-16">
        <div className="inline-block p-4 bg-primary/20 rounded-full mb-4">
          <Waves className="w-12 h-12 text-primary-foreground" />
        </div>
        <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4 tracking-tight">
          Find Your Flow with Serenity Tides
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Your personal guide to mindfulness, movement, and connection. Explore our events, discover our mission, and start your journey to a more peaceful you.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/events">Explore Events</Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href="/about">About Us</Link>
          </Button>
        </div>
      </section>

      <section>
        <Card className="max-w-2xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-headline text-center">Your Daily Dose of Calm</CardTitle>
          </CardHeader>
          <CardContent>
            <MindfulnessTipGenerator />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
