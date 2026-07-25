import { createClient } from "@/lib/supabase/server";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export class AuthService {
  /**
   * Retrieves the current authenticated user session securely from HttpOnly cookies.
   */
  static async getSession() {
    const supabase = await createClient();
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error || !session) return null;
    return session;
  }

  /**
   * Retrieves the Supabase Auth user and their extended profile from the PostgreSQL database.
   * This bridges the gap between Supabase GoTrue and our application's business logic.
   */
  static async getCurrentUser() {
    const session = await this.getSession();
    if (!session?.user) return null;

    // Fetch the extended user profile (roles, full name, etc.) from Drizzle
    let [dbUser] = await db
      .select()
      .from(users)
      .where(eq(users.id, session.user.id))
      .limit(1);

    if (!dbUser && session.user.email) {
      // Fix race condition: Insert profile directly if Supabase trigger hasn't fired yet
      const [newUser] = await db.insert(users).values({
        id: session.user.id,
        email: session.user.email,
        fullName: session.user.user_metadata?.full_name || null,
        avatarUrl: session.user.user_metadata?.avatar_url || null,
      }).returning();
      dbUser = newUser;
    }

    return {
      auth: session.user,
      profile: dbUser,
    };
  }
}
