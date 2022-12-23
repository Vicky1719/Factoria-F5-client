import service from "./config.services";

const getProfileDetailsService = () => {
  return service.get("/profile/my-profile");
};

const updateProfileService = (userId, userChanges) => {
  return service.patch(`/profile/${userId}/edit`, userChanges);
};

const deleteProfileService = (userId) => {
  return service.delete(`/profile/${userId}/delete`);
};

const userCreationService = () => {
  return service.get("/creation/my-creation");
};

export {
  getProfileDetailsService,
  updateProfileService,
  deleteProfileService,
  userCreationService,
};
