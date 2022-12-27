import service from "./config.services";

const createCreationService = (newCreation) => {
  return service.post("/creation/create", newCreation);
};

const creationListService = () => {
  return service.get("/creation");
};

const creationDetailsService = (creationId) => {
  return service.get(`/creation/${creationId}/detail`);
};

const creationEditService = (creationId, creationUpdate) => {
  return service.patch(`/creation/${creationId}/edit`, creationUpdate);
};

const creationDeleteService = (creationId) => {
  return service.delete(`/creation/${creationId}/delete`);
};

export {
  createCreationService,
  creationListService,
  creationDetailsService,
  creationEditService,
  creationDeleteService,
};
