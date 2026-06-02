export function downloadTextFile(filename: string, content: string, mime = 'text/plain;charset=utf-8') {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function downloadCsv(filename: string, rows: string[][]) {
  const lines = rows.map(row =>
    row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','),
  );
  downloadTextFile(filename, lines.join('\n'), 'text/csv;charset=utf-8');
}
