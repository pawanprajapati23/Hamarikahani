import { requireAdmin } from "@/features/auth/utils/server-auth";
import { v2 as cloudinary } from "cloudinary";
import { Search, Image as ImageIcon, Trash2, DownloadCloud, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

// Configure Cloudinary using env vars
cloudinary.config({ 
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

export default async function AdminMediaPage() {
  await requireAdmin(true);
  
  let resources = [];
  let error = null;

  try {
    if (!process.env.CLOUDINARY_API_SECRET) {
      throw new Error("Missing CLOUDINARY_API_SECRET in environment variables");
    }

    // Fetch the latest 50 images from Cloudinary
    const result = await cloudinary.search
      .expression("resource_type:image OR resource_type:video")
      .sort_by("created_at", "desc")
      .max_results(50)
      .execute();
      
    resources = result.resources;
  } catch (err: any) {
    error = err.message || "Failed to connect to Cloudinary API";
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-sans text-slate-800">Media Library</h1>
          <p className="text-slate-500 mt-1">Manage global assets via Cloudinary CDN</p>
        </div>
      </div>

      {error ? (
        <div className="bg-rose-50 border border-rose-200 p-6 rounded-2xl flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-rose-500 shrink-0" />
          <div>
            <h3 className="font-bold text-rose-800 text-lg">Cloudinary Integration Error</h3>
            <p className="text-rose-600 mt-1">{error}</p>
            <p className="text-sm text-rose-500 mt-2">Ensure `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` are correctly configured in Vercel.</p>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input 
                type="text" 
                placeholder="Search assets by public ID..." 
                className="pl-10 bg-white"
              />
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {resources.map((res: any) => (
                <div key={res.public_id} className="group relative bg-slate-50 border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-square relative bg-slate-200 flex items-center justify-center overflow-hidden">
                    {res.resource_type === "image" ? (
                      <img 
                        src={res.secure_url} 
                        alt={res.public_id} 
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                    ) : (
                      <video src={res.secure_url} className="w-full h-full object-cover" />
                    )}
                    
                    {/* Hover Overlay Actions */}
                    <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button variant="secondary" size="icon" className="w-8 h-8 rounded-full" title="Optimize">
                        <DownloadCloud className="w-4 h-4 text-slate-700" />
                      </Button>
                      <Button variant="destructive" size="icon" className="w-8 h-8 rounded-full" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-mono font-medium text-slate-700 truncate" title={res.public_id}>
                      {res.public_id}
                    </p>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-[10px] uppercase text-slate-500 font-bold">{res.format}</p>
                      <p className="text-[10px] text-slate-500">{(res.bytes / 1024).toFixed(1)} KB</p>
                    </div>
                  </div>
                </div>
              ))}

              {resources.length === 0 && (
                <div className="col-span-full py-12 flex flex-col items-center justify-center text-slate-500">
                  <ImageIcon className="w-12 h-12 text-slate-200 mb-4" />
                  <p className="text-lg font-medium text-slate-600">No media found</p>
                  <p className="text-sm">Upload images in the story editor to see them here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
