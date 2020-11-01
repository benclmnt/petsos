export function buildErrorObject(res, { status, error = 400 }) {
  logger.error("error: ", error);

  const errorResp = {
    kind: "Error",
    error,
  };

  return res.status(status).json(errorResp);
}

export function buildSuccessResponse(res, { status = 200, data }) {
  // console.log("returned", data);
  return res.status(status).json(data);
}

export function checkMissingParameter(array) {
  return array.some((param) => param === undefined || param === null);
}

export function handleMissingParameter(res) {
  return buildErrorObject(res, {
    status: 400,
    error: "Missing some required parameters",
  });
}
