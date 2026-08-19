export type DebriefDto = {
  id: string;
  eventDate: string;
  eventType: string;
  boatClass: string;
  location: string;
  wind: string;
  current: string;
  competitors: string;
  comment: string;
  nextSteps: string;
};

export type DebriefBody = Omit<DebriefDto, "id">;
