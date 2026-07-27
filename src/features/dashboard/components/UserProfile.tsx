"use client";

import { useState } from "react";
import { User, Edit2, Check, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { updateUserName } from "@/features/auth/api/actions";

interface UserProfileProps {
  initialName: string;
  email: string;
}

export function UserProfile({ initialName, email }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(initialName);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    
    setIsSaving(true);
    try {
      const res = await updateUserName(name);
      if (res.success) {
        toast.success("Profile updated successfully!");
        setIsEditing(false);
      } else {
        toast.error(res.error || "Failed to update profile");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center shadow-inner">
        <User className="w-8 h-8 text-white" />
      </div>
      
      <div className="space-y-1 w-full relative">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <Input 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="h-8 text-sm font-semibold rounded-full"
              autoFocus
              disabled={isSaving}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
            />
            <Button size="icon" variant="ghost" className="h-8 w-8 text-pink-500 hover:text-pink-600 hover:bg-pink-50 rounded-full" onClick={handleSave} disabled={isSaving}>
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
            </Button>
            <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground rounded-full" onClick={() => { setIsEditing(false); setName(initialName); }} disabled={isSaving}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between group">
            <h2 className="text-xl font-bold text-foreground truncate pr-2 font-playfair">{name}</h2>
            <Button size="icon" variant="ghost" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity rounded-full text-pink-500 hover:bg-pink-50" onClick={() => setIsEditing(true)}>
              <Edit2 className="w-3 h-3" />
            </Button>
          </div>
        )}
        <p className="text-xs font-medium text-muted-foreground truncate">{email}</p>
      </div>
    </div>
  );
}
