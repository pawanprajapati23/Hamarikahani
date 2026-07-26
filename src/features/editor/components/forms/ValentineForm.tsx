import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "@/components/ui/ImageUploader";
import { Button } from "@/components/ui/button";

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

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
      <div className="space-y-2">
        <Label htmlFor="partnerName">Partner's Name</Label>
        <Input 
          id="partnerName"
          placeholder="e.g. My Love"
          value={formData.partnerName || ""}
          onChange={e => handleChange("partnerName", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="questionText">The Question</Label>
        <Input 
          id="questionText"
          placeholder="Will you be my Valentine?"
          value={formData.questionText || ""}
          onChange={e => handleChange("questionText", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="yesButtonText">Yes Button Text</Label>
          <Input 
            id="yesButtonText"
            placeholder="Yes!"
            value={formData.yesButtonText || ""}
            onChange={e => handleChange("yesButtonText", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="noButtonText">No Button Text (Dodging)</Label>
          <Input 
            id="noButtonText"
            placeholder="No"
            value={formData.noButtonText || ""}
            onChange={e => handleChange("noButtonText", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        <Label>Success Message (After they click Yes)</Label>
        <Textarea 
          placeholder="Yayy! I love you! ❤️"
          value={formData.successMessage || ""}
          onChange={e => handleChange("successMessage", e.target.value)}
          className="min-h-[100px]"
        />
        
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Suggested Messages</p>
          <div className="flex flex-col gap-2">
            {SUGGESTED_MESSAGES.map((wish, idx) => (
              <Button 
                key={idx} 
                variant="outline" 
                size="sm" 
                className="h-auto py-2 px-3 text-left justify-start whitespace-normal font-normal text-sm"
                onClick={() => handleChange("successMessage", wish)}
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
          <Label>Question GIF/Photo</Label>
          <ImageUploader 
            value={formData.gifUrl1}
            onChange={(url) => handleChange("gifUrl1", url)}
            label=""
          />
          <p className="text-xs text-muted-foreground">Shown while asking the question.</p>
        </div>

        <div className="space-y-2 pt-4">
          <Label>Success GIF/Photo</Label>
          <ImageUploader 
            value={formData.gifUrl2}
            onChange={(url) => handleChange("gifUrl2", url)}
            label=""
          />
          <p className="text-xs text-muted-foreground">Shown after they click Yes.</p>
        </div>
      </div>
    </div>
  );
}
