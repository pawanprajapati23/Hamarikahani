import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  console.log("Checking buckets...");
  const { data, error } = await supabase.storage.listBuckets();
  if (error) {
    console.error("Error:", error);
  } else {
    console.log("Buckets:", data);
  }
}
main();
