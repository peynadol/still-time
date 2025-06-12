import { Session } from "./types";
export const mockSessions: Session[] = [
  {
    id: "1",
    type: "wood carving",
    tools: ["sloyd knife", "strop", "sandpaper"],
    duration: 90,
    mood: ["Focused", "Calm"],
    notes: "Worked on spoon shapes",
    timestamp: "2024-06-01T10:00:00.000Z",
  },
  {
    id: "2",
    type: "painting",
    tools: ["watercolours", "palette", "brushes"],
    duration: 60,
    mood: ["Playful"],
    notes: "Tried new technique",
    timestamp: "2024-06-05T15:00:00.000Z",
  },
  {
    id: "3",
    type: "wood carving",
    tools: ["sloyd knife", "axe"],
    duration: 120,
    mood: ["Grounded", "Introspective"],
    notes: "",
    timestamp: "2024-06-10T18:30:00.000Z",
  },
];
