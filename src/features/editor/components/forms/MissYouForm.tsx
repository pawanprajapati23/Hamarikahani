import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "@/components/ui/ImageUploader";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

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

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="recipientName">Their Name</Label>
          <Input 
            id="recipientName"
            placeholder="e.g. Priya"
            value={formData.recipientName || ""}
            onChange={e => handleChange("recipientName", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="senderName">Your Name</Label>
          <Input 
            id="senderName"
            placeholder="e.g. Rahul"
            value={formData.senderName || ""}
            onChange={e => handleChange("senderName", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        <Label>Missing You Message</Label>
        <Textarea 
          placeholder="I miss you so much because..."
          value={formData.message || ""}
          onChange={e => handleChange("message", e.target.value)}
          className="min-h-[100px]"
        />
        
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Suggested Messages</p>
          <div className="flex flex-col gap-2">
            {SUGGESTED_MESSAGES.map((msg, idx) => (
              <Button 
                key={idx} 
                variant="outline" 
                size="sm" 
                className="h-auto py-2 px-3 text-left justify-start whitespace-normal font-normal text-sm"
                onClick={() => handleChange("message", msg)}
              >
                {msg}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-border/50">
        <h3 className="text-sm font-semibold flex justify-between items-center">
          Memory Photos
          <Button variant="outline" size="sm" onClick={addPhoto} className="gap-2 h-8">
            <Plus className="w-3 h-3" /> Add Photo
          </Button>
        </h3>
        <p className="text-xs text-muted-foreground">Add photos of your favorite memories together.</p>
        
        <div className="grid gap-4">
          {(formData.photos || []).map((photo: string, idx: number) => (
            <div key={idx} className="relative group">
              <ImageUploader 
                value={photo}
                onChange={(url) => handlePhotoChange(idx, url)}
                label={`Photo ${idx + 1}`}
              />
              {(formData.photos || []).length > 1 && (
                <Button 
                  variant="destructive" 
                  size="icon" 
                  className="absolute -top-3 -right-3 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  onClick={() => removePhoto(idx)}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-border/50">
        <div className="space-y-2">
          <Label htmlFor="musicUrl">Background Music (Optional)</Label>
          <Input 
            id="musicUrl"
            placeholder="Spotify or YouTube URL"
            value={formData.musicUrl || ""}
            onChange={e => handleChange("musicUrl", e.target.value)}
          />
          <p className="text-xs text-muted-foreground">Paste a Spotify or YouTube track link to play background music.</p>
        </div>
      </div>
    </div>
  );
}
