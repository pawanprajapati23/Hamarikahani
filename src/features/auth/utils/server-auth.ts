import { AuthService } from "../services/auth.service";
import { redirect } from "next/navigation";

export class UnauthorizedError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "UnauthorizedError";
  }
}

/**
 * Core authorization helper for Server Actions and API Routes.
 * Throws an error or automatically redirects unauthenticated users.
 * 
 * @param redirectToLogin - If true, redirects to the login page instead of throwing an error.
 */
export async function requireAuth(redirectToLogin = false) {
  const user = await AuthService.getCurrentUser();
  
  if (!user || !user.auth) {
    if (redirectToLogin) {
      redirect("/auth/login");
    }
    throw new UnauthorizedError();
  }
  
  return user;
}

/**
 * Role-based authorization helper for Admin-only Server Actions.
 */
export async function requireAdmin() {
  const user = await requireAuth();
  
  if (user.profile?.role !== "ADMIN") {
    throw new UnauthorizedError("Admin privileges required.");
  }
  
  return user;
}
