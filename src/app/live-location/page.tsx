import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function LiveLocationPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">
          Live Event Location
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Find us in real-time during our outdoor pop-up events. The map below will be active during event hours.
        </p>
      </section>

      <section>
        <Card className="overflow-hidden shadow-lg">
          <CardContent className="p-0">
            <Image
              src="https://placehold.co/1200x600.png"
              alt="Live map placeholder"
              data-ai-hint="world map"
              width={1200}
              height={600}
              className="w-full object-cover"
            />
          </CardContent>
        </Card>
        <p className="text-center mt-4 text-sm text-muted-foreground">
          Map is currently inactive. Please check back during our next pop-up event!
        </p>
      </section>
    </div>
  );
}
