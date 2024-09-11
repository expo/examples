export function resolveEmojiParam(emoji?: string): string {
  if (typeof emoji === "string" && emoji) {
    const unicode = ensureUnicode(emoji);
    const url = getTwitterEmojiUrl(unicode);
    console.log("Using emoji: %s -> %s -> %s", emoji, unicode, url);
    return url;
  }

  return getTwitterEmojiUrl(getRandomEmoji());
}

// Random list of fun emojis, converted to unicode since my computer is on the latest os.
function getRandomEmoji() {
  const emojiList = ["1f953", "1f951", "1faac"];
  return emojiList[Math.floor(Math.random() * emojiList.length)];
}

function getTwitterEmojiUrl(id: string): string {
  return `https://jdecked.github.io/twemoji/v/latest/svg/${id.toLowerCase()}.svg`;
}

const regex = /[^\u0000-\u00ff]/; // Small performance gain from pre-compiling the regex

export function containsDoubleByte(str: string | undefined): boolean {
  if (!str?.length) return false;
  if (str.charCodeAt(0) > 255) return true;
  return regex.test(str);
}

export function toUnicode(str: string) {
  if (str.length < 4) return str.codePointAt(0).toString(16);
  return (
    str.codePointAt(0).toString(16) + "-" + str.codePointAt(2).toString(16)
  );
}

function ensureUnicode(str: string) {
  if (containsDoubleByte(str)) {
    return toUnicode(str);
  }
  return str;
}
