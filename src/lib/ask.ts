// Given: buttons anywhere on the site ("Ask about this") need to send a question to the chat.
// Approach: a window-level custom event. The chat island listens for it, scrolls
//   itself into view, and sends the question.

export const ASK_EVENT = 'ask-pranavi';

export interface AskDetail {
  question: string;
}

export function askPranavi(question: string) {
  window.dispatchEvent(new CustomEvent<AskDetail>(ASK_EVENT, { detail: { question } }));
}

declare global {
  interface WindowEventMap {
    [ASK_EVENT]: CustomEvent<AskDetail>;
  }
}
