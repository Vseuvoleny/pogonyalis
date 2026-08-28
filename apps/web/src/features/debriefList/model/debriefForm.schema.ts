import { z } from "zod";
import dayjs from "dayjs";
import { EventType } from "@/entities";

export const debriefFormSchema = z
  .object({
    eventDate: z
      .string()
      .min(1, "Укажи дату события")
      .refine((val) => dayjs(val).isBefore(dayjs().add(1, "day"), "day"), {
        message: "Дата не может быть из будущего",
      }),
    eventType: z.nativeEnum(EventType),
    boatClass: z.string().min(1, "Укажи класс яхты"),
    location: z.string(),
    windFrom: z.number().min(0).nullable(),
    windTo: z.number().min(0).nullable(),
    windUnit: z.enum(["ms", "knots"]).nullable(),
    windGusts: z.number().min(0).nullable(),
    windDirection: z.enum(["С", "СВ", "В", "ЮВ", "Ю", "ЮЗ", "З", "СЗ"]).nullable(),
    windComment: z.string(),
    current: z.string(),
    competitors: z.string(),
    comment: z.string().min(1, "Добавь комментарий о событии"),
    nextSteps: z.string(),
  })
  .superRefine((data, ctx) => {
    if (
      data.windFrom != null &&
      data.windTo != null &&
      data.windTo < data.windFrom
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Ветер «до» не может быть меньше «от»",
        path: ["windTo"],
      });
    }

    if (
      data.windGusts != null &&
      data.windTo != null &&
      data.windGusts < data.windTo
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Порывы не могут быть меньше ветра «до»",
        path: ["windGusts"],
      });
    }
  });

export type DebriefFormValues = z.infer<typeof debriefFormSchema>;
