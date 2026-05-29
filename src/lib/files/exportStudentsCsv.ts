import { downloadTextFile } from './download';
import type { StudentRosterRow } from '@/mocks/schoolAdminG4G12.mock';

export function exportStudentsCsv(rows: StudentRosterRow[], filename = 'student-roster.csv') {
  const header = ['Student ID', 'Name', 'Class', 'Parent phone', 'Status'];
  const lines = [
    header.join(','),
    ...rows.map(r =>
      [r.studentId, r.name, r.classSection, r.parentPhone, r.status]
        .map(v => `"${String(v).replace(/"/g, '""')}"`)
        .join(','),
    ),
  ];
  downloadTextFile(filename, lines.join('\n'));
}
