import { BASE_ENDPOINT, createHeaders } from "./helpers";

export function searchBooks({
  query,
  token,
  intitle,
  inauthor,
  inpublisher,
  subject,
  isbn,
  startIndex = 0,
  maxResults = 10
}) {
  const headers = createHeaders(token);

  let endpoint = `${BASE_ENDPOINT}/volumes`;
  endpoint += `?q=${query}`;
  endpoint += intitle ? `+intitle:${intitle}` : "";
  endpoint += inauthor ? `+inauthor:${inauthor}` : "";
  endpoint += subject ? `+subject:${subject}` : "";
  endpoint += inpublisher ? `+inpublisher:${inpublisher}` : "";
  endpoint += isbn ? `+isbn:${isbn}` : "";
  endpoint += `&startIndex=${startIndex}`;
  endpoint += `&maxResults=${maxResults}`;

  return fetch(endpoint, { headers }).then(data => data.json());
}

export function getBook({ volumeId, token }) {
  const endpoint = `${BASE_ENDPOINT}/volumes/${volumeId}`;
  const headers = createHeaders(token);

  return fetch(endpoint, { headers })
    .then(data => data.json())
    .catch(() => null);
}

export function getShelves({ token }) {
  const endpoint = `${BASE_ENDPOINT}/mylibrary/bookshelves`;
  const headers = createHeaders(token);

  return fetch(endpoint, { headers }).then(data => data.json());
}

export function getShelf({ shelf, token }) {
  const endpoint = `${BASE_ENDPOINT}/mylibrary/bookshelves/${shelf}`;
  const headers = createHeaders(token);

  return fetch(endpoint, { headers }).then(data => data.json());
}

export function getBooksOnShelf({ shelf, token }) {
  const endpoint = `${BASE_ENDPOINT}/mylibrary/bookshelves/${shelf}/volumes`;
  const headers = createHeaders(token);

  return fetch(endpoint, { headers }).then(data => data.json());
}
