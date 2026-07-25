import { resend } from "@/lib/resend";

export class EmailService {
  /**
   * Fires a transactional welcome email via Resend when a user signs up.
   */
  static async sendWelcomeEmail(email: string, name: string) {
    try {
      await resend.emails.send({
        from: "HamariKahani <noreply@hamarikahani.in>",
        to: email,
        subject: "Welcome to HamariKahani ✨",
        html: `
          <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; color: #1a202c;">
            <h1 style="color: #2d3748; font-family: 'Playfair Display', serif;">Welcome, ${name}!</h1>
            <p style="font-size: 16px; line-height: 1.6;">Every story deserves to be told beautifully. We're absolutely thrilled to have you join us.</p>
            <p style="font-size: 16px; line-height: 1.6;">Get started by crafting your first emotional surprise.</p>
            <a href="https://hamarikahani.in/dashboard" style="display: inline-block; margin-top: 24px; padding: 14px 28px; background-color: #E53E3E; color: white; text-decoration: none; border-radius: 9999px; font-weight: 600;">Create a Story</a>
          </div>
        `,
      });
    } catch (error) {
      // We don't want email failures to crash the auth flow
      console.error("Failed to send welcome email:", error);
    }
  }
}
