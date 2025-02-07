import { z } from "zod";

export const validationSchema = {
  titleSchema: z
    .string()
    .min(2, { message: "Поле должно содержать не менее 2 символов" })
    .optional(),

  descriptionSchema: z
    .string()
    .min(2, { message: "Поле должно содержать не менее 2 символов" })
    .optional(),

  dateSchema: z
    .string({ message: "Не выбрана дата проведения семинара" })
    .refine((date) => new Date(date) > new Date(), {
      message: "Дата проведения семинара не может быть в прошлом",
    })
    .optional(),

  timeSchema: z.string().optional(),

  photoSchema: z
    .string()
    .url({ message: "Поле должно содержать корректный URL" })
    .optional(),
};
