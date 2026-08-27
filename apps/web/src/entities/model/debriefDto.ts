export type DebriefDto = {
  id: string;
  eventDate: string;
  eventType: EventType;
  boatClass: string;
  location: string;
  wind: string;
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
