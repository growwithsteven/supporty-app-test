import { createSupabaseUser } from "@/lib/supabase";
import { useMount } from "react-use";
import { useState } from "react";
import { User } from "@supabase/supabase-js";

export function useUserAuth() {
  const [user, setUser] = useState<Pick<User, "id"> | null>(null);

  useMount(async () => {
    const supabase = createSupabaseUser();

    let {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      await supabase.auth.signInAnonymously();

      const {
        data: { user: newUser },
      } = await supabase.auth.getUser();

      user = newUser;
    }

    setUser({
      id: user!.id,
    });
  });

  return {
    user,
  };
}
