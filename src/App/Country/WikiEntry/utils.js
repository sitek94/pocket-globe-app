export const limitCharacters = (text, limit) => {
  let shortenedText = text;

    // Keep removing one sentence from the entry
    // until it is less than max length
  while (shortenedText.length >= limit) {
    shortenedText = shortenedText.split('. ').slice(0, -1).join('. ') + '.';
  }
  return shortenedText;
};
