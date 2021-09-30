/**
 * A function keeps removing last sentence from given string until
 * characters limit is met.
 *
 * @param {string} string Text to be shortened, sentences separated by period.
 * @param {number} limit Max length of the string
 */
export const limitCharacters = (string, limit) => {
  let shortenedString = string;

  // Keep removing one sentence from the entry
  // until it is less than max length
  while (shortenedString.length >= limit) {
    shortenedString = shortenedString.split('. ').slice(0, -1).join('. ') + '.';
  }
  return shortenedString;
};
