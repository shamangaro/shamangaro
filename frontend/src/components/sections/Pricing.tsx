"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { Check, Star, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

const packs = [
  {
    name: "Pack Solo",
    chairs: 1,
    price: 299,
    pricePerChair: 299,
    popular: false,
    whatsappMessage: "سلام عليكم، بغيت نطلب Pack Solo (1 Neo Transat) — 299 MAD 🌴",
    features: [
      "1 Neo Transat",
      "توصيل لجميع المدن",
      "الدفع عند الإستلام",
      "ضمان سنة كاملة",
    ],
  },
  {
    name: "Pack Duo",
    chairs: 2,
    price: 498,
    pricePerChair: 249,
    popular: true,
    whatsappMessage: "سلام عليكم، بغيت نطلب Pack Duo (2 Neo Transat) — 498 MAD 🌴",
    features: [
      "2 Neo Transat",
      "وفّر 100 MAD",
      "توصيل لجميع المدن",
      "الدفع عند الإستلام",
      "ضمان سنة كاملة",
    ],
  },
  {
    name: "Pack Family",
    chairs: 3,
    price: 687,
    pricePerChair: 229,
    popular: false,
    whatsappMessage: "سلام عليكم، بغيت نطلب Pack Family (3 Neo Transat) — 687 MAD 🌴",
    features: [
      "3 Neo Transat",
      "وفّر 210 MAD",
      "أحسن ثمن للوحدة",
      "توصيل لجميع المدن",
      "الدفع عند الإستلام",
      "ضمان سنة كاملة",
    ],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="bg-cream py-16 md:py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-navy md:text-4xl">
            الأثمنة <span className="text-gold">ديالنا</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            أثمنة مناسبة لجودة premium — و كلما زدتي كلما وفّرتي
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-navy/5 px-4 py-2 text-sm font-semibold text-navy">
            <Truck size={16} />
            الدفع عند الإستلام — بلا كارطة بنكية
          </div>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-3 md:gap-5 lg:gap-8">
          {packs.map((pack, index) => (
            <motion.div
              key={pack.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "relative flex flex-col rounded-3xl border-2 p-6 transition-all duration-300 md:p-8",
                pack.popular
                  ? "border-gold bg-white shadow-xl shadow-gold/10 scale-[1.02]"
                  : "border-border/50 bg-white hover:border-gold/30 hover:shadow-lg"
              )}
            >
              {pack.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gold px-5 py-1.5 text-sm font-bold text-white shadow-md">
                  <Star size={14} className="mb-0.5 inline" /> الأكثر طلباً
                </div>
              )}

              <div className="text-center">
                <h3 className="text-xl font-bold text-navy">{pack.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {pack.chairs} {pack.chairs === 1 ? "كرسي" : "كراسي"}
                </p>
              </div>

              <div className="mt-6 text-center">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-extrabold text-navy md:text-5xl">
                    {pack.pricePerChair}
                  </span>
                  <span className="text-lg font-semibold text-muted-foreground">
                    MAD
                  </span>
                </div>
                {pack.chairs > 1 && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    للكرسي الواحد — المجموع: {pack.price} MAD
                  </p>
                )}
              </div>

              <ul className="mt-8 flex-1 space-y-3">
                {pack.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check
                      size={18}
                      className={cn(
                        "shrink-0",
                        pack.popular ? "text-gold" : "text-navy"
                      )}
                    />
                    <span className="text-sm text-navy">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={`https://wa.me/212679653509?text=${encodeURIComponent(pack.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "mt-8 block rounded-full py-4 text-center text-base font-bold transition-all duration-300",
                  pack.popular
                    ? "bg-gold text-white shadow-lg shadow-gold/25 hover:bg-gold-light hover:shadow-xl"
                    : "bg-navy text-white hover:bg-navy-light"
                )}
              >
                أطلب {pack.name}
              </a>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
