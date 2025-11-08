import { z } from "zod";

// Authentication validation schemas
export const authSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Geçerli bir e-posta adresi girin" })
    .max(255, { message: "E-posta adresi 255 karakterden kısa olmalı" }),
  password: z
    .string()
    .min(6, { message: "Şifre en az 6 karakter olmalı" })
    .max(72, { message: "Şifre 72 karakterden kısa olmalı" }),
  username: z
    .string()
    .trim()
    .min(3, { message: "Kullanıcı adı en az 3 karakter olmalı" })
    .max(30, { message: "Kullanıcı adı 30 karakterden kısa olmalı" })
    .regex(/^[a-zA-Z0-9_]+$/, { 
      message: "Kullanıcı adı sadece harf, rakam ve alt çizgi içerebilir" 
    })
    .optional(),
});

// Profile validation schema
export const profileSchema = z.object({
  full_name: z
    .string()
    .trim()
    .max(100, { message: "Ad soyad 100 karakterden kısa olmalı" })
    .optional()
    .or(z.literal("")),
  bio: z
    .string()
    .trim()
    .max(500, { message: "Hakkımda 500 karakterden kısa olmalı" })
    .optional()
    .or(z.literal("")),
  location: z
    .string()
    .trim()
    .max(100, { message: "Konum 100 karakterden kısa olmalı" })
    .optional()
    .or(z.literal("")),
});

// Talent validation schema
export const talentSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "Başlık boş olamaz" })
    .max(100, { message: "Başlık 100 karakterden kısa olmalı" }),
  description: z
    .string()
    .trim()
    .max(1000, { message: "Açıklama 1000 karakterden kısa olmalı" })
    .optional()
    .or(z.literal("")),
  category: z.enum(["yazilim", "tasarim", "muzik", "dil", "spor", "egitim", "diger"], {
    errorMap: () => ({ message: "Geçerli bir kategori seçin" }),
  }),
});

// Message validation schema
export const messageSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, { message: "Mesaj boş olamaz" })
    .max(2000, { message: "Mesaj 2000 karakterden kısa olmalı" }),
});

// Contact form validation schema
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Ad soyad boş olamaz" })
    .max(100, { message: "Ad soyad 100 karakterden kısa olmalı" }),
  email: z
    .string()
    .trim()
    .email({ message: "Geçerli bir e-posta adresi girin" })
    .max(255, { message: "E-posta adresi 255 karakterden kısa olmalı" }),
  message: z
    .string()
    .trim()
    .min(1, { message: "Mesaj boş olamaz" })
    .max(2000, { message: "Mesaj 2000 karakterden kısa olmalı" }),
});
