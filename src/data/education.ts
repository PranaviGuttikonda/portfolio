// Given: the Education block under "Where I've worked".
// Approach: one entry per degree, newest first.

export interface Degree {
  school: string;
  unit?: string;
  degree: string;
  dates: string;
  details: string[];
}

export const education: Degree[] = [
  {
    school: 'Northeastern University',
    unit: 'Khoury College',
    degree: 'MS in Computer Science',
    dates: 'Sep 2026 – May 2028',
    details: ['Coursework: Programming Design Paradigm, Database Management Systems'],
  },
  {
    school: 'University of Central Missouri',
    degree: 'B.S. in Computer Science',
    dates: 'May 2024',
    details: ['GPA 3.62 · Cum Laude', "Dean's List (Fall 2022, Spring 2023)"],
  },
];
