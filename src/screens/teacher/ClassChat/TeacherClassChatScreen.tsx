'use client';

import { useState } from 'react';
import { ChatBubble } from '@/components/chat/ChatBubble';
import { ChatComposer } from '@/components/chat/ChatComposer';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { mockChatByClass, teacherClassOptions, type ChatMessage } from '@/mocks/teacher.mock';

export function TeacherClassChatScreen() {
  const [classSection, setClassSection] = useState(teacherClassOptions[0]);
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>(mockChatByClass);

  const thread = messages[classSection] ?? [];

  const sendMessage = (body: string) => {
    const msg: ChatMessage = {
      id: `m-${Date.now()}`,
      senderName: 'Ayesha Khan',
      senderRole: 'teacher',
      body,
      time: 'Just now',
      isOwn: true,
    };
    setMessages(prev => ({
      ...prev,
      [classSection]: [...(prev[classSection] ?? []), msg],
    }));
  };

  return (
    <>
      <AdminPageHeader title="Class chat" subtitle="Channel for class discussion (B10 pattern)" />

      <div className="mb-4 flex gap-2">
        {teacherClassOptions.map(c => (
          <button
            key={c}
            type="button"
            onClick={() => setClassSection(c)}
            className={
              classSection === c
                ? 'rounded-full bg-[var(--color-primary)] px-4 py-1.5 text-sm font-semibold text-white'
                : 'rounded-full border border-[var(--color-border)] bg-white px-4 py-1.5 text-sm font-medium text-[var(--color-text-secondary)]'
            }>
            Grade {c}
          </button>
        ))}
      </div>

      <div className="flex h-[520px] flex-col overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-background)]">
        <header className="border-b border-[var(--color-border)] bg-white px-4 py-3">
          <p className="font-semibold">Grade {classSection} — General</p>
          <p className="text-xs text-[var(--color-text-secondary)]">{thread.length} messages</p>
        </header>
        <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
          {thread.map(m => (
            <ChatBubble
              key={m.id}
              body={m.body}
              senderName={m.senderName}
              time={m.time}
              isOwn={m.isOwn}
            />
          ))}
        </div>
        <ChatComposer onSend={sendMessage} placeholder={`Message Grade ${classSection}…`} />
      </div>
    </>
  );
}
