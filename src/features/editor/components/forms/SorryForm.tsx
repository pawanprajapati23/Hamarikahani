import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "@/components/ui/ImageUploader";
import { Button } from "@/components/ui/button";

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
        <Label>Apology Message</Label>
        <Textarea 
          placeholder="I am really sorry..."
          value={formData.message || ""}
          onChange={e => handleChange("message", e.target.value)}
          className="min-h-[100px]"
        />
        
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Suggested Apologies</p>
          <div className="flex flex-col gap-2">
            {SUGGESTED_APOLOGIES.map((msg, idx) => (
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
        <Label>Your Promise</Label>
        <Textarea 
          placeholder="I promise to..."
          value={formData.promiseText || ""}
          onChange={e => handleChange("promiseText", e.target.value)}
          className="min-h-[80px]"
        />
        
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Suggested Promises</p>
          <div className="flex flex-col gap-2">
            {SUGGESTED_PROMISES.map((msg, idx) => (
              <Button 
                key={idx} 
                variant="outline" 
                size="sm" 
                className="h-auto py-2 px-3 text-left justify-start whitespace-normal font-normal text-sm"
                onClick={() => handleChange("promiseText", msg)}
              >
                {msg}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-border/50">
        <h3 className="text-sm font-semibold">Media (Optional)</h3>
        
        <div className="space-y-2">
          <Label>Sad/Apologetic GIF or Photo</Label>
          <ImageUploader 
            value={formData.sadGifUrl}
            onChange={(url) => handleChange("sadGifUrl", url)}
            label=""
          />
          <p className="text-xs text-muted-foreground">Shown while asking for forgiveness.</p>
        </div>

        <div className="space-y-2 pt-4">
          <Label>Happy/Celebration GIF or Photo</Label>
          <ImageUploader 
            value={formData.happyGifUrl}
            onChange={(url) => handleChange("happyGifUrl", url)}
            label=""
          />
          <p className="text-xs text-muted-foreground">Shown after they click "I Forgive You".</p>
        </div>

        <div className="space-y-2 pt-4">
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
