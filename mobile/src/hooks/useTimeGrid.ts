import { useMemo } from "react";
import dayjs from "dayjs";

import { TimeBlock, WorkflowMode } from "@types";

const TOTAL_BLOCKS = 144;

export const useTimeGrid = (sessions: TimeBlock[]) => {
  const now = dayjs();
  const activeIndex = now.hour() * 6 + Math.floor(now.minute() / 10);

  return useMemo(() => {
    return Array.from({ length: TOTAL_BLOCKS }, (_, index) => {
      const existing = sessions.find((block) => block.index === index);
      const labelHour = Math.floor(index / 6);
      const labelMinute = (index % 6) * 10;
      const label = `${labelHour.toString().padStart(2, "0")}:${labelMinute.toString().padStart(2, "0")}`;
      const isPast = index < activeIndex;
      const isActive = index === activeIndex;
      return (
        existing ?? {
          id: `block-${index}`,
          index,
          label,
          isPast,
          isActive
        }
      );
    });
  }, [sessions, activeIndex]);
};

export const mergeSessionMoodIntoBlocks = (blocks: TimeBlock[], sessions: WorkflowMode[] = []) =>
  blocks.map((block, idx) => ({
    ...block,
    mood: sessions[idx] ?? block.mood
  }));
