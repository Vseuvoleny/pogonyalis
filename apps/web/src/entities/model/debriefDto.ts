export type DebriefDto = {
  id: string;
  eventDate: string;
  eventType: EventType;
  boatClass: string;
  location: string;
  windFrom: number | null;
  windTo: number | null;
  windUnit: "ms" | "knots" | null;
  windGusts: number | null;
  windDirection: string | null;
  windComment: string | null;
  current: string;
  competitors: string;
  comment: string;
  nextSteps: string;
};

export type DebriefBody = Omit<DebriefDto, "id">;

export enum EventType {
  TRAINING = "training",
  RACE = "race",
  TRAINING_RACE = "training_race",
}
