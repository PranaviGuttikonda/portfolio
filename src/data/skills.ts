// Given: the "03. Toolbox" cards.
// Approach: one entry per card, in display order.

export interface SkillGroup {
  label: string;
  items: string[];
}

export const skills: SkillGroup[] = [
  { label: 'LANGUAGES', items: ['C++', 'Python', 'Java', 'TypeScript', 'JavaScript', 'SQL'] },
  { label: 'SYSTEMS', items: ['Linux', 'Docker', 'Kubernetes', 'AWS', 'WebSockets', 'REST'] },
  {
    label: 'DATA & WEB',
    items: ['PostgreSQL', 'MongoDB', 'React', 'Next.js', 'FastAPI', 'Node.js'],
  },
  { label: 'ML', items: ['PyTorch', 'scikit-learn', 'MLflow', 'RAG', 'NLP'] },
];
