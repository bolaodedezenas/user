
import { supabase } from "@/libs/supabase/client";

// Auth
export const signInRepository = (email, password) =>
  supabase.auth.signInWithPassword({ email, password });


export const signInWithGoogleRepository = async () => {
  return supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "https://user-black-seven.vercel.app/", // 🔹 depois muda pra produção
    },
  });
};

// Logout
export const signOutRepository = () => supabase.auth.signOut();


export const signUpRepository = (email, password, metadata = {}) => {
  return supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata, // dados que o trigger vai usar
    },
  });
};



// Profiles
export const createUserProfile = async (profileData) => {
  const { data, error } = await supabase
    .from("profiles")
    .insert([profileData])
    .select()
    .maybeSingle();

  return { data, error };
};

// Buscar profile
export const getUserProfileRepository = async (id) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  return { data, error };
};

// Deletar usuário do Auth (rollback)
export const deleteUserAuth = async (id) => {
  return supabase.auth.admin.deleteUser(id);
};



export const checkEmailExistsRepository = async (email) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (error) {
    console.error("Erro ao verificar email:", error);
    return false;
  }

  return !!data; // true se existe
};


