"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { Timer, TreePine, Droplets, Scale, Package } from "lucide-react";

const features = [
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
    icon: Scale,
    title: "تحمل حتى 90 كيلو",
    description: "هيكل قوي من خشب صلب — راحة آمنة للاستخدام اليومي.",
  },
  {
    icon: Package,
    title: "تتطوى بحال العصا",
    description: "تحطها فأي بلاصة — فالدار، فالطوموبيل، فالشنطة.",
  },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[number];
  index: number;
}) {
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="rounded-2xl border-2 border-navy bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md sm:p-5"
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy/5 text-navy">
          <Icon size={20} strokeWidth={1.75} />
        </div>
        <div className="min-w-0">
          <h3 className="text-base font-extrabold leading-snug text-navy sm:text-lg">
            {feature.title}
          </h3>
          <p className="mt-1.5 text-[15px] font-medium leading-relaxed text-navy/80 sm:mt-2 sm:text-base">
            {feature.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function Features() {
  return (
    <section className="bg-gradient-to-b from-white to-[#f5f5f5] py-14 md:py-20">
      <Container>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-2xl font-extrabold leading-snug text-navy md:text-3xl lg:text-4xl">
            مصممة باش تعطيك <span className="text-fabric">أحسن راحة</span>
          </h2>
          <div className="mx-auto mt-4 h-0.5 w-14 rounded-full bg-fabric" />
          <p className="mt-4 text-base font-medium leading-relaxed text-navy/70 md:text-lg">
            كل تفصيلة مفكر فيها — من المواد حتال التصميم
          </p>
        </motion.div>

        {/* Product image */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative mx-auto mt-10 max-w-sm sm:max-w-md"
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

        {/* Feature Cards */}
        <div className="mt-10 flex flex-col gap-3 sm:mt-12 sm:gap-4">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
