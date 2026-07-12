"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "سارة م.",
    city: "كازابلانكا",
    text: "خديتها للبحر و الناس كلهم كيسولوني عليها 😍 خفيفة بزاف و مريحة — أحسن حاجة شريتها هاد الصيف!",
  },
  {
    name: "يوسف ب.",
    city: "مراكش",
    text: "شريت Pack Duo — أنا و مراتي مبهورين. الجودة ديال القماش و الخشب فوق المتوقع. التوصيل كان سريع بزاف.",
  },
  {
    name: "أمينة ل.",
    city: "الرباط",
    text: "كنستعملها فالتراس كل يوم مع القهوة. الجيران بداو كيطلبو مني الرابط 😂 ثمن معقول و جودة عالية.",
  },
];

export function Reviews() {
  return (
    <section className="bg-gradient-to-b from-[#fafafa] to-[#f5f5f5] py-14 md:py-20">
      <Container>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={18} className="fill-amber-400 text-amber-400" />
            ))}
          </div>
          <h2 className="mt-3 text-2xl font-bold text-navy md:text-3xl">
            +500 زبون راضي فالمغرب
          </h2>
          <p className="mt-2 text-base text-muted-foreground">
            تقييم 4.9/5 — طلبات مؤكدة من جميع المدن
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
              className="rounded-2xl border border-border/60 bg-white p-5 shadow-sm"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={13} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="mt-3 text-base leading-relaxed text-navy/80">
                &ldquo;{r.text}&rdquo;
              </p>

              <div className="mt-4 flex items-center gap-2.5 border-t border-border/50 pt-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy/5 text-xs font-bold text-navy">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy">
                    {r.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {r.city} · مؤكدة ✓
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
