"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/shared/Container";

const steps = [
  {
    image: "/images/neo-transat-step-1.png",
    title: "فتح القماش و العصا",
    description: "دخّل العصا الخشبية من الجيوب الكبار و الصغار",
  },
  {
    image: "/images/neo-transat-step-2.png",
    title: "ركّب الهيكل",
    description: "صلّب العصا على شكل X و غرسها فالأرض",
  },
  {
    image: "/images/neo-transat-step-3.png",
    title: "استرخي!",
    description: "كلشي جاهز — غير تمدد و نعس الراحة ديالك",
  },
];

export function HowToUse() {
  return (
    <section className="bg-gradient-to-b from-[#fafafa] to-[#f5f5f5] py-14 md:py-20">
      <Container>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center text-2xl font-bold text-navy md:text-3xl"
        >
          كيفاش تركّبها؟ — في 30 ثانية فقط
        </motion.h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-3 md:gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: i * 0.12 }}
              className="flex flex-col items-center text-center"
            >
              <div className="relative w-full overflow-hidden rounded-2xl">
                <Image
                  src={step.image}
                  alt={step.title}
                  width={400}
                  height={400}
                  className="w-full object-contain"
                />
              </div>
              <h3 className="mt-4 text-lg font-bold text-navy md:text-xl">
                {step.title}
              </h3>
              <p className="mt-1 text-base text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
