export const BASE_ENDPOINT = "https://www.googleapis.com/books/v1";

export function createHeaders(token) {
  return new Headers({
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  });
}

export function handlePostResponse(response) {
  if (response.status === 204) return true;
  return false;
}
