// src/schemas/authSchemas.js
import { z } from "zod";

// Nome
export const nameField = z
  .string()
  .min(3, "O nome deve ter no mínimo 3 caracteres")
  .max(120, "Nome muito longo");
  

// E-mail
export const emailField = z
  .string()
  .min(1, 'E-mail precisa ser preenchido')
  .email('E-mail inválido');


// Senha forte
export const passwordField = z
  .string()
  .min(8, "A senha deve ter no mínimo 8 caracteres")
  .max(50, "Senha muito longa")
  .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
  .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
  .regex(/[0-9]/, "A senha deve conter pelo menos um número")
  .regex(/[^A-Za-z0-9]/, "A senha deve conter pelo menos um caractere especial");

// Telefone (somente dígitos e opcional +55)
export const phoneField = z
  .string()
  .trim()
  .regex(/^\(\d{2}\)\d{5}-\d{4}$/, "Telefone inválido. Formato esperado: (00)00000-0000")
  .optional();

// Cidade
export const cityField = z
  .string()
  .min(2, "Informe uma cidade válida")
  .max(100, "Nome de cidade muito longo")
  .optional();


// Estado (UF)
export const stateField = z
  .string()
  .min(2, 'Estado deve ter 2 letras (UF)')
  .transform((s) => s.toUpperCase())
  .optional();

// Termos
export const termsField = z
.boolean()
.refine((val) => val === true, {
  message: "Você deve aceitar os termos e condições"
});



// Schema de Cadastro
export const registerSchema = z.object({
  name: nameField,
  email: emailField,
  password: passwordField,
  phone: phoneField,
  cep: z.string().regex(/^\d{2}\.\d{3}-\d{3}$/, "CEP inválido. Formato esperado: 12.345-678"),
  state: stateField,
  city: cityField,
  terms: termsField,
  photoURL: z.string().url("URL inválida").optional().or(z.literal("")),
  permissions: z.array(z.string()).optional(),
  status: z.string()
});

 // Schema de reset de senha
export const resetPassordSchema = z.object({
  password: passwordField,
});




// Schema de Cadastro
export const editUserSchema = z.object({
  name: nameField,
  email: emailField,
  phone: phoneField,
  cep: z.string().regex(/^\d{2}\.\d{3}-\d{3}$/, "CEP inválido. Formato esperado: 12.345-678"),
  state: stateField,
  city: cityField,
  photoURL: z.string().optional()
});

