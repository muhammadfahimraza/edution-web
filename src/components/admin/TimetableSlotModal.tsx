'use client';

import { FormEvent, useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import type { TimetableCell, TimetableDay } from '@/mocks/schoolAdminG4G12.mock';

export type TimetableSlotModalProps = {
  open: boolean;
  section: string;
  period: number;
  day: TimetableDay;
  cell: TimetableCell;
  onClose: () => void;
  onSave: (cell: TimetableCell) => void;
};

export function TimetableSlotModal({
  open,
  section,
  period,
  day,
  cell,
  onClose,
  onSave,
}: TimetableSlotModalProps) {
  const [subject, setSubject] = useState(cell.subject);
  const [teacher, setTeacher] = useState(cell.teacher);
  const [room, setRoom] = useState(cell.room);

  useEffect(() => {
    setSubject(cell.subject);
    setTeacher(cell.teacher);
    setRoom(cell.room);
  }, [cell, open]);

  if (!open) {
    return null;
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave({ subject: subject.trim(), teacher: teacher.trim(), room: room.trim() });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl border border-[var(--color-border)] bg-white p-5 shadow-xl">
        <h2 className="text-lg font-semibold">Edit period</h2>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          {section} · Period {period} · {day}
        </p>
        <div className="mt-4 flex flex-col gap-3">
          <Input label="Subject" value={subject} onChange={e => setSubject(e.target.value)} />
          <Input label="Teacher" value={teacher} onChange={e => setTeacher(e.target.value)} />
          <Input label="Room" value={room} onChange={e => setRoom(e.target.value)} />
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <Button type="button" label="Cancel" variant="outline" size="sm" onClick={onClose} />
          <Button type="submit" label="Save slot" size="sm" />
        </div>
      </form>
    </div>
  );
}
