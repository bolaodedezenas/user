
"use client";

import { useEffect } from "react";
import { supabase } from "@/libs/supabase/client";
import { getUserProfileRepository } from "../repository/auth.repository";
import { useAuthStore } from "../stores/auth.store";
 
export const useAuthListener = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);
  const setLoading = useAuthStore((state) => state.setLoading);

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data?.user) return  setLoading(false)  

      //  busca perfil do usuário ou cria se não existir (primeiro login)
      const profile = await getUserProfileRepository(data.user.id);
       // salva avatar no localStorage
      localStorage.setItem("avatar_url", profile.data.avatar_url);
      if (profile) setUser(profile.data);
      setLoading(false) 
    };

    loadUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
     async (event, session) => {
       if (event === "SIGNED_OUT") clearUser();
       if (event === "SIGNED_IN") loadUser(); // recarrega estado
     },
    );

    return () => listener.subscription.unsubscribe();

  }, []);

};
