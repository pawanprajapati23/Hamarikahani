import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TEMPLATES } from "@/config/templates";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlayCircle, PenTool } from "lucide-react";

export const metadata: Metadata = {
  title: "HamariKahani - Premium Digital Storytelling",
  description: "Create beautiful, personalized surprise pages for your loved ones.",
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      
      <main className="flex-1 flex flex-col min-h-screen bg-background">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold font-playfair tracking-tight text-foreground">
            Make Them Feel <span className="text-primary italic">Special</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Choose a premium template, customize it with your own feelings, and share a magical digital surprise in minutes.
          </p>
        </section>

        {/* Templates Grid Section */}
        <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEMPLATES.map((template) => (
              <div 
                key={template.id} 
                className="group relative flex flex-col bg-card rounded-3xl border border-border/50 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Cover Image */}
                <div className="aspect-[4/3] w-full overflow-hidden relative">
                  <img 
                    src={template.coverImage} 
                    alt={template.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium border border-border">
                    {template.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-2xl font-bold font-playfair mb-2 text-foreground">
                    {template.name}
                  </h3>
                  <p className="text-muted-foreground text-sm flex-1 mb-8">
                    {template.description}
                  </p>

                  <div className="flex flex-col gap-4 mt-auto">
                    <div className="flex items-center justify-between border-t border-border/50 pt-4">
                      <span className="text-muted-foreground line-through text-sm font-medium tracking-wide">₹{template.originalPrice}</span>
                      <span className="text-xl font-bold text-emerald-600 bg-emerald-500/10 px-3 py-1 rounded-full">₹{template.price}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="w-full rounded-full gap-2 font-semibold" asChild>
                        <Link href={template.previewUrl} target="_blank">
                          <PlayCircle className="w-4 h-4" /> Preview
                        </Link>
                      </Button>
                      <Button className="w-full rounded-full gap-2 font-semibold bg-foreground text-background hover:bg-foreground/90" asChild>
                        <Link href={template.createUrl}>
                          <PenTool className="w-4 h-4" /> Create
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
