import { BASE_ENDPOINT, createHeaders, handlePostResponse } from "./helpers";

export async function addBookToShelf({ volumeId, shelf, token }) {
  const endpoint = `${BASE_ENDPOINT}/mylibrary/bookshelves/${shelf}/addVolume?volumeId=${volumeId}`;
  const headers = createHeaders(token);

  return fetch(endpoint, { headers, method: "POST" }).then(handlePostResponse);
}

export async function removeBookFromShelf({ volumeId, shelf, token }) {
  const endpoint = `${BASE_ENDPOINT}/mylibrary/bookshelves/${shelf}/removeVolume?volumeId=${volumeId}`;
  const headers = createHeaders(token);

  return fetch(endpoint, { headers, method: "POST" }).then(handlePostResponse);
}

export async function removeAllBooksFromShelf({ shelf, token }) {
  const endpoint = `${BASE_ENDPOINT}/mylibrary/bookshelves/${shelf}/clearVolumes`;
  const headers = createHeaders(token);

  return fetch(endpoint, { headers, method: "POST" }).then(handlePostResponse);
}
