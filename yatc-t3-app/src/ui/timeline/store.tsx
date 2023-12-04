import { create, useStore } from 'zustand';
import React, { createContext, useContext, useRef } from 'react'
import type { Timeline, Tweet } from 'src/server/core/Tweet';

interface TimelineState {
  timeline: Timeline,
  addTweet: (tweet: Tweet) => void
}

type TimelineStore = ReturnType<typeof createTimelineStore>

const createTimelineStore = (timeline: Timeline = []) => create<TimelineState>()(set => ({
  timeline: timeline,
  addTweet: (tweet) => set(state => ({timeline: [tweet, ...state.timeline]}))
}));

const TimelineContext = createContext<TimelineStore | null>(null);

export const TimelineProvider = ({children, ...props}: React.PropsWithChildren<{timeline: Timeline}>) => {
  const storeRef = useRef<TimelineStore>();
  if (!storeRef.current) {
    storeRef.current = createTimelineStore(props.timeline);
  }
  return (
    <TimelineContext.Provider value={storeRef.current}>
      {children}
    </TimelineContext.Provider>
  );
}

export function useTimeline<T>(selector: (state: TimelineState) => T): T {
  const store = useContext(TimelineContext);
  if (!store) throw new Error('Missing TimelineContext.Provider in the tree');
  return useStore(store, selector);
}