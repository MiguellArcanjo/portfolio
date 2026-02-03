"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { HiMail, HiPhone, HiLocationMarker } from "react-icons/hi";
import { useLanguage } from "./LanguageProvider";

const contactSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const { t, language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar mensagem");
      }

      setSubmitStatus("success");
      reset();
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 bg-gray-50 dark:bg-dark-900/50 relative overflow-x-hidden w-full"
    >
      <div className="container mx-auto px-4 sm:px-6 w-full max-w-[100vw] box-border">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
            {t.contact.title}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">{t.contact.subtitle}</p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 sm:gap-8 w-full min-w-0">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 min-w-0 w-full"
          >
            <div className="bg-white dark:bg-dark-800/50 rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-primary-500/20 shadow-md dark:shadow-none min-w-0">
              <div className="flex items-center gap-4 mb-4 min-w-0">
                <div className="p-3 bg-primary-600/20 rounded-lg shrink-0">
                  <HiMail className="text-primary-400" size={24} />
                </div>
                <div className="min-w-0 overflow-hidden">
                  <h3 className="text-gray-900 dark:text-white font-semibold">E-mail</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm break-all">contato.miguelarcanjo2305@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-dark-800/50 rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-primary-500/20 shadow-md dark:shadow-none min-w-0">
              <div className="flex items-center gap-4 mb-4 min-w-0">
                <div className="p-3 bg-primary-600/20 rounded-lg shrink-0">
                  <HiPhone className="text-primary-400" size={24} />
                </div>
                <div className="min-w-0 overflow-hidden">
                  <h3 className="text-gray-900 dark:text-white font-semibold">Telefone</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm break-all">+55 (83) 98825-6821</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-dark-800/50 rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-primary-500/20 shadow-md dark:shadow-none min-w-0">
              <div className="flex items-center gap-4 mb-4 min-w-0">
                <div className="p-3 bg-primary-600/20 rounded-lg shrink-0">
                  <HiLocationMarker className="text-primary-400" size={24} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-gray-900 dark:text-white font-semibold">Localização</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">João Pessoa, PB</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white dark:bg-dark-800/50 rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-primary-500/20 min-w-0 w-full box-border shadow-md dark:shadow-none"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full min-w-0">
              <div className="min-w-0 w-full">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.contact.name}
                </label>
                <input
                  {...register("name")}
                  type="text"
                  id="name"
                  className="w-full min-w-0 max-w-full px-4 py-3 bg-gray-50 dark:bg-dark-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors box-border"
                  placeholder={t.contact.name}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
                )}
              </div>

              <div className="min-w-0 w-full">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.contact.email}
                </label>
                <input
                  {...register("email")}
                  type="email"
                  id="email"
                  className="w-full min-w-0 max-w-full px-4 py-3 bg-gray-50 dark:bg-dark-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors box-border"
                  placeholder={t.contact.email}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                )}
              </div>

              <div className="min-w-0 w-full">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.contact.message}
                </label>
                <textarea
                  {...register("message")}
                  id="message"
                  rows={5}
                  className="w-full min-w-0 max-w-full px-4 py-3 bg-gray-50 dark:bg-dark-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors resize-none box-border"
                  placeholder={t.contact.message}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
                )}
              </div>

              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-900/30 border border-green-500/50 rounded-lg text-green-400 text-sm"
                >
                  {t.contact.success}
                </motion.div>
              )}

              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-900/30 border border-red-500/50 rounded-lg text-red-400 text-sm"
                >
                  {t.contact.error}
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full min-w-0 max-w-full px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-primary-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed box-border"
              >
                {isSubmitting ? t.contact.sending : t.contact.send}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
