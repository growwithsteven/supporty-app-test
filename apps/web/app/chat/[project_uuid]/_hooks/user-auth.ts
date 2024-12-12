import { createSupabaseUser } from "@/lib/supabase";
import { useMount } from "react-use";
import { User, UserAttributes } from "@supabase/supabase-js";
import { create } from "zustand";
import { assert } from "@toss/assert";

export const useUserAuthStore = create<{
  user: Pick<User, "id"> | null;
  setUser: (user: User) => void;
}>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export function useUserAuth() {
  const { user, setUser } = useUserAuthStore();

  const updateUser = async (attr: UserAttributes) => {
    const supabase = createSupabaseUser();
    const {
      data: { user: _user },
    } = await supabase.auth.updateUser(attr);

    assert(_user != null, "User update failed");

    setUser(_user);
  };

  return { user, setUser, updateUser };
}

useUserAuth.Init = function useUserAuthInit() {
  const { user, setUser, updateUser } = useUserAuth();

  useMount(async () => {
    const supabase = createSupabaseUser();

    let {
      data: { user: _user },
    } = await supabase.auth.getUser();

    if (!_user) {
      await supabase.auth.signInAnonymously();

      const {
        data: { user: newUser },
      } = await supabase.auth.getUser();

      _user = newUser;
    }

    assert(_user != null, "User not found");

    setUser(_user);
  });

  return { user, updateUser };
};
