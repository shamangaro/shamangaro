"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { Feather, Timer, TreePine, Droplets, Ruler, Package } from "lucide-react";

const features = [
  {
    icon: Feather,
    title: "خفيفة — غير 2.5 كيلو",
    description: "أخف كرسي إسترخاء — حتى الدراري الصغار يقدرو يحملوها.",
  },
  {
    icon: Timer,
    title: "تتركب في 30 ثانية",
    description: "بلا أدوات، بلا تعقيد. تحلها و تسترخي فلحظة.",
  },
  {
    icon: TreePine,
    title: "خشب طبيعي صلب",
    description: "عصا من خشب الزان المعالج — متين، أنيق، و يدوم سنوات.",
  },
  {
    icon: Droplets,
    title: "قماش مقاوم",
    description: "مقاوم للماء، الشمس، و الرمل. ما كيتسخش بسهولة.",
  },
  {
    icon: Ruler,
    title: "مساحة مريحة — 140 سم",
    description: "مساحة واسعة تناسب أي شخص، كبير أو صغير.",
  },
  {
    icon: Package,
    title: "تتطوى بحال العصا",
    description: "تحطها فأي بلاصة — فالدار، فالطوموبيل، فالشنطة.",
  },
];

export function Features() {
  return (
    <section className="bg-gradient-to-b from-white to-[#f5f5f5] py-14 md:py-20">
      <Container>
        {/* Header with image */}
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative mx-auto max-w-sm lg:max-w-none"
          >
            <div className="overflow-hidden rounded-3xl">
              <Image
                src="/images/neo-transat-fabric-quality.png"
                alt="قماش Neo Transat قوي — مقاوم للشمس والماء"
                width={720}
                height={900}
                className="w-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-navy md:text-3xl">
              مصممة باش تعطيك أحسن راحة
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              كل تفصيلة مفكر فيها — من المواد حتال التصميم
            </p>
          </motion.div>
        </div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.35 }}
          className="mt-12 overflow-hidden rounded-3xl border-2 border-fabric bg-fabric/[0.04] shadow-sm shadow-fabric/10"
        >
          {/* Highlighted first feature */}
          <div className="p-5 sm:p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy/5 text-navy">
              <Feather size={20} />
            </div>
            <h3 className="mt-4 text-base font-bold text-navy md:text-lg">
              {features[0].title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground md:text-base">
              {features[0].description}
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-fabric/35 to-transparent" />

          {/* Remaining features */}
          <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-3">
            {features.slice(1).map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className="group rounded-2xl border border-border/60 bg-[#fafafa] p-5 transition-all duration-300 hover:border-navy/20 hover:bg-white hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy/5 text-navy transition-colors group-hover:bg-navy/10">
                  <f.icon size={20} />
                </div>
                <h3 className="mt-4 text-base font-bold text-navy md:text-lg">
                  {f.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {f.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
