import { HomeworkReportView } from '@/screens/shared/reports/HomeworkReportView';

export function PrincipalHomeworkReportScreen({ slug }: { slug: string }) {
  return <HomeworkReportView slug={slug} />;
}
