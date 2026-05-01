import { supabase } from "@/libs/supabase/client";

export const profileRepository = {
  async updateProfile(userId, profileData) {
    const { data, error } = await supabase
      .from("profiles")
      .update(profileData)
      .eq("id", userId)
      .select()
      .single();

    if (error) {
      throw error;
    }
    return data;
  },

//   async uploadAvatar(userId, file) {
//     const fileName = `profiles/${userId}-${Date.now()}`;

//     const { data, error } = await supabase.storage
//       .from("avatars")
//       .upload(fileName, file, { upsert: true });

//     if (error) throw error;

//     const { data: publicUrl } = supabase.storage
//       .from("avatars")
//       .getPublicUrl(data.path);

//     return publicUrl.publicUrl;
//   },
// };


  async uploadAvatar(file, path) {
    if (!file) return null;

    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(path, file);

    if (error) {
      console.error("Erro no upload:", error.message);
      throw new Error(error.message);
    }

    const { data: publicUrl } = supabase.storage
      .from("avatars")
      .getPublicUrl(data.path);

    return publicUrl.publicUrl;
  },
  
};
