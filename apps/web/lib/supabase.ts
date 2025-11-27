import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { NextRequest } from "next/server";

export function createSupabaseWithServiceRole(): SupabaseClient {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  return supabase;
}

export function createSupabase(options?: any): SupabaseClient {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    options,
  );
}

export function createSupabaseWithRequest(req: NextRequest): SupabaseClient {
  const supabase = createSupabase({
    global: { headers: { Authorization: req.headers.get("Authorization") } },
  });

  return supabase;
}

export function createSupabaseUser(): SupabaseClient {
  return createSupabase({
    auth: {
      storageKey: "sb-user-auth-token",
    },
  });
}
