"use client";

import * as service from "../services/auth.service";
import { useAuthStore } from "../stores/auth.store";

export const useAuth = () => {
  const { setUser, clearUser, setLoading } = useAuthStore();

  const login = async (email, password) => {
    setLoading(true);
    try {
      const user = await service.loginService(email, password);
      setUser(user);
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData) => {
    const result = await service.registerService(formData);
    return result;
  };

  const loginWithGoogle = async () => {
    return service.loginWithGoogleService();
  };

  const logout = async () => {
    await service.logoutService();
    clearUser();
  };

  return {
    login,
    register,
    loginWithGoogle,
    logout,
  };
};
