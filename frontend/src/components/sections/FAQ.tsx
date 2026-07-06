"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "كيفاش ندير الطلب؟",
    a: "إختار العرض المناسب ليك، عمّر المعلومات ديالك (الإسم، الهاتف، المدينة، العنوان)، و كليكي على 'أكّد طلبي'. غادي نتواصلو معاك عبر واتساب لتأكيد الطلب.",
  },
  {
    q: "واش الدفع عند الإستلام؟",
    a: "نعم! الدفع عند الإستلام هو الطريقة الوحيدة ديال الدفع — ما كنطلبوش أي دفع مسبق. خلّص غير ملي توصلك السلعة ليدك.",
  },
  {
    q: "شحال كيدوز وقت التوصيل؟",
    a: "التوصيل كياخد من 2 إلى 5 أيام حسب المدينة. فالمدن الكبار (كازا، الرباط، مراكش) عادةً 2-3 أيام.",
  },
  {
    q: "واش كتوصلو لجميع المدن؟",
    a: "نعم! كنوصلو لجميع المدن المغربية بلا إستثناء.",
  },
  {
    q: "واش عندكم ضمان؟",
    a: "نعم! ضمان سنة كاملة ضد أي عيب في الصنع. إلا كان أي مشكل تواصل معانا و غادي نحلوه ليك.",
  },
  {
    q: "Neo Transat شحال كتحمل ديال الوزن؟",
    a: "كتحمل حتال 120 كيلو — مناسبة للكبار و الصغار.",
  },
  {
    q: "واش نقدر نرجع المنتج؟",
    a: "إلا وصلك المنتج و كان فيه عيب، تواصل معانا في 48 ساعة و غادي نبدلوه ليك.",
  },
];

function Item({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.04 }}
      className="border-b border-border/60 last:border-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 text-start"
      >
        <span className="text-base font-semibold text-navy">{q}</span>
        <ChevronDown
          size={18}
          className={cn(
            "shrink-0 text-navy/40 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.p
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden pb-4 text-base leading-relaxed text-muted-foreground"
          >
            {a}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  return (
    <section className="bg-gradient-to-b from-[#f5f5f5] to-white py-14 md:py-20">
      <Container>
        <h2 className="text-center text-2xl font-bold text-navy md:text-3xl">
          أسئلة شائعة
        </h2>

        <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-border/60 bg-white px-6">
          {faqs.map((faq, i) => (
            <Item key={faq.q} q={faq.q} a={faq.a} i={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
