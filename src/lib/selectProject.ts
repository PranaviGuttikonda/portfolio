// Given: the command palette selects a project while you're already on the home page.
// Approach: a window event the Projects switcher listens for, so the page doesn't reload.

export const SELECT_PROJECT_EVENT = 'select-project';

export interface SelectProjectDetail {
  id: string;
}

declare global {
  interface WindowEventMap {
    [SELECT_PROJECT_EVENT]: CustomEvent<SelectProjectDetail>;
  }
}
