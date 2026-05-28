import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Введите корректный e-mail"),
  password: z.string().min(8, "Пароль должен быть от 8 символов").max(64, "Пароль слишком длинный"),
});

export const registerSchema = z.object({
  email: z.string().email("Введите корректный e-mail"),
  password: z.string().min(8, "Пароль должен быть от 8 символов").max(64, "Пароль слишком длинный"),
  confirm: z.string().min(8, "Повторите пароль"),
}).refine((data) => data.password === data.confirm, {
  message: "Пароли не совпадают",
  path: ["confirm"],
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
