const validateUUID = (id: string) =>
  /^[0-9a-f]{8}\b-[0-9a-f]{4}\b-[0-9a-f]{4}\b-[0-9a-f]{4}\b-[0-9a-f]{12}$/i.test(
    id,
  );

export default validateUUID;
