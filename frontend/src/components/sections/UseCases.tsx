"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/shared/Container";

const useCases = [
  { label: "البحر", emoji: "🏖️" },
  { label: "الحديقة", emoji: "🌴" },
  { label: "المسبح", emoji: "🏊" },
  { label: "التراس", emoji: "🏡" },
  { label: "الكامبينغ", emoji: "⛺" },
  { label: "الجبل", emoji: "🏔️" },
  { label: "المطعم", emoji: "🍽️" },
  { label: "الفيلا", emoji: "☀️" },
  { label: "Road Trip", emoji: "🚗" },
  { label: "الغابة", emoji: "🌲" },
];

export function UseCases() {
  return (
    <section id="usecases" className="bg-white py-16 md:py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-navy md:text-4xl">
            خدها معاك <span className="text-gold">فين ما مشيتي</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Neo Transat مصممة لكل المناسبات و كل الفصول — من الصيف حتال الشتاء
          </p>
        </motion.div>

        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 md:gap-4">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group flex flex-col items-center gap-2 rounded-2xl border border-border/50 bg-cream/50 p-4 transition-all duration-300 hover:border-gold/30 hover:bg-gold/5 hover:shadow-md md:p-5"
            >
              <span className="text-3xl">{useCase.emoji}</span>
              <span className="text-sm font-semibold text-navy">
                {useCase.label}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center text-muted-foreground"
        >
          و بزاف ديال البلايص الأخرى... الراحة ما عندها حدود مع{" "}
          <span className="font-semibold text-gold">Neo Transat</span>
        </motion.p>
      </Container>
    </section>
  );
}
