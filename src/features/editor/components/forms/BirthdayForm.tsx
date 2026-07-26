import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "@/components/ui/ImageUploader";
import { Button } from "@/components/ui/button";

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
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
      <div className="space-y-2">
        <Label htmlFor="birthdayName">Birthday Person's Name</Label>
        <Input 
          id="birthdayName"
          placeholder="e.g. Alex"
          value={formData.birthdayName || ""}
          onChange={e => handleChange("birthdayName", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="birthdayAge">Age (Optional)</Label>
        <Input 
          id="birthdayAge"
          placeholder="e.g. 25"
          value={formData.birthdayAge || ""}
          onChange={e => handleChange("birthdayAge", e.target.value)}
        />
      </div>

      <div className="space-y-4">
        <Label>Personal Message</Label>
        <Textarea 
          placeholder="Write your heartfelt message here..."
          value={formData.customMessage || ""}
          onChange={e => handleChange("customMessage", e.target.value)}
          className="min-h-[120px]"
        />
        
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Suggested Wishes (Click to use)</p>
          <div className="flex flex-col gap-2">
            {SUGGESTED_WISHES.map((wish, idx) => (
              <Button 
                key={idx} 
                variant="outline" 
                size="sm" 
                className="h-auto py-2 px-3 text-left justify-start whitespace-normal font-normal text-sm"
                onClick={() => handleChange("customMessage", wish)}
              >
                {wish}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-border/50">
        <h3 className="text-sm font-semibold">Media (Optional)</h3>
        
        <div className="space-y-2">
          <Label>Gift Box GIF (Step 1)</Label>
          <ImageUploader 
            value={formData.giftGif}
            onChange={(url) => handleChange("giftGif", url)}
            label=""
          />
          <p className="text-xs text-muted-foreground">The initial gift box they will tap on.</p>
        </div>

        <div className="space-y-2 pt-4">
          <Label>Birthday Photo / Cake GIF (Step 2)</Label>
          <ImageUploader 
            value={formData.cakeGif}
            onChange={(url) => handleChange("cakeGif", url)}
            label=""
          />
          <p className="text-xs text-muted-foreground">The photo or GIF that appears after the gift box bursts.</p>
        </div>

        <div className="space-y-2 pt-4">
          <Label htmlFor="musicUrl">Background Music (Optional)</Label>
          <Input 
            id="musicUrl"
            placeholder="Spotify or YouTube URL (e.g. https://open.spotify.com/...)"
            value={formData.musicUrl || ""}
            onChange={e => handleChange("musicUrl", e.target.value)}
          />
          <p className="text-xs text-muted-foreground">Paste a Spotify or YouTube track link to play background music.</p>
        </div>
      </div>
    </div>
  );
}
