import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "@/components/ui/ImageUploader";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

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
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
      
      {/* Basic Info */}
      <div className="space-y-4">
        <h3 className="text-lg font-playfair font-bold border-b border-border/50 pb-2">Basic Info</h3>
        
        <div className="space-y-2">
          <Label htmlFor="coupleNames">Couple Names</Label>
          <Input 
            id="coupleNames"
            placeholder="e.g. Rahul & Priya"
            value={formData.coupleNames || ""}
            onChange={e => handleChange("coupleNames", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="years">Years Celebrating</Label>
            <Input 
              id="years"
              placeholder="e.g. 5"
              value={formData.years || ""}
              onChange={e => handleChange("years", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="anniversaryDate">Anniversary Date</Label>
            <Input 
              id="anniversaryDate"
              placeholder="e.g. Oct 12, 2021"
              value={formData.anniversaryDate || ""}
              onChange={e => handleChange("anniversaryDate", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Message */}
      <div className="space-y-4">
        <h3 className="text-lg font-playfair font-bold border-b border-border/50 pb-2">Heartfelt Message</h3>
        <Textarea 
          placeholder="Write your anniversary message here..."
          value={formData.message || ""}
          onChange={e => handleChange("message", e.target.value)}
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
                onClick={() => handleChange("message", wish)}
              >
                {wish}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Cover Photo */}
      <div className="space-y-4">
        <h3 className="text-lg font-playfair font-bold border-b border-border/50 pb-2">Cover Photo</h3>
        <ImageUploader 
          value={formData.coverPhoto}
          onChange={(url) => handleChange("coverPhoto", url)}
          label=""
        />
        <p className="text-xs text-muted-foreground">This photo appears fullscreen at the top of your page.</p>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        <h3 className="text-lg font-playfair font-bold border-b border-border/50 pb-2 flex justify-between items-center">
          Our Journey
          <Button variant="outline" size="sm" onClick={addTimelineEvent} className="gap-2 h-8">
            <Plus className="w-3 h-3" /> Add Event
          </Button>
        </h3>
        
        <div className="space-y-6">
          {(formData.timelineEvents || []).map((event: any, idx: number) => (
            <div key={idx} className="p-4 bg-foreground/5 rounded-2xl border border-border/50 space-y-4 relative group">
              <Button 
                variant="destructive" 
                size="icon" 
                className="absolute -top-3 -right-3 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                onClick={() => removeTimelineEvent(idx)}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Year</Label>
                  <Input 
                    placeholder="e.g. 2018"
                    value={event.year || ""}
                    onChange={e => handleTimelineChange(idx, "year", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input 
                    placeholder="e.g. First Met"
                    value={event.title || ""}
                    onChange={e => handleTimelineChange(idx, "title", e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Memory Photo</Label>
                <ImageUploader 
                  value={event.image}
                  onChange={(url) => handleTimelineChange(idx, "image", url)}
                  label=""
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Music */}
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
