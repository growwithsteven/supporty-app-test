import { createClient } from "@supabase/supabase-js";

export function createSupabaseWithServiceRole() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
  );

  return supabase;
}

export function createSupabase(options) {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    options,
  );
}

export function createSupabaseWithRequest(req) {
  const supabase = createSupabase({
    global: { headers: { Authorization: req.headers.get("Authorization") } },
  });

  return supabase;
}

export function createSupabaseUser() {
  return createSupabase({
    auth: {
      storageKey: "sb-user-auth-token",
    },
  });
}
