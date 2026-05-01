import { useState } from "react";
import { profileService } from "../services/profile.service";
import { useAuthStore } from "@/modules/auth/stores/auth.store";
import toast from "react-hot-toast";

export function useProfile() {
  const [isSaving, setIsSaving] = useState(false);
  const { user, setUser } = useAuthStore();

  const updateProfile = async (formData) => {
    if (!user?.id) {
      toast.error("Usuário não encontrado.");
      return null;
    }

    setIsSaving(true);
    try {
      const updatedUser = await profileService.updateProfile(user.id, formData);
      
      if (updatedUser) {
        setUser(updatedUser);
        localStorage.setItem("avatar_url", updatedUser.avatar_url || "");
        toast.success("Perfil atualizado com sucesso!");
      }
      return updatedUser;
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      toast.error(error.message || "Falha ao atualizar perfil.");
      return null;
    } finally {
      setIsSaving(false);
    }
  };

  return { updateProfile, isSaving };
}