"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UploadCloud, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/utils/cn";

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  className?: string;
  label?: string;
}

export function ImageUploader({ value, onChange, className, label = "Upload Image" }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleCloudinaryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    
    if (!cloudName || !uploadPreset) {
      toast.error("Cloudinary is not configured. Missing environment variables.");
      // Fallback for local testing if env is missing
      const url = URL.createObjectURL(file);
      onChange(url);
      return;
    }

    setIsUploading(true);
    toast.info("Uploading image...");
    
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
        method: "POST",
        body: formData,
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || "Upload failed");
      
      onChange(data.secure_url);
      toast.success("Image uploaded securely!");
    } catch (error: any) {
      console.error("Cloudinary Upload Error:", error);
      toast.error(error.message || "Failed to upload image.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && <label className="text-sm font-medium text-foreground">{label}</label>}
      
      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-foreground/10 bg-foreground/5 group">
          <img src={value} alt="Uploaded preview" className="w-full h-auto max-h-[300px] object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-sm">
            <Button variant="secondary" size="sm" asChild>
              <label className="cursor-pointer">
                Replace
                <input type="file" className="sr-only" accept="image/*" onChange={handleCloudinaryUpload} />
              </label>
            </Button>
            <Button variant="destructive" size="icon" onClick={() => onChange("")}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          {isUploading && (
            <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-foreground/20 rounded-xl cursor-pointer hover:bg-foreground/5 hover:border-primary/50 transition-colors focus-within:ring-2 focus-within:ring-primary relative">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {isUploading ? (
              <Loader2 className="w-8 h-8 animate-spin text-primary mb-2" />
            ) : (
              <UploadCloud className="w-8 h-8 text-muted-foreground mb-2" />
            )}
            <p className="text-sm text-foreground font-medium mb-1">Click to upload via Cloudinary</p>
            <p className="text-xs text-muted-foreground">PNG, JPG or GIF (MAX. 5MB)</p>
          </div>
          <input type="file" className="sr-only" accept="image/*" onChange={handleCloudinaryUpload} disabled={isUploading} />
        </label>
      )}
    </div>
  );
}
