export function validateImdbId(id) {
  const regex = /^tt\d{7,9}$/;
  return regex.test(id);
}