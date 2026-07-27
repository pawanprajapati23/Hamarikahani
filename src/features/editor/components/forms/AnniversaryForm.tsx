import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "@/components/ui/ImageUploader";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Heart, Music, Image as ImageIcon, Map, Sparkles, Stars, CalendarHeart } from "lucide-react";

interface AnniversaryFormProps {
  formData: any;
  onChange: (data: any) => void;
}

const SUGGESTED_MESSAGES = [
  "Every love story is beautiful, but ours is my favorite. Happy Anniversary!",
  "Thank you for being my partner in life, my best friend, and my true love.",
  "Another year of making beautiful memories together. I love you!",
  "To the person who makes my heart skip a beat even after all these years."
];

export function AnniversaryForm({ formData, onChange }: AnniversaryFormProps) {
  const handleChange = (field: string, value: any) => {
    onChange({ ...formData, [field]: value });
  };

  const handleTimelineChange = (index: number, field: string, value: any) => {
    const newTimeline = [...(formData.timelineEvents || [])];
    newTimeline[index] = { ...newTimeline[index], [field]: value };
    handleChange("timelineEvents", newTimeline);
  };

  const addTimelineEvent = () => {
    const newTimeline = [...(formData.timelineEvents || [])];
    newTimeline.push({ year: "", title: "", image: "" });
    handleChange("timelineEvents", newTimeline);
  };

  const removeTimelineEvent = (index: number) => {
    const newTimeline = [...(formData.timelineEvents || [])];
    newTimeline.splice(index, 1);
    handleChange("timelineEvents", newTimeline);
  };

  // Initialize timeline if empty
  if (!formData.timelineEvents) {
    handleChange("timelineEvents", [
      { year: "2018", title: "First Met", image: "" },
      { year: "2021", title: "Tied the Knot", image: "" }
    ]);
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 pb-10">
      
      {/* Header */}
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-3xl font-playfair font-bold text-slate-800 flex items-center justify-center gap-2">
          <Stars className="w-6 h-6 text-rose-500" />
          Anniversary Details
          <Stars className="w-6 h-6 text-rose-500" />
        </h2>
        <p className="text-slate-500 text-sm">Design a breathtaking journey of your love story.</p>
      </div>

      {/* Basic Info Card */}
      <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-xl shadow-rose-100/50 border border-rose-100 relative overflow-hidden transition-all hover:shadow-rose-200/50 hover:bg-white/80">
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-rose-400 to-pink-500" />
        
        <h3 className="text-xl font-playfair font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Heart className="w-5 h-5 text-rose-500" /> Our Details
        </h3>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="coupleNames" className="text-slate-700 font-semibold">Couple Names</Label>
            <Input 
              id="coupleNames"
              placeholder="e.g. Rahul & Priya"
              value={formData.coupleNames || ""}
              onChange={e => handleChange("coupleNames", e.target.value)}
              className="bg-white/50 border-rose-200 focus:border-rose-400 focus:ring-rose-400/20 transition-all rounded-xl h-12 text-lg"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-2">
              <Label htmlFor="years" className="text-slate-700 font-semibold">Years Celebrating</Label>
              <Input 
                id="years"
                placeholder="e.g. 5"
                value={formData.years || ""}
                onChange={e => handleChange("years", e.target.value)}
                className="bg-white/50 border-rose-200 focus:border-rose-400 focus:ring-rose-400/20 transition-all rounded-xl h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="anniversaryDate" className="text-slate-700 font-semibold flex items-center gap-2">
                Anniversary Date
              </Label>
              <Input 
                id="anniversaryDate"
                placeholder="e.g. Oct 12, 2021"
                value={formData.anniversaryDate || ""}
                onChange={e => handleChange("anniversaryDate", e.target.value)}
                className="bg-white/50 border-rose-200 focus:border-rose-400 focus:ring-rose-400/20 transition-all rounded-xl h-12"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Message Card */}
      <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-xl shadow-rose-100/50 border border-rose-100 relative overflow-hidden transition-all hover:shadow-rose-200/50 hover:bg-white/80">
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-400 to-rose-400" />
        
        <h3 className="text-xl font-playfair font-bold text-slate-800 mb-6 flex items-center gap-2">
          <CalendarHeart className="w-5 h-5 text-purple-500" /> Heartfelt Message
        </h3>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <Textarea 
              placeholder="Write your beautiful anniversary message here..."
              value={formData.message || ""}
              onChange={e => handleChange("message", e.target.value)}
              className="min-h-[140px] bg-white/50 border-rose-200 focus:border-purple-400 focus:ring-purple-400/20 transition-all rounded-xl resize-none text-lg leading-relaxed p-4"
            />
          </div>
          
          <div className="space-y-3 bg-purple-50/50 p-4 rounded-2xl border border-purple-100">
            <p className="text-xs font-bold text-purple-600 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-3 h-3" /> Suggested Messages
            </p>
            <div className="flex flex-col gap-2">
              {SUGGESTED_MESSAGES.map((wish, idx) => (
                <Button 
                  key={idx} 
                  variant="outline" 
                  size="sm" 
                  className="h-auto py-3 px-4 text-left justify-start whitespace-normal font-normal text-sm bg-white hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 transition-all rounded-xl border-purple-100 text-slate-600"
                  onClick={() => handleChange("message", wish)}
                >
                  {wish}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cover Photo Card */}
      <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-xl shadow-rose-100/50 border border-rose-100 relative overflow-hidden transition-all hover:shadow-rose-200/50 hover:bg-white/80">
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-pink-400 to-rose-500" />
        
        <h3 className="text-xl font-playfair font-bold text-slate-800 mb-6 flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-pink-500" /> Cover Photo
        </h3>
        
        <div className="space-y-3 bg-rose-50/30 p-6 rounded-2xl border border-rose-100">
          <ImageUploader 
            value={formData.coverPhoto}
            onChange={(url) => handleChange("coverPhoto", url)}
            label=""
          />
          <p className="text-sm text-slate-600 mt-4 text-center">
            This photo sets the mood. It appears as a stunning, full-screen cinematic backdrop at the top of your page.
          </p>
        </div>
      </div>

      {/* Timeline Card */}
      <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-xl shadow-rose-100/50 border border-rose-100 relative overflow-hidden transition-all hover:shadow-rose-200/50 hover:bg-white/80">
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-400 to-purple-500" />
        
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <h3 className="text-xl font-playfair font-bold text-slate-800 flex items-center gap-2">
            <Map className="w-5 h-5 text-indigo-500" /> Our Journey
          </h3>
          <Button onClick={addTimelineEvent} className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl gap-2 h-10 shadow-lg shadow-indigo-200 transition-all">
            <Plus className="w-4 h-4" /> Add Memory
          </Button>
        </div>
        
        <div className="space-y-6">
          {(formData.timelineEvents || []).map((event: any, idx: number) => (
            <div key={idx} className="p-6 bg-white/80 rounded-2xl border border-indigo-100 shadow-sm space-y-6 relative group transition-all hover:shadow-md hover:border-indigo-200">
              
              <Button 
                variant="destructive" 
                size="icon" 
                className="absolute -top-3 -right-3 h-8 w-8 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all z-10 scale-90 group-hover:scale-100"
                onClick={() => removeTimelineEvent(idx)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-slate-700 font-semibold">Year / Date</Label>
                    <Input 
                      placeholder="e.g. 2018"
                      value={event.year || ""}
                      onChange={e => handleTimelineChange(idx, "year", e.target.value)}
                      className="bg-indigo-50/30 border-indigo-100 focus:border-indigo-300 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-700 font-semibold">Memory Title</Label>
                    <Input 
                      placeholder="e.g. First Met"
                      value={event.title || ""}
                      onChange={e => handleTimelineChange(idx, "title", e.target.value)}
                      className="bg-indigo-50/30 border-indigo-100 focus:border-indigo-300 rounded-xl"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-slate-700 font-semibold">Memory Photo</Label>
                  <div className="rounded-xl overflow-hidden">
                    <ImageUploader 
                      value={event.image}
                      onChange={(url) => handleTimelineChange(idx, "image", url)}
                      label=""
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Music Card */}
      <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-xl shadow-rose-100/50 border border-rose-100 relative overflow-hidden transition-all hover:shadow-rose-200/50 hover:bg-white/80">
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-rose-400 to-orange-400" />
        
        <h3 className="text-xl font-playfair font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Music className="w-5 h-5 text-rose-500" /> Background Music
        </h3>
        
        <div className="space-y-3 bg-rose-50/30 p-6 rounded-2xl border border-rose-100">
          <Label htmlFor="musicUrl" className="text-slate-700 font-semibold">Spotify or YouTube URL</Label>
          <Input 
            id="musicUrl"
            placeholder="e.g. https://open.spotify.com/track/..."
            value={formData.musicUrl || ""}
            onChange={e => handleChange("musicUrl", e.target.value)}
            className="bg-white/80 border-rose-200 focus:border-rose-400 focus:ring-rose-400/20 transition-all rounded-xl h-12"
          />
          <p className="text-sm text-slate-600 mt-2">
            Paste a valid Spotify or YouTube track link. Enhance your romantic journey with beautiful background music.
          </p>
        </div>
      </div>
      
    </div>
  );
}
