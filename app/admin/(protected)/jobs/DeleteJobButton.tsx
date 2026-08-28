'use client';

import { Trash2 } from "lucide-react";
import { useState } from "react";
import { deleteJobAction } from "./actions";

export default function DeleteJobButton({ jobId }: { jobId: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this job?")) return;
    
    setIsDeleting(true);
    const res = await deleteJobAction(jobId);
    if (!res.success) {
      alert("Failed to delete job.");
      setIsDeleting(false);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className={`text-red-500 hover:text-red-700 transition-colors ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
      title="Delete Job"
    >
      <Trash2 className="w-5 h-5" />
    </button>
  );
}
