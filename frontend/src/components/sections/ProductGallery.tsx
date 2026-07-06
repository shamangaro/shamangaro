"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/shared/Container";

const galleryItems = [
  {
    src: "/images/neo-transat-open.png",
    alt: "Neo Transat مفتوحة - تصميم Premium",
    label: "تصميم أنيق",
    description: "خشب طبيعي و قماش متين",
  },
  {
    src: "/images/neo-transat-folded.png",
    alt: "Neo Transat مطوية - خفيفة و مدمجة",
    label: "خفيفة و مدمجة",
    description: "سهلة التخزين والتنقل",
  },
  {
    src: "/images/neo-transat-lifestyle-carry.png",
    alt: "سهلة الحمل للبحر والرحلات",
    label: "سهلة الحمل",
    description: "خدها معاك فين ما مشيتي",
  },
  {
    src: "/images/neo-transat-lifestyle-beach.png",
    alt: "Neo Transat على شاطئ استوائي",
    label: "مثالية للبحر",
    description: "الرفيق المثالي ديال الصيف",
  },
];

export function ProductGallery() {
  return (
    <section id="gallery" className="bg-white py-16 md:py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-navy md:text-4xl">
            شوف <span className="text-gold">Neo Transat</span> عن قرب
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            مصممة بعناية فائقة — خفيفة، أنيقة، متينة، و سهلة الإستعمال
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4 lg:gap-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-cream shadow-md transition-all duration-300 hover:shadow-xl"
            >
              <div className="aspect-square overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={400}
                  height={400}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 via-navy/50 to-transparent p-4 pt-12">
                <p className="text-sm font-bold text-white">{item.label}</p>
                <p className="mt-0.5 text-xs text-white/70">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
