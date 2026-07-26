# HamariKahani -- Product Flow (MVP)

## Goal

HamariKahani is **not** a story builder. It is a **digital surprise &
greeting platform** where users choose a template, customize it, pay
₹99, and receive a shareable page.

------------------------------------------------------------------------

# User Journey

## 1. Landing Page

Purpose: Convert visitors into customers.

Sections: - Hero Section - Featured Templates - Categories - How It
Works - Testimonials - FAQ - Footer

Hero CTA: - Create Surprise - Preview Demo

------------------------------------------------------------------------

## 2. Template Cards

Every template card contains only:

-   Cover Image
-   Template Name
-   Short Description
-   ~~₹499~~ → ₹99 (Launch Offer)
-   Preview
-   Create

Supported templates: - Birthday - Valentine - Anniversary - Sorry - Miss
You - Friendship - Love - Festival - More later

------------------------------------------------------------------------

## 3. Preview

Requirements: - No login required - No payment required - Live demo of
the final page - Preview should match the final generated page

------------------------------------------------------------------------

## 4. Create Flow

When user clicks **Create**:

If user is logged in: - Open template form

If user is NOT logged in: - Open Signup/Login - After successful login,
automatically return to the same template - Never redirect to the
homepage - Preserve the selected template

------------------------------------------------------------------------

## 5. Authentication

Method: - Email OTP

Requirements: - Fast - Secure - Mobile-friendly

------------------------------------------------------------------------

## 6. Template Form

Each template has its own customized form.

### Birthday

-   Recipient Name
-   Your Name
-   Personal Message
-   5 Suggested Birthday Wishes
-   Photos
-   Optional Music

### Valentine

-   Partner Name
-   Your Name
-   Love Message
-   5 Suggested Romantic Messages
-   Photos
-   Optional Music

### Anniversary

-   Anniversary-specific fields

### Sorry

-   Apology-specific fields

Do NOT reuse the exact same form for every template.

------------------------------------------------------------------------

## 7. Custom URL

After the form:

Ask user to choose a URL.

Example: - hamarikahani.in/rahul - hamarikahani.in/mylove

Requirements: - Real-time availability check - Green if available - Red
if unavailable - Suggest alternatives

------------------------------------------------------------------------

## 8. Payment

After URL confirmation:

-   Open Razorpay
-   Price: ₹99

On successful payment: - Save all data - Generate the page - Activate
the URL

------------------------------------------------------------------------

## 9. Success Page

Display: - Success Message - Generated Link - Copy Link - Share - Open
Page

------------------------------------------------------------------------

## 10. User Dashboard

Section: My Creations

Each card should show: - Template Name - Created Date - Custom URL -
Payment Status - Open - Copy Link - Share

------------------------------------------------------------------------

# Admin Panel

Admin can manage: - Users - Templates - Payments - Coupons -
Categories - Analytics - Settings

------------------------------------------------------------------------

# UI Rules

-   Mobile-first
-   Premium look
-   Emotional design
-   Fast loading
-   Smooth animations
-   Large premium buttons
-   Beautiful cards
-   Consistent spacing
-   Modern typography

Never make the UI look like a cheap template or AI-generated website.

------------------------------------------------------------------------

# Development Rules

-   Reuse existing Supabase
-   Reuse Razorpay
-   Reuse Cloudinary
-   Reuse Resend
-   Do not duplicate code
-   Do not break existing functionality
-   Ask before making assumptions

------------------------------------------------------------------------

# MVP Flow

Landing → Template → Preview → Create → Signup/Login → Template Form →
Custom URL → Razorpay Payment → Success → My Creations
