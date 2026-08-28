'use server'

import { db } from "@/lib/firebaseAdmin";
import { revalidatePath } from "next/cache";

export async function deleteJobAction(jobId: string) {
  try {
    await db.collection('jobs').doc(jobId).delete();
    // Revalidate paths to clear cache
    revalidatePath('/admin/jobs');
    revalidatePath('/admin');
    revalidatePath('/');
    revalidatePath('/jobs');
    return { success: true };
  } catch (error) {
    console.error("Failed to delete job:", error);
    return { success: false, error: "Failed to delete job" };
  }
}
