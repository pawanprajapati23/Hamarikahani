import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "@/components/ui/ImageUploader";
import { Button } from "@/components/ui/button";
import { Music, Image as ImageIcon, Heart, Plus, Trash2 } from "lucide-react";

interface ValentineFormProps {
  formData: any;
  onChange: (data: any) => void;
}

const SUGGESTED_MESSAGES = [
  "You make every day feel like Valentine's Day. I love you!",
  "I'm so lucky to have you in my life. Will you be mine forever?",
  "Every moment with you is magical. Happy Valentine's Day!",
  "You are my sunshine on a cloudy day. I love you more than words can say.",
  "You stole my heart, but I'll let you keep it. Be my Valentine?"
];

export function ValentineForm({ formData, onChange }: ValentineFormProps) {
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
      <div className="bg-gradient-to-r from-rose-500/10 to-purple-500/10 p-6 rounded-2xl border border-rose-200/50 dark:border-rose-900/50">
        <h3 className="text-lg font-bold text-rose-600 dark:text-rose-400 flex items-center gap-2 mb-2">
          <Heart className="w-5 h-5" /> Romantic Details
        </h3>
        <p className="text-sm text-muted-foreground">Customize your Valentine's proposal with a premium touch.</p>
      </div>

      <div className="space-y-6 px-1">
        <div className="space-y-3">
          <Label htmlFor="partnerName" className="text-foreground/80 font-semibold">Partner's Name</Label>
          <Input 
            id="partnerName"
            placeholder="e.g. My Love"
            value={formData.partnerName || ""}
            onChange={e => handleChange("partnerName", e.target.value)}
            className="h-12 rounded-xl border-rose-100 dark:border-rose-900/30 focus-visible:ring-rose-500"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="questionText" className="text-foreground/80 font-semibold">The Question</Label>
          <Input 
            id="questionText"
            placeholder="Will you be my Valentine?"
            value={formData.questionText || ""}
            onChange={e => handleChange("questionText", e.target.value)}
            className="h-12 rounded-xl border-rose-100 dark:border-rose-900/30 focus-visible:ring-rose-500 text-lg"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <Label htmlFor="yesButtonText" className="text-foreground/80 font-semibold">Yes Button</Label>
            <Input 
              id="yesButtonText"
              placeholder="Yes!"
              value={formData.yesButtonText || ""}
              onChange={e => handleChange("yesButtonText", e.target.value)}
              className="rounded-xl border-rose-100 dark:border-rose-900/30 focus-visible:ring-rose-500"
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="noButtonText" className="text-foreground/80 font-semibold">No Button (Dodging)</Label>
            <Input 
              id="noButtonText"
              placeholder="No"
              value={formData.noButtonText || ""}
              onChange={e => handleChange("noButtonText", e.target.value)}
              className="rounded-xl border-rose-100 dark:border-rose-900/30 focus-visible:ring-rose-500"
            />
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-foreground/80 font-semibold">Success Message</Label>
          <Textarea 
            placeholder="Yayy! I love you! ❤️"
            value={formData.successMessage || ""}
            onChange={e => handleChange("successMessage", e.target.value)}
            className="min-h-[100px] rounded-xl border-rose-100 dark:border-rose-900/30 focus-visible:ring-rose-500 resize-none"
          />
          
          <div className="space-y-2 mt-2">
            <p className="text-xs font-semibold text-rose-500/80 uppercase tracking-wider">Suggested Messages</p>
            <div className="flex flex-col gap-2">
              {SUGGESTED_MESSAGES.map((wish, idx) => (
                <Button 
                  key={idx} 
                  variant="outline" 
                  size="sm" 
                  className="h-auto py-2.5 px-4 text-left justify-start whitespace-normal font-normal text-sm rounded-xl hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/30 transition-colors border-dashed"
                  onClick={() => handleChange("successMessage", wish)}
                >
                  {wish}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6 pt-6 border-t border-border/50">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-purple-500" />
          <h3 className="text-lg font-bold">Media & Gallery</h3>
        </div>
        
        <div className="space-y-3 p-4 bg-muted/30 rounded-2xl">
          <Label className="text-foreground/80 font-semibold">Question GIF/Photo</Label>
          <ImageUploader 
            value={formData.gifUrl1}
            onChange={(url) => handleChange("gifUrl1", url)}
            label=""
          />
          <p className="text-xs text-muted-foreground">Shown while asking the question.</p>
        </div>

        <div className="space-y-3 p-4 bg-muted/30 rounded-2xl">
          <Label className="text-foreground/80 font-semibold">Success GIF/Photo</Label>
          <ImageUploader 
            value={formData.gifUrl2}
            onChange={(url) => handleChange("gifUrl2", url)}
            label=""
          />
          <p className="text-xs text-muted-foreground">Shown after they click Yes.</p>
        </div>

        {/* Photo Gallery Section */}
        <div className="space-y-4 p-5 bg-gradient-to-br from-rose-50/50 to-purple-50/50 dark:from-rose-950/20 dark:to-purple-950/20 rounded-2xl border border-rose-100 dark:border-rose-900/30">
          <div>
            <Label className="text-foreground/80 font-semibold text-base">Memory Gallery</Label>
            <p className="text-xs text-muted-foreground mt-1">Upload beautiful photos to show a gallery after they say Yes.</p>
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
              className="w-full border-dashed border-2 rounded-xl h-14 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/30 transition-colors"
              onClick={addPhoto}
            >
              <Plus className="w-4 h-4 mr-2" /> Add Memory Photo
            </Button>
          </div>
        </div>

        <div className="space-y-3 p-5 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-2xl border border-purple-100 dark:border-purple-900/30 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Music className="w-24 h-24" />
          </div>
          <div className="relative z-10">
            <Label htmlFor="musicUrl" className="text-purple-700 dark:text-purple-300 font-bold flex items-center gap-2 text-base">
              <Music className="w-4 h-4" /> Background Music
            </Label>
            <p className="text-xs text-purple-600/70 dark:text-purple-400/70 mb-3">Add a romantic Spotify or YouTube track</p>
            <Input 
              id="musicUrl"
              placeholder="e.g. https://open.spotify.com/track/..."
              value={formData.musicUrl || ""}
              onChange={e => handleChange("musicUrl", e.target.value)}
              className="h-12 rounded-xl border-purple-200 dark:border-purple-800/50 focus-visible:ring-purple-500 bg-white/80 dark:bg-black/50 backdrop-blur-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
