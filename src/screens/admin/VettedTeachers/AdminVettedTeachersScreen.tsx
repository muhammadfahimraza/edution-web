'use client';

import { FormEvent, useMemo, useState } from 'react';
import { DataTable } from '@/components/admin/DataTable';
import { SideDrawer } from '@/components/admin/SideDrawer';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import {
  getVettedTeacherById,
  mockVettedTeachers,
  type VettedTeacher,
} from '@/mocks/adminF4F9.mock';

/**
 * F8 — Vetted teachers CRUD table + profile drawer
 */
export function AdminVettedTeachersScreen() {
  const [teachers, setTeachers] = useState(mockVettedTeachers);
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formSubjects, setFormSubjects] = useState('');
  const [formBio, setFormBio] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return teachers;
    return teachers.filter(
      t =>
        t.name.toLowerCase().includes(q) ||
        t.email.toLowerCase().includes(q) ||
        t.subjects.some(s => s.toLowerCase().includes(q)),
    );
  }, [query, teachers]);

  const selected = selectedId ? getVettedTeacherById(selectedId) : undefined;
  const drawerTeacher = selectedId
    ? teachers.find(t => t.id === selectedId)
    : undefined;

  const toggleVerified = (id: string) => {
    setTeachers(prev =>
      prev.map(t => (t.id === id ? { ...t, verified: !t.verified } : t)),
    );
  };

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.includes('@')) {
      alert('Name and valid email required.');
      return;
    }
    const newTeacher: VettedTeacher = {
      id: `vt-${Date.now()}`,
      name: formName.trim(),
      email: formEmail.trim(),
      subjects: formSubjects.split(',').map(s => s.trim()).filter(Boolean),
      verified: false,
      schoolsServed: 0,
      rating: 0,
      bio: formBio.trim() || 'New vetted teacher profile.',
      joinedAt: 'May 2026',
    };
    setTeachers(prev => [newTeacher, ...prev]);
    setShowAdd(false);
    setFormName('');
    setFormEmail('');
    setFormSubjects('');
    setFormBio('');
    setSelectedId(newTeacher.id);
  };

  return (
    <>
      <AdminPageHeader
        title="Vetted teachers"
        subtitle="Platform-wide educator pool for cross-school content"
        actions={<Button label="Add teacher" size="sm" onClick={() => setShowAdd(true)} />}
      />

      <div className="mb-4 max-w-md">
        <Input
          label="Search"
          placeholder="Name, email, subject…"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <DataTable
          data={filtered}
          keyExtractor={row => row.id}
          emptyMessage="No vetted teachers match."
          columns={[
            {
              key: 'name',
              header: 'Name',
              render: row => (
                <button
                  type="button"
                  className="text-left font-medium text-[var(--color-primary)] hover:underline"
                  onClick={() => setSelectedId(row.id)}>
                  {row.name}
                </button>
              ),
            },
            { key: 'email', header: 'Email', render: row => row.email },
            {
              key: 'subjects',
              header: 'Subjects',
              render: row => row.subjects.join(', '),
            },
            {
              key: 'verified',
              header: 'Verified',
              render: row => (
                <Badge
                  label={row.verified ? 'Yes' : 'Pending'}
                  variant={row.verified ? 'success' : 'warning'}
                />
              ),
            },
            {
              key: 'schools',
              header: 'Schools',
              render: row => row.schoolsServed,
            },
            {
              key: 'rating',
              header: 'Rating',
              render: row => (row.rating > 0 ? row.rating.toFixed(1) : '—'),
            },
            {
              key: 'actions',
              header: '',
              render: row => (
                <button
                  type="button"
                  className="text-sm font-medium text-[var(--color-primary)] hover:underline"
                  onClick={() => toggleVerified(row.id)}>
                  {row.verified ? 'Revoke' : 'Verify'}
                </button>
              ),
            },
          ]}
        />
      </div>

      <SideDrawer
        open={!!drawerTeacher}
        onClose={() => setSelectedId(null)}
        title={drawerTeacher?.name ?? ''}
        subtitle="Teacher profile"
        footer={
          drawerTeacher ? (
            <Button
              label={drawerTeacher.verified ? 'Revoke verification' : 'Mark verified'}
              variant="outline"
              fullWidth
              onClick={() => toggleVerified(drawerTeacher.id)}
            />
          ) : undefined
        }>
        {drawerTeacher ? (
          <div className="flex flex-col gap-4 text-sm">
            <p className="text-[var(--color-text-secondary)]">{drawerTeacher.email}</p>
            <div className="flex flex-wrap gap-1">
              {drawerTeacher.subjects.map(s => (
                <Badge key={s} label={s} variant="neutral" />
              ))}
            </div>
            <p>{drawerTeacher.bio}</p>
            <dl className="grid grid-cols-2 gap-3">
              <div>
                <dt className="text-[var(--color-text-secondary)]">Schools served</dt>
                <dd className="font-semibold">{drawerTeacher.schoolsServed}</dd>
              </div>
              <div>
                <dt className="text-[var(--color-text-secondary)]">Rating</dt>
                <dd className="font-semibold">
                  {drawerTeacher.rating > 0 ? drawerTeacher.rating : 'N/A'}
                </dd>
              </div>
              <div>
                <dt className="text-[var(--color-text-secondary)]">Joined</dt>
                <dd className="font-semibold">{drawerTeacher.joinedAt}</dd>
              </div>
              <div>
                <dt className="text-[var(--color-text-secondary)]">Status</dt>
                <dd>
                  <Badge
                    label={drawerTeacher.verified ? 'Verified' : 'Pending'}
                    variant={drawerTeacher.verified ? 'success' : 'warning'}
                  />
                </dd>
              </div>
            </dl>
          </div>
        ) : null}
      </SideDrawer>

      <SideDrawer
        open={showAdd}
        onClose={() => setShowAdd(false)}
        title="Add vetted teacher"
        footer={
          <Button
            label="Save teacher"
            fullWidth
            type="submit"
            form="add-teacher-form"
          />
        }>
        <form id="add-teacher-form" onSubmit={handleAdd} className="flex flex-col gap-4">
          <Input label="Full name" value={formName} onChange={e => setFormName(e.target.value)} required />
          <Input
            label="Email"
            type="email"
            value={formEmail}
            onChange={e => setFormEmail(e.target.value)}
            required
          />
          <Input
            label="Subjects"
            value={formSubjects}
            onChange={e => setFormSubjects(e.target.value)}
            hint="Comma-separated, e.g. Math, Physics"
          />
          <Textarea label="Bio" value={formBio} onChange={e => setFormBio(e.target.value)} rows={4} />
        </form>
      </SideDrawer>
    </>
  );
}
