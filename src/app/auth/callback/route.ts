import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  
  // Next URL to redirect to after successful authentication
  const next = searchParams.get('redirect_to') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // Successful auth, redirect to the protected route
      return NextResponse.redirect(`${origin}${next}`)
    }
    
    // Log error internally in production
    console.error("Auth Callback Error:", error.message)
  }

  // Authentication failed (e.g., code expired or missing)
  return NextResponse.redirect(`${origin}/auth/login?error=auth_callback_failed`)
}
