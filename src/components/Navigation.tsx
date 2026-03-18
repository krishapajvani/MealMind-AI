
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UtensilsCrossed, Heart, User, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { label: "Recommend", href: "/recommend", icon: Sparkles },
    { label: "Favorites", href: "/favorites", icon: Heart },
    { label: "Profile", href: "/profile", icon: User },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <UtensilsCrossed className="h-6 w-6 text-primary" />
          <span className="font-headline font-bold text-xl tracking-tight text-primary">MealMind AI</span>
        </Link>

        <div className="flex items-center gap-1 md:gap-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-primary/10",
                pathname === item.href ? "text-primary bg-primary/10" : "text-muted-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
