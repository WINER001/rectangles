import { create } from "zustand";
import { persist } from "zustand/middleware";
import dayjs from "dayjs";
import { nanoid } from "nanoid/non-secure";

import { WorkflowSession, WorkflowMode } from "@types";

interface WorkflowState {
  mode: WorkflowMode;
  sessions: WorkflowSession[];
  switchMode: (mode: WorkflowMode) => void;
  startSession: (mode: WorkflowMode) => void;
  completeSession: (payload: { id: string; reflection?: string; aiSummary?: string }) => void;
  archive: WorkflowSession[];
}

export const useWorkflowStore = create<WorkflowState>()(
  persist(
    (set) => ({
      mode: "thinking",
      sessions: [],
      archive: [],
      switchMode: (mode) => set({ mode }),
      startSession: (mode) =>
        set((state) => ({
          mode,
          sessions: [
            ...state.sessions,
            {
              id: nanoid(),
              mode,
              startedAt: dayjs().toISOString()
            }
          ]
        })),
      completeSession: ({ id, reflection, aiSummary }) =>
        set((state) => {
          const sessionIndex = state.sessions.findIndex((session) => session.id === id);
          if (sessionIndex === -1) {
            return state;
          }

          const updatedSessions = [...state.sessions];
          const session = updatedSessions[sessionIndex];
          const completedSession: WorkflowSession = {
            ...session,
            endedAt: dayjs().toISOString(),
            reflection,
            aiSummary
          };
          updatedSessions[sessionIndex] = completedSession;

          return {
            ...state,
            sessions: updatedSessions,
            archive: [completedSession, ...state.archive].slice(0, 100)
          };
        })
    }),
    {
      name: "workflow-store"
    }
  )
);
