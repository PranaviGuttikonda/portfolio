// Given: the education rows in About's "At a glance" card.
// Approach: one entry per degree, newest first.

export interface Degree {
  dates: string;
  school: string;
  degree: string;
  details: string;
}

export const education: Degree[] = [
  {
    dates: 'Sep 2026 – May 2028',
    school: 'Northeastern University',
    degree: 'MS in Computer Science',
    details: 'Coursework: Programming Design Paradigm, Database Management Systems',
  },
  {
    dates: 'May 2024',
    school: 'University of Central Missouri',
    degree: 'B.S. in Computer Science',
    details: "GPA 3.62 · Cum Laude · Dean's List",
  },
];

// Short facts under the education rows.
export const glance = [
  { label: 'BASED IN', value: 'Boston, MA' },
  { label: 'WORKS IN', value: 'C++ · Python · Java' },
];
