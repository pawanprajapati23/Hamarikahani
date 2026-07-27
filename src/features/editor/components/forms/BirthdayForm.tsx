import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "@/components/ui/ImageUploader";
import { Button } from "@/components/ui/button";
import { Gift, Music, Heart, Sparkles, Image as ImageIcon, Camera } from "lucide-react";

interface BirthdayFormProps {
  formData: any;
  onChange: (data: any) => void;
}

const SUGGESTED_WISHES = [
  "Wishing you a lifetime of happiness, joy, and endless surprises! Have a wonderful day!",
  "May your special day be filled with beautiful moments and sweet memories.",
  "Happy Birthday! I hope all your birthday wishes and dreams come true.",
  "Another adventure-filled year awaits you. Welcome it by celebrating your birthday with pomp and splendor.",
  "Your birthday is the first day of another 365-day journey. Be the shining thread in the beautiful tapestry of the world."
];

export function BirthdayForm({ formData, onChange }: BirthdayFormProps) {
  const handleChange = (field: string, value: any) => {
    onChange({ ...formData, [field]: value });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 pb-10">
      
      {/* Header */}
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-3xl font-playfair font-bold text-slate-800 flex items-center justify-center gap-2">
          <Sparkles className="w-6 h-6 text-rose-500" />
          Birthday Details
          <Sparkles className="w-6 h-6 text-rose-500" />
        </h2>
        <p className="text-slate-500 text-sm">Create a magical and premium birthday experience.</p>
      </div>

      {/* Basic Info Card */}
      <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-xl shadow-rose-100/50 border border-rose-100 relative overflow-hidden group transition-all hover:shadow-rose-200/50 hover:bg-white/80">
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-rose-400 to-purple-500" />
        
        <h3 className="text-xl font-playfair font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Gift className="w-5 h-5 text-rose-500" /> Basic Information
        </h3>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="birthdayName" className="text-slate-700 font-semibold">Birthday Person's Name</Label>
            <Input 
              id="birthdayName"
              placeholder="e.g. Alex"
              value={formData.birthdayName || ""}
              onChange={e => handleChange("birthdayName", e.target.value)}
              className="bg-white/50 border-rose-200 focus:border-rose-400 focus:ring-rose-400/20 transition-all rounded-xl h-12 text-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="birthdayAge" className="text-slate-700 font-semibold">Age (Optional)</Label>
            <Input 
              id="birthdayAge"
              placeholder="e.g. 25"
              value={formData.birthdayAge || ""}
              onChange={e => handleChange("birthdayAge", e.target.value)}
              className="bg-white/50 border-rose-200 focus:border-rose-400 focus:ring-rose-400/20 transition-all rounded-xl h-12"
            />
          </div>
        </div>
      </div>

      {/* Message Card */}
      <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-xl shadow-rose-100/50 border border-rose-100 relative overflow-hidden transition-all hover:shadow-rose-200/50 hover:bg-white/80">
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-400 to-pink-500" />
        
        <h3 className="text-xl font-playfair font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Heart className="w-5 h-5 text-purple-500" /> Heartfelt Message
        </h3>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <Textarea 
              placeholder="Write your heartfelt message here..."
              value={formData.customMessage || ""}
              onChange={e => handleChange("customMessage", e.target.value)}
              className="min-h-[140px] bg-white/50 border-rose-200 focus:border-purple-400 focus:ring-purple-400/20 transition-all rounded-xl resize-none text-lg leading-relaxed p-4"
            />
          </div>
          
          <div className="space-y-3 bg-purple-50/50 p-4 rounded-2xl border border-purple-100">
            <p className="text-xs font-bold text-purple-600 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-3 h-3" /> Suggested Wishes (Click to use)
            </p>
            <div className="flex flex-col gap-2">
              {SUGGESTED_WISHES.map((wish, idx) => (
                <Button 
                  key={idx} 
                  variant="outline" 
                  size="sm" 
                  className="h-auto py-3 px-4 text-left justify-start whitespace-normal font-normal text-sm bg-white hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 transition-all rounded-xl border-purple-100 text-slate-600"
                  onClick={() => handleChange("customMessage", wish)}
                >
                  {wish}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Media Card */}
      <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-xl shadow-rose-100/50 border border-rose-100 relative overflow-hidden transition-all hover:shadow-rose-200/50 hover:bg-white/80">
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-pink-400 to-rose-500" />
        
        <h3 className="text-xl font-playfair font-bold text-slate-800 mb-6 flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-pink-500" /> Stunning Media
        </h3>
        
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3 bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
              <Label className="text-slate-700 font-semibold flex items-center gap-2">
                <Gift className="w-4 h-4" /> Gift Box / Cover (Step 1)
              </Label>
              <ImageUploader 
                value={formData.giftGif}
                onChange={(url) => handleChange("giftGif", url)}
                label=""
              />
              <p className="text-xs text-slate-500">The beautiful initial photo or GIF they will tap to open.</p>
            </div>

            <div className="space-y-3 bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
              <Label className="text-slate-700 font-semibold flex items-center gap-2">
                <Heart className="w-4 h-4" /> Main Photo / Cake GIF
              </Label>
              <ImageUploader 
                value={formData.cakeGif}
                onChange={(url) => handleChange("cakeGif", url)}
                label=""
              />
              <p className="text-xs text-slate-500">The main prominent visual for the hero section.</p>
            </div>
          </div>

          <div className="pt-4">
            <Label className="text-lg font-playfair font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Camera className="w-5 h-5 text-rose-500" /> Photo Gallery (Memories)
            </Label>
            <p className="text-sm text-slate-500 mb-6">Upload your beautiful memories to create a stunning glassmorphic gallery.</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="space-y-2 group">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider pl-1">Photo {num}</Label>
                  <div className="rounded-2xl overflow-hidden ring-2 ring-transparent transition-all group-hover:ring-rose-200">
                    <ImageUploader 
                      value={formData[`photo${num}`]}
                      onChange={(url) => handleChange(`photo${num}`, url)}
                      label=""
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
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
            Paste a valid Spotify or YouTube track link. It will elegantly play in the background while they scroll through your gift.
          </p>
        </div>
      </div>

    </div>
  );
}
