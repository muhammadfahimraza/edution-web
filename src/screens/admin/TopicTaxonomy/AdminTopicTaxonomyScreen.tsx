'use client';

import { useState } from 'react';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast';
import { mockTaxonomy, type TaxonomySubject } from '@/mocks/adminF4F9.mock';
import { cn } from '@/lib/utils';

/**
 * F9 — Topic taxonomy: subject → topics nested list
 */
export function AdminTopicTaxonomyScreen() {
  const { showToast } = useToast();
  const [subjects, setSubjects] = useState<TaxonomySubject[]>(mockTaxonomy);
  const [expanded, setExpanded] = useState<Set<string>>(
    () => new Set(mockTaxonomy.map(s => s.id)),
  );
  const [newSubject, setNewSubject] = useState('');
  const [addingTopicFor, setAddingTopicFor] = useState<string | null>(null);
  const [newTopicName, setNewTopicName] = useState('');

  const toggle = (id: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const addSubject = () => {
    const name = newSubject.trim();
    if (!name) return;
    const id = `sub-${name.toLowerCase().replace(/\s+/g, '-')}`;
    if (subjects.some(s => s.id === id)) {
      showToast({ title: 'Subject already exists', variant: 'error' });
      return;
    }
    setSubjects(prev => [...prev, { id, name, topics: [] }]);
    setExpanded(prev => new Set(prev).add(id));
    setNewSubject('');
  };

  const addTopic = (subjectId: string) => {
    const name = newTopicName.trim();
    if (!name) return;
    setSubjects(prev =>
      prev.map(s =>
        s.id === subjectId
          ? {
              ...s,
              topics: [
                ...s.topics,
                {
                  id: `t-${Date.now()}`,
                  name,
                  videoCount: 0,
                },
              ],
            }
          : s,
      ),
    );
    setNewTopicName('');
    setAddingTopicFor(null);
  };

  const removeTopic = (subjectId: string, topicId: string) => {
    if (!confirm('Remove this topic? UI demo only.')) return;
    setSubjects(prev =>
      prev.map(s =>
        s.id === subjectId
          ? { ...s, topics: s.topics.filter(t => t.id !== topicId) }
          : s,
      ),
    );
  };

  return (
    <>
      <AdminPageHeader
        title="Topic taxonomy"
        subtitle="Subject → topic hierarchy for video cataloguing"
      />

      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end">
        <div className="flex-1">
          <Input
            label="Add subject"
            placeholder="e.g. Chemistry"
            value={newSubject}
            onChange={e => setNewSubject(e.target.value)}
          />
        </div>
        <Button label="Add subject" onClick={addSubject} className="sm:mb-0 sm:self-end" />
      </div>

      <ul className="flex flex-col gap-3">
        {subjects.map(subject => {
          const isOpen = expanded.has(subject.id);
          const topicTotal = subject.topics.reduce((n, t) => n + t.videoCount, 0);
          return (
            <li
              key={subject.id}
              className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left hover:bg-[var(--color-background)]"
                onClick={() => toggle(subject.id)}
                aria-expanded={isOpen}>
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      'text-sm transition-transform',
                      isOpen && 'rotate-90',
                    )}
                    aria-hidden>
                    ▶
                  </span>
                  <span className="text-lg font-semibold text-[var(--color-text)]">
                    {subject.name}
                  </span>
                  <Badge label={`${subject.topics.length} topics`} variant="neutral" />
                  <Badge label={`${topicTotal} videos`} variant="primary" />
                </div>
              </button>

              {isOpen ? (
                <div className="border-t border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3">
                  <ul className="flex flex-col gap-2 pl-8">
                    {subject.topics.map(topic => (
                      <li
                        key={topic.id}
                        className="flex items-center justify-between rounded-lg border border-[var(--color-border)] bg-white px-3 py-2">
                        <span className="font-medium">{topic.name}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-[var(--color-text-secondary)]">
                            {topic.videoCount} videos
                          </span>
                          <button
                            type="button"
                            className="text-xs text-[var(--color-error)] hover:underline"
                            onClick={() => removeTopic(subject.id, topic.id)}>
                            Remove
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {addingTopicFor === subject.id ? (
                    <div className="mt-3 flex flex-col gap-2 pl-8 sm:flex-row sm:items-end">
                      <Input
                        label="Topic name"
                        value={newTopicName}
                        onChange={e => setNewTopicName(e.target.value)}
                        placeholder="e.g. Organic chemistry"
                      />
                      <Button label="Save topic" size="sm" onClick={() => addTopic(subject.id)} />
                      <Button
                        label="Cancel"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setAddingTopicFor(null);
                          setNewTopicName('');
                        }}
                      />
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="mt-3 pl-8 text-sm font-medium text-[var(--color-primary)] hover:underline"
                      onClick={() => {
                        setAddingTopicFor(subject.id);
                        setNewTopicName('');
                      }}>
                      + Add topic
                    </button>
                  )}
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </>
  );
}
