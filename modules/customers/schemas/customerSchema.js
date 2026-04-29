import { z } from "zod";

export const customerSchema = z.object({
  name: z
    .string()
    .min(3, "O nome deve ter no mínimo 3 caracteres")
    .max(120, "Nome muito longo"),
  phone: z.string().optional(),
  cep: z
    .string()
    .regex(
      /^\d{2}\.\d{3}-\d{3}$/,
      "CEP inválido. Formato esperado: 00.000-000",
    ),
  city: z.string().min(2, "Informe uma cidade válida"),
  state: z
    .string()
    .min(2, "Estado inválido")
    .max(2, "Use apenas a sigla (ex: SP)"),
  avatar_url: z.string().nullable().optional(),
  status: z.boolean().default(true),
});
