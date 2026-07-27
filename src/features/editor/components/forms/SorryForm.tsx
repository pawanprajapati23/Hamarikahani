import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "@/components/ui/ImageUploader";
import { Button } from "@/components/ui/button";
import { Music, Image as ImageIcon, HeartCrack, Plus, Trash2 } from "lucide-react";

interface SorryFormProps {
  formData: any;
  onChange: (data: any) => void;
}

const SUGGESTED_APOLOGIES = [
  "I messed up and I'm really sorry. Please forgive me?",
  "I know I was wrong and I feel terrible. Can we start over?",
  "You mean the world to me. I'm so sorry for hurting you.",
  "I made a mistake, but my love/friendship for you is real. I'm sorry.",
  "I was thoughtless and I apologize from the bottom of my heart."
];

const SUGGESTED_PROMISES = [
  "I promise to do better and never hurt you again.",
  "I will listen more and speak less. I promise.",
  "I'll make it up to you, whatever it takes.",
  "I promise to be the person you deserve.",
  "I will work on myself so this doesn't happen again."
];

export function SorryForm({ formData, onChange }: SorryFormProps) {
  const handleChange = (field: string, value: any) => {
    onChange({ ...formData, [field]: value });
  };

  const photos = formData.photos || [];

  const addPhoto = () => {
    handleChange("photos", [...photos, ""]);
  };

  const updatePhoto = (idx: number, url: string) => {
    const newPhotos = [...photos];
    newPhotos[idx] = url;
    handleChange("photos", newPhotos);
  };

  const removePhoto = (idx: number) => {
    const newPhotos = [...photos];
    newPhotos.splice(idx, 1);
    handleChange("photos", newPhotos);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
      {/* Brand Premium Header */}
      <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 p-6 rounded-2xl border border-emerald-200/50 dark:border-emerald-900/50">
        <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2 mb-2">
          <HeartCrack className="w-5 h-5" /> Heartfelt Apology
        </h3>
        <p className="text-sm text-muted-foreground">Craft a sincere and beautiful apology experience.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-1">
        <div className="space-y-3">
          <Label htmlFor="recipientName" className="text-foreground/80 font-semibold">Their Name</Label>
          <Input 
            id="recipientName"
            placeholder="e.g. Priya"
            value={formData.recipientName || ""}
            onChange={e => handleChange("recipientName", e.target.value)}
            className="h-12 rounded-xl border-emerald-100 dark:border-emerald-900/30 focus-visible:ring-emerald-500"
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="senderName" className="text-foreground/80 font-semibold">Your Name</Label>
          <Input 
            id="senderName"
            placeholder="e.g. Rahul"
            value={formData.senderName || ""}
            onChange={e => handleChange("senderName", e.target.value)}
            className="h-12 rounded-xl border-emerald-100 dark:border-emerald-900/30 focus-visible:ring-emerald-500"
          />
        </div>
      </div>

      <div className="space-y-6 px-1">
        <div className="space-y-3">
          <Label className="text-foreground/80 font-semibold">Apology Message</Label>
          <Textarea 
            placeholder="I am really sorry..."
            value={formData.message || ""}
            onChange={e => handleChange("message", e.target.value)}
            className="min-h-[120px] rounded-xl border-emerald-100 dark:border-emerald-900/30 focus-visible:ring-emerald-500 resize-none text-base"
          />
          
          <div className="space-y-2 mt-2">
            <p className="text-xs font-semibold text-emerald-600/80 uppercase tracking-wider">Suggested Apologies</p>
            <div className="flex flex-col gap-2">
              {SUGGESTED_APOLOGIES.map((msg, idx) => (
                <Button 
                  key={idx} 
                  variant="outline" 
                  size="sm" 
                  className="h-auto py-2.5 px-4 text-left justify-start whitespace-normal font-normal text-sm rounded-xl hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-950/30 transition-colors border-dashed"
                  onClick={() => handleChange("message", msg)}
                >
                  {msg}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-foreground/80 font-semibold">Your Promise</Label>
          <Textarea 
            placeholder="I promise to..."
            value={formData.promiseText || ""}
            onChange={e => handleChange("promiseText", e.target.value)}
            className="min-h-[80px] rounded-xl border-emerald-100 dark:border-emerald-900/30 focus-visible:ring-emerald-500 resize-none"
          />
          
          <div className="space-y-2 mt-2">
            <p className="text-xs font-semibold text-emerald-600/80 uppercase tracking-wider">Suggested Promises</p>
            <div className="flex flex-col gap-2">
              {SUGGESTED_PROMISES.map((msg, idx) => (
                <Button 
                  key={idx} 
                  variant="outline" 
                  size="sm" 
                  className="h-auto py-2.5 px-4 text-left justify-start whitespace-normal font-normal text-sm rounded-xl hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-950/30 transition-colors border-dashed"
                  onClick={() => handleChange("promiseText", msg)}
                >
                  {msg}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6 pt-6 border-t border-border/50">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-teal-500" />
          <h3 className="text-lg font-bold">Media & Gallery</h3>
        </div>
        
        <div className="space-y-3 p-4 bg-muted/30 rounded-2xl">
          <Label className="text-foreground/80 font-semibold">Sad/Apologetic GIF or Photo</Label>
          <ImageUploader 
            value={formData.sadGifUrl}
            onChange={(url) => handleChange("sadGifUrl", url)}
            label=""
          />
          <p className="text-xs text-muted-foreground">Shown while asking for forgiveness.</p>
        </div>

        <div className="space-y-3 p-4 bg-muted/30 rounded-2xl">
          <Label className="text-foreground/80 font-semibold">Happy/Celebration GIF or Photo</Label>
          <ImageUploader 
            value={formData.happyGifUrl}
            onChange={(url) => handleChange("happyGifUrl", url)}
            label=""
          />
          <p className="text-xs text-muted-foreground">Shown after they click "I Forgive You".</p>
        </div>

        {/* Photo Gallery Section */}
        <div className="space-y-4 p-5 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 dark:from-emerald-950/20 dark:to-teal-950/20 rounded-2xl border border-emerald-100 dark:border-emerald-900/30">
          <div>
            <Label className="text-foreground/80 font-semibold text-base">Good Times Gallery</Label>
            <p className="text-xs text-muted-foreground mt-1">Remind them of the good times by adding some memories.</p>
          </div>
          
          <div className="space-y-4">
            {photos.map((photo: string, idx: number) => (
              <div key={idx} className="flex items-start gap-3 bg-white dark:bg-black/40 p-3 rounded-xl border border-border/50">
                <div className="flex-1">
                  <ImageUploader 
                    value={photo}
                    onChange={(url) => updatePhoto(idx, url)}
                    label={`Photo ${idx + 1}`}
                  />
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0 mt-8"
                  onClick={() => removePhoto(idx)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            
            <Button 
              type="button" 
              variant="outline" 
              className="w-full border-dashed border-2 rounded-xl h-14 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-950/30 transition-colors"
              onClick={addPhoto}
            >
              <Plus className="w-4 h-4 mr-2" /> Add Memory Photo
            </Button>
          </div>
        </div>

        <div className="space-y-3 p-5 bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-950/20 dark:to-emerald-950/20 rounded-2xl border border-teal-100 dark:border-teal-900/30 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Music className="w-24 h-24" />
          </div>
          <div className="relative z-10">
            <Label htmlFor="musicUrl" className="text-teal-700 dark:text-teal-300 font-bold flex items-center gap-2 text-base">
              <Music className="w-4 h-4" /> Background Music
            </Label>
            <p className="text-xs text-teal-600/70 dark:text-teal-400/70 mb-3">Add a touching Spotify or YouTube track</p>
            <Input 
              id="musicUrl"
              placeholder="e.g. https://open.spotify.com/track/..."
              value={formData.musicUrl || ""}
              onChange={e => handleChange("musicUrl", e.target.value)}
              className="h-12 rounded-xl border-teal-200 dark:border-teal-800/50 focus-visible:ring-teal-500 bg-white/80 dark:bg-black/50 backdrop-blur-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
