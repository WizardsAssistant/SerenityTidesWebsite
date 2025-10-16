import { MindfulnessTipGenerator } from "@/components/mindfulness-tip-generator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UpcomingEventBanner } from "@/components/upcoming-event-banner";
import { getHomepageContent, type HomepageContentEntry } from "@/lib/contentful";
import { Waves } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const homepageContent = await getHomepageContent();

  // Fallback to default values if no content is available
  const heroHeadline = homepageContent?.fields.heroHeadline || "Find Your Flow with Serenity Tides";
  const heroSubheading = homepageContent?.fields.heroSubheading || "Your personal guide to mindfulness, movement, and connection. Explore our events, discover our mission, and start your journey to a more peaceful you.";
  const heroImage = homepageContent?.fields.heroBackgroundImage;
  const primaryButtonText = homepageContent?.fields.primaryButtonText || "Explore Events";
  const primaryButtonLink = homepageContent?.fields.primaryButtonLink || "/events";
  const secondaryButtonText = homepageContent?.fields.secondaryButtonText || "About Us";
  const secondaryButtonLink = homepageContent?.fields.heroSecondaryButtonLink || "/about";

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <section className="relative mb-16">
        {/* Hero Background Image */}
        {heroImage && (
          <div className="absolute inset-0 -mx-4 -mt-8 md:-mt-16 rounded-lg overflow-hidden">
            <Image
              src={heroImage.fields.file.url.startsWith('//') ? `https:${heroImage.fields.file.url}` : heroImage.fields.file.url}
              alt={heroImage.fields.description || "Hero background"}
              fill
              className="object-cover opacity-60"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/80" />
          </div>
        )}
        
        {/* Hero Content */}
        <div className="relative z-10 text-center">
          <div className="inline-block p-4 bg-primary/20 rounded-full mb-4">
            <Waves className="w-12 h-12 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4 tracking-tight">
            {heroHeadline}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            {heroSubheading}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button asChild size="lg">
              <Link href={primaryButtonLink}>{primaryButtonText}</Link>
            </Button>
            {secondaryButtonText && (
              <Button asChild variant="secondary" size="lg">
                <Link href={secondaryButtonLink}>{secondaryButtonText}</Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      <section className="mb-16">
        <UpcomingEventBanner />
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
