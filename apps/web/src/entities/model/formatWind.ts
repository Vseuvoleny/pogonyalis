import { DebriefDto } from "./debriefDto";

const UNIT_LABEL: Record<string, string> = {
  ms: "м/с",
  knots: "уз",
};

export function formatWind(debrief: Pick<DebriefDto, "windFrom" | "windTo" | "windUnit" | "windGusts">): string {
  const { windFrom, windTo, windUnit, windGusts } = debrief;
  const unit = windUnit ? UNIT_LABEL[windUnit] ?? windUnit : "";

  const parts: string[] = [];

  if (windFrom != null && windTo != null) {
    parts.push(`${windFrom}–${windTo} ${unit}`);
  } else if (windFrom != null) {
    parts.push(`от ${windFrom} ${unit}`);
  } else if (windTo != null) {
    parts.push(`до ${windTo} ${unit}`);
  }

  if (windGusts != null) {
    parts.push(`порывы до ${windGusts} ${unit}`);
  }

  return parts.join(", ");
}
