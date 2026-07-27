import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TEMPLATES } from "@/config/templates";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlayCircle, PenTool, Heart, Gift, Send, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "HamariKahani - Premium Digital Storytelling",
  description: "Create beautiful, personalized surprise pages for your loved ones.",
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      
      <main className="flex-1 flex flex-col min-h-screen bg-[hsl(340,20%,98%)] text-slate-800">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4 text-center max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100/50 text-pink-600 font-medium text-sm mb-4">
            <Sparkles className="w-4 h-4" />
            <span>The perfect gift for your special someone</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold font-playfair tracking-tight text-slate-900">
            Create Magical Surprises for Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 italic">Loved Ones</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Choose a premium template, customize it with your own feelings, and share a magical digital surprise in minutes.
          </p>
          <div className="pt-4 flex items-center justify-center gap-4">
            <Button size="lg" className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.97] transition-all" asChild>
              <Link href="#templates">
                Start Creating <Heart className="w-4 h-4 ml-2 fill-current" />
              </Link>
            </Button>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold font-playfair text-center mb-16 text-slate-900">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-12 text-center">
              <div className="space-y-4 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 mb-2">
                  <Gift className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold font-playfair">1. Choose Template</h3>
                <p className="text-slate-600">Select from our collection of premium romantic templates.</p>
              </div>
              <div className="space-y-4 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mb-2">
                  <PenTool className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold font-playfair">2. Customize</h3>
                <p className="text-slate-600">Add your own photos, messages, and memories.</p>
              </div>
              <div className="space-y-4 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 mb-2">
                  <Send className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold font-playfair">3. Share</h3>
                <p className="text-slate-600">Send the magical link to your special someone.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Templates Grid Section */}
        <section id="templates" className="py-20 px-4 md:px-8 max-w-7xl mx-auto w-full">
          <div className="text-center mb-16">
             <h2 className="text-4xl font-bold font-playfair mb-4 text-slate-900">Premium Templates</h2>
             <p className="text-lg text-slate-600">Find the perfect design to express your feelings.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEMPLATES.map((template) => (
              <div 
                key={template.id} 
                className="group relative flex flex-col bg-white/60 backdrop-blur-xl rounded-3xl border border-pink-100/30 overflow-hidden shadow-[0_8px_30px_rgba(236,72,153,0.08)] hover:shadow-[0_8px_40px_rgba(236,72,153,0.15)] transition-all duration-500"
              >
                {/* Cover Image */}
                <div className="aspect-[4/3] w-full overflow-hidden relative">
                  <img 
                    src={template.coverImage} 
                    alt={template.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-pink-600 shadow-sm">
                    {template.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-2xl font-bold font-playfair mb-2 text-slate-900">
                    {template.name}
                  </h3>
                  <p className="text-slate-600 text-sm flex-1 mb-8">
                    {template.description}
                  </p>

                  <div className="flex flex-col gap-4 mt-auto">
                    <div className="flex items-center justify-between border-t border-pink-100/50 pt-4">
                      <span className="text-slate-400 line-through text-sm font-medium tracking-wide">₹{template.originalPrice}</span>
                      <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">₹{template.price}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="w-full rounded-full gap-2 font-semibold border-pink-200 text-pink-600 hover:bg-pink-50 hover:text-pink-700 transition-colors" asChild>
                        <Link href={template.previewUrl} target="_blank">
                          <PlayCircle className="w-4 h-4" /> Preview
                        </Link>
                      </Button>
                      <Button className="w-full rounded-full gap-2 font-semibold bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:scale-[1.02] active:scale-[0.97] shadow-md transition-all" asChild>
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

        {/* Pricing Info Section */}
        <section id="pricing" className="py-20 px-4 bg-gradient-to-b from-transparent to-pink-50/50">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-4xl font-bold font-playfair text-slate-900">Simple, Transparent Pricing</h2>
            <p className="text-2xl text-slate-700">
              Just <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 text-4xl">₹99</span> per surprise
            </p>
            <p className="text-slate-600">No hidden fees, no subscriptions. Create a magical memory that lasts forever.</p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
