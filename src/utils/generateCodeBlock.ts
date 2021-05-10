/**
 * put a string or object inside code block markdown
 * @param text the string or object to be in code blocks
 * @param removeStartEnd
 * whether to remove the curly braces at the starting and ending if it an object
 * @returns code blocked markdown string
 */
export default function generateCodeBlock(
  text: string | Record<string, unknown>,
  removeStartEnd = false,
): string {
  if (typeof text === 'string') {
    return `\`\`\`
  ${text}
  \`\`\``;
  }

  const stringifiedJSON = JSON.stringify(text, null, 2);

  if (removeStartEnd) {
    return `\`\`\`
    ${stringifiedJSON.substring(1, stringifiedJSON.length - 1)}
    \`\`\``;
  }

  return `\`\`\`
  ${JSON.stringify(text, null, 2)}
  \`\`\``;
}
