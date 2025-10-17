"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Waves } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LogoIcon } from "../icons";

const navLinks = [
  { href: "/about", label: "About Us" },
  { href: "/events", label: "Events" },
  { href: "/live-location", label: "Live Location" },
];

export function AppHeader() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <LogoIcon className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block font-headline">
              Serenity Tides
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Link
              href="/"
              className="flex items-center"
              onClick={() => setOpen(false)}
            >
              <LogoIcon className="mr-2 h-6 w-6" />
              <span className="font-bold font-headline">Serenity Tides</span>
            </Link>
            <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
              <div className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-muted-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <Link href="/" className="flex items-center space-x-2 md:hidden">
          <LogoIcon className="h-6 w-6" />
          <span className="font-bold font-headline">Serenity Tides</span>
        </Link>
      </div>
    </header>
  );
}
