export type LegalDocument = {
  slug: string;
  title: string;
  updatedAt: string;
  sections: { title: string; body: string }[];
};

export const legalDocuments: Record<string, LegalDocument> = {
  privacy: {
    slug: 'privacy',
    title: 'Privacy Policy',
    updatedAt: 'May 1, 2026',
    sections: [
      {
        title: 'Introduction',
        body: 'Edu Station ("we", "our") provides a school communication and learning platform for students, parents, and school staff. This policy explains how we collect, use, and protect personal information when you use our services.',
      },
      {
        title: 'Information we collect',
        body: 'We collect information provided by schools (student roster, class assignments), account credentials (phone numbers for parents/students, email for staff), usage data (homework submissions, chat messages, points), and device information for security and notifications.',
      },
      {
        title: 'How we use information',
        body: 'We use data to deliver homework, timetables, class chat, rewards, and parent dashboards; to authenticate users; to send notifications; and to improve our platform. We do not sell personal data to third parties.',
      },
      {
        title: 'Schools as data controllers',
        body: 'Schools that use Edu Station remain responsible for student records they upload. We process data on their behalf according to our agreement with each school.',
      },
      {
        title: 'Your rights',
        body: 'Parents may request access to their linked children\'s data through their school. Staff may update account settings in the web portal. Contact your school administrator or hello@edustation.pk for data requests.',
      },
      {
        title: 'Contact',
        body: 'For privacy questions: hello@edustation.pk',
      },
    ],
  },
  terms: {
    slug: 'terms',
    title: 'Terms of Service',
    updatedAt: 'May 1, 2026',
    sections: [
      {
        title: 'Acceptance',
        body: 'By using Edu Station you agree to these terms. If you use the service on behalf of a school, you confirm you have authority to bind that organisation.',
      },
      {
        title: 'Acceptable use',
        body: 'Users must communicate respectfully in class chats, submit authentic homework, and follow school policies. We may suspend accounts that violate school rules or applicable law.',
      },
      {
        title: 'Accounts',
        body: 'Parents authenticate via phone OTP. Students use student ID and parent phone. School staff use email and password. You are responsible for keeping credentials secure.',
      },
      {
        title: 'Rewards programme',
        body: 'Points and redemptions are governed by school and platform rules. Edu Station may modify reward catalogues with notice to schools.',
      },
      {
        title: 'Limitation of liability',
        body: 'Edu Station is provided "as is" to the extent permitted by law. Schools remain responsible for academic decisions and on-site safety.',
      },
      {
        title: 'Changes',
        body: 'We may update these terms. Material changes will be communicated to school administrators.',
      },
    ],
  },
};

export function getLegalDocument(slug: string): LegalDocument | undefined {
  return legalDocuments[slug];
}

export const schoolSizeOptions = [
  { value: '1-200', label: '1 – 200 students' },
  { value: '201-500', label: '201 – 500 students' },
  { value: '501-1000', label: '501 – 1,000 students' },
  { value: '1000+', label: '1,000+ students' },
];
