/**
 * Normalizes a room name for consistent storage and lookup.
 * - Converts to lowercase.
 * - Trims whitespace from both ends.
 * @param {string} name - The original room name.
 * @returns {string} The normalized room name.
 */
function normalizeRoomName(name) {
  if (typeof name !== 'string') return '';
  return name.trim().toLowerCase();
}

/**
 * Validates the room creation input.
 * @param {string} name - The room name.
 * @param {string} [creatorAlias] - The creator's alias.
 * @returns {boolean} - True if the input is valid, false otherwise.
 */
function isValidRoomInput(name, creatorAlias) {
  if (!name || typeof name !== 'string' || name.trim().length < 3 || name.trim().length > 25) {
    return false;
  }
  if (creatorAlias && (typeof creatorAlias !== 'string' || creatorAlias.trim().length < 1 || creatorAlias.trim().length > 20)) {
    return false;
  }
  return true;
}


module.exports = {
  normalizeRoomName,
  isValidRoomInput,
};