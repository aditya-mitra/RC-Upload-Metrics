/** generate a UUID which is 10 or 11 digit in length */
export default function generateRandomUUID(): string {
  return Math.random().toString(36).substr(2, 9);
}
