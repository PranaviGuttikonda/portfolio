// Given: contact details and nav links appear in several places.
// Approach: keep them in one file so a change lands everywhere.

export const site = {
  name: 'Pranavi Guttikonda',
  title: 'Pranavi Guttikonda · Software Engineer',
  description:
    'Software engineer in Boston. MS in CS at Northeastern. Backend, distributed systems and C++.',
  email: 'p.avigutti05@gmail.com',
  github: 'https://github.com/PranaviGuttikonda',
  linkedin: 'https://www.linkedin.com/in/pranaviguttikonda/',
  resume: '/resume.pdf',
} as const;

export const navLinks = [
  { num: '01.', label: 'Experience', href: '/#experience' },
  { num: '02.', label: 'Projects', href: '/#projects' },
  { num: '03.', label: 'Skills', href: '/#skills' },
  { num: '04.', label: 'Contact', href: '/#contact' },
] as const;
