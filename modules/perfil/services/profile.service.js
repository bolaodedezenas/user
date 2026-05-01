import { profileRepository } from "../repository/profile.repository";

export const profileService = {
  async updateProfile(userId, formData) {
    const profileData = { ...formData };
    const file = formData.avatar_file;

    delete profileData.avatar_file;

    // Upload imagem
    if (file) {
      const ext = file.name.split(".").pop();

      const path = `profiles/${userId}/avatar-${Date.now()}.${ext}`;

      const avatarUrl = await profileRepository.uploadAvatar(file, path);

      profileData.avatar_url = avatarUrl;
    }

    profileData.updated_at = new Date().toISOString();

    return await profileRepository.updateProfile(userId, profileData);
  },
};
