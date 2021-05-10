export default function generateCodeBlock(
  text: string | Record<string, unknown>
): string {
  if (typeof text === "string") {
    return `\`\`\`
  ${text}
  \`\`\``;
  }
  return `\`\`\`
  ${JSON.stringify(text, null, 2)}
  \`\`\``;
}
