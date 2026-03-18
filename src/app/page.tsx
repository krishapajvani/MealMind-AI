
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Utensils, Sparkles, Clock, UserCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-food');

  return (
    <>
      <Navigation />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16 pb-32">
          <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                <Sparkles className="h-4 w-4" />
                AI-Powered Recipe Inspiration
              </div>
              <h1 className="text-5xl md:text-7xl font-headline font-bold text-primary leading-tight">
                Your Personal <br />
                <span className="text-accent">AI Chef</span> Awaits.
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
                Unlock creative, personalized meal recommendations based on your mood, 
                available ingredients, and dietary preferences. Stop asking "what's for dinner?" 
                and start cooking something extraordinary.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg h-14 px-8">
                  <Link href="/recommend">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-primary/20 text-lg h-14 px-8">
                  <Link href="/profile">Set Preferences</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-accent/20 rounded-full blur-3xl opacity-50 animate-pulse"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <Image 
                  src={heroImage?.imageUrl || "https://picsum.photos/seed/meal1/1200/800"} 
                  alt="Delicious Healthy Meal" 
                  width={600} 
                  height={400} 
                  className="object-cover w-full h-full"
                  priority
                  data-ai-hint="healthy food"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-4xl font-headline font-bold text-primary">Why MealMind AI?</h2>
              <p className="text-lg text-muted-foreground">
                We combine the latest in artificial intelligence with culinary expertise to deliver
                recommendations that actually work for your life.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Smart Reasoning",
                  desc: "Our AI understands ingredient pairings and cooking techniques to provide realistic recipes.",
                  icon: Utensils,
                },
                {
                  title: "Dietary Respect",
                  desc: "Your allergies and restrictions aren't just filters; they're the foundation of every suggestion.",
                  icon: UserCheck,
                },
                {
                  title: "Time Efficient",
                  desc: "Get estimated prep times for every meal, helping you plan your busy schedule perfectly.",
                  icon: Clock,
                }
              ].map((feature, i) => (
                <div key={i} className="p-8 rounded-2xl bg-background border border-primary/5 hover:border-primary/20 transition-all hover:shadow-md group">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-headline font-bold text-primary mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 bg-background">
        <div className="container mx-auto px-4 text-center space-y-4">
          <div className="flex justify-center items-center gap-2">
            <Utensils className="h-5 w-5 text-primary" />
            <span className="font-headline font-bold text-lg text-primary">MealMind AI</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} MealMind AI. Healthy eating, simplified by intelligence.
          </p>
        </div>
      </footer>
    </>
  );
}
