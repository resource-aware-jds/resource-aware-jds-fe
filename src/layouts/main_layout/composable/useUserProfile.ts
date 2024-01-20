import { reactive } from "vue";

export function useUserProfile() {
  const userProfileAttribute = reactive({
    isLoading: true,
    profile: {
      profileImage: "",
      displayName: "",
      email: "",
    },
  });

  async function getUserProfile() {
    const user = {} as any;
    userProfileAttribute.profile.displayName = user?.displayName ?? "-";
    userProfileAttribute.profile.email = user?.email ?? "Unknown";
    userProfileAttribute.profile.profileImage = user?.photoURL ?? "";
    userProfileAttribute.isLoading = false;
  }

  getUserProfile();

  return {
    userProfileAttribute,
  };
}
