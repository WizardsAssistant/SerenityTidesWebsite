"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { getMindfulnessTipAction } from "@/app/actions";
import { Sparkles, LoaderCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export function MindfulnessTipGenerator() {
  const [isPending, startTransition] = useTransition();
  const [tip, setTip] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleClick = () => {
    startTransition(async () => {
      setError(null);
      const result = await getMindfulnessTipAction();
      if (result.success && result.data) {
        setTip(result.data.mindfulnessTip);
      } else {
        setError(result.error || "Failed to generate a tip.");
      }
    });
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <p className="text-center text-muted-foreground">
        Tap the button below for a personalized mindfulness tip, crafted by our AI to complement your journey with Serenity Tides.
      </p>
      
      <Button onClick={handleClick} disabled={isPending} size="lg">
        {isPending ? (
          <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
        ) : (
          <Sparkles className="mr-2 h-5 w-5" />
        )}
        Generate Your Tip
      </Button>

      {error && (
        <Alert variant="destructive" className="w-full">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {tip && !isPending && (
        <div className="w-full pt-4">
          <Alert className="bg-accent/50 border-accent animate-in fade-in duration-500">
            <AlertTitle className="font-headline text-lg">Your Mindfulness Moment</AlertTitle>
            <AlertDescription className="text-accent-foreground/80 text-base">
              {tip}
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
}
