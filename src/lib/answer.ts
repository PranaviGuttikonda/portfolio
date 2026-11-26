import { qa, fallback, type QA } from '../data/chatbot';

// Given: a free-text question and the keyword table in data/chatbot.ts.
// Approach: score each entry by the total length of the keywords it matches, so a
//   specific hit ("available") beats an incidental one ("open"). Ties go to the
//   entry listed first. No match → the fallback line.

const SHORT_KEYWORD = 3;

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Whole-word test that also works for keywords like "c++", where \b fails.
const wholeWord = (text: string, keyword: string) =>
  new RegExp(`(?<![\\p{L}\\p{N}])${escapeRegExp(keyword)}(?![\\p{L}\\p{N}])`, 'u').test(text);

const matches = (text: string, keyword: string) =>
  keyword.length <= SHORT_KEYWORD ? wholeWord(text, keyword) : text.includes(keyword);

export function matchAnswer(question: string, table: QA[] = qa): string {
  const text = question.toLowerCase();
  let best: { score: number; answer: string } | null = null;

  for (const entry of table) {
    const score = entry.keywords
      .filter((k) => matches(text, k.toLowerCase()))
      .reduce((sum, k) => sum + k.length, 0);
    if (score > 0 && (!best || score > best.score)) best = { score, answer: entry.answer };
  }

  return best?.answer ?? fallback;
}

// Given: the UI should not care where answers come from.
// Approach: the chat only calls getAnswer(). Swapping in an API call later means
//   changing this one function, not the component.
export async function getAnswer(question: string): Promise<string> {
  return matchAnswer(question);
}
