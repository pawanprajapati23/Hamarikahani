import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "@/components/ui/ImageUploader";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Heart, Music, Camera, Sparkles, Wand2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MissYouFormProps {
  formData: any;
  onChange: (data: any) => void;
}

const SUGGESTED_MESSAGES = [
  "Days feel so long without you. I miss you more than words can say.",
  "Every song I hear reminds me of you. Come back soon!",
  "My heart aches when you're not around. Missing you terribly.",
  "Just thinking about all our fun times together and missing you.",
  "Distance means so little when someone means so much. Miss you!"
];

export function MissYouForm({ formData, onChange }: MissYouFormProps) {
  const handleChange = (field: string, value: any) => {
    onChange({ ...formData, [field]: value });
  };

  const handlePhotoChange = (index: number, url: string) => {
    const newPhotos = [...(formData.photos || [])];
    newPhotos[index] = url;
    handleChange("photos", newPhotos);
  };

  const addPhoto = () => {
    const newPhotos = [...(formData.photos || [])];
    newPhotos.push("");
    handleChange("photos", newPhotos);
  };

  const removePhoto = (index: number) => {
    const newPhotos = [...(formData.photos || [])];
    newPhotos.splice(index, 1);
    handleChange("photos", newPhotos);
  };

  // Initialize photos if empty
  if (!formData.photos) {
    handleChange("photos", [""]);
  }

  const photos = formData.photos || [""];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2 bg-gradient-to-br from-rose-400 to-indigo-500 bg-clip-text text-transparent">
          <Heart className="w-6 h-6 text-rose-500" />
          Miss You Details
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Craft a beautiful, heartfelt letter to someone you miss dearly.
        </p>
      </div>

      {/* Names Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-card/30 rounded-3xl border border-border/40 backdrop-blur-sm shadow-sm transition-all hover:shadow-md hover:border-border/60">
        <div className="space-y-3">
          <Label htmlFor="recipientName" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Their Name</Label>
          <Input 
            id="recipientName"
            placeholder="e.g. Priya"
            value={formData.recipientName || ""}
            onChange={e => handleChange("recipientName", e.target.value)}
            className="h-12 rounded-xl bg-background/50 border-border/50 focus:border-rose-500/50 transition-colors"
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="senderName" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Your Name</Label>
          <Input 
            id="senderName"
            placeholder="e.g. Rahul"
            value={formData.senderName || ""}
            onChange={e => handleChange("senderName", e.target.value)}
            className="h-12 rounded-xl bg-background/50 border-border/50 focus:border-rose-500/50 transition-colors"
          />
        </div>
      </div>

      {/* Message Section */}
      <div className="space-y-4 p-6 bg-card/30 rounded-3xl border border-border/40 backdrop-blur-sm shadow-sm transition-all hover:shadow-md hover:border-border/60">
        <div className="flex items-center justify-between">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <Wand2 className="w-4 h-4 text-indigo-400" /> The Message
          </Label>
        </div>
        
        <Textarea 
          placeholder="I miss you so much because..."
          value={formData.message || ""}
          onChange={e => handleChange("message", e.target.value)}
          className="min-h-[140px] resize-none rounded-2xl bg-background/50 border-border/50 focus:border-rose-500/50 text-base p-4 leading-relaxed transition-colors shadow-inner"
        />
        
        <div className="space-y-3 pt-2">
          <p className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Need inspiration?
          </p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_MESSAGES.map((msg, idx) => (
              <Button 
                key={idx} 
                variant="secondary" 
                size="sm" 
                className="text-xs font-normal h-auto py-2 px-3.5 rounded-full bg-secondary/50 hover:bg-rose-500/10 hover:text-rose-600 transition-colors border border-transparent hover:border-rose-500/20"
                onClick={() => handleChange("message", msg)}
              >
                {msg.length > 40 ? msg.substring(0, 40) + '...' : msg}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Photos Section */}
      <div className="space-y-6 p-6 bg-card/30 rounded-3xl border border-border/40 backdrop-blur-sm shadow-sm transition-all hover:shadow-md hover:border-border/60">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <Camera className="w-4 h-4 text-rose-500" />
              Memory Gallery
            </h3>
            <p className="text-xs text-muted-foreground mt-1">Add beautiful photos of your time together.</p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={addPhoto} 
            className="gap-2 h-9 rounded-full border-dashed border-border/80 hover:border-rose-500/50 hover:bg-rose-500/5 transition-colors px-4"
          >
            <Plus className="w-4 h-4" /> Add Photo
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {photos.map((photo: string, idx: number) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="relative group rounded-2xl overflow-hidden border border-border/50 bg-background/50 hover:border-rose-500/30 transition-colors shadow-sm"
              >
                <div className="p-3">
                  <ImageUploader 
                    value={photo}
                    onChange={(url) => handlePhotoChange(idx, url)}
                    label={`Memory ${idx + 1}`}
                  />
                </div>
                {photos.length > 1 && (
                  <Button 
                    variant="destructive" 
                    size="icon" 
                    className="absolute top-3 right-3 h-7 w-7 rounded-full opacity-0 group-hover:opacity-100 transition-all z-10 shadow-md scale-90 group-hover:scale-100"
                    onClick={() => removePhoto(idx)}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Music Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-rose-500/10 p-[1px] group transition-all hover:shadow-lg hover:shadow-purple-500/5">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-rose-500/20 blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
        <div className="relative p-6 sm:p-8 bg-card/80 backdrop-blur-xl rounded-[23px] border border-white/10 dark:border-white/5 space-y-5">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/25">
              <Music className="w-5 h-5 text-white" />
            </div>
            <div>
              <Label htmlFor="musicUrl" className="text-base font-semibold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Soundtrack of You</Label>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">Set the perfect mood with a background track.</p>
            </div>
          </div>
          
          <div className="pl-0 sm:pl-16">
            <Input 
              id="musicUrl"
              placeholder="Paste Spotify or YouTube link here..."
              value={formData.musicUrl || ""}
              onChange={e => handleChange("musicUrl", e.target.value)}
              className="h-12 rounded-xl bg-background/60 border-border/50 focus:border-purple-500/50 shadow-inner transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
