/**
 * Generates a random 8-character alphanumeric string.
 * Consists of lowercase letters and digits.
 * @returns {string} An 8-character ID.
 */
function generateId() {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

module.exports = { generateId };