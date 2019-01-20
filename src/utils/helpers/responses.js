export function makeSuccessResponse({ code = 200, data = {} }) {
  return {
    data: {
      code,
      ...data
    }
  };
}

export function makeErrorResponse({ code = 500, data = {} }) {
  return {
    code,
    details: {
      ...data
    }
  };
}
