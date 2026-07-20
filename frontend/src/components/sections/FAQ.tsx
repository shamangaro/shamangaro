"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { ChevronDown, CircleHelp } from "lucide-react";
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
    a: "كتحمل حتال 90 كيلو — مناسبة للاستخدام اليومي بثقة.",
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
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.3, delay: i * 0.04 }}
    >
      <div
        className={cn(
          "overflow-hidden rounded-2xl border-2 bg-white shadow-sm transition-all duration-300",
          open
            ? "border-navy shadow-md"
            : "border-navy/10 hover:border-navy/25 hover:shadow-md"
        )}
      >
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          className="flex min-h-11 w-full items-start gap-3 p-4 text-start sm:gap-4 sm:p-5"
        >
          <div
            className={cn(
              "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 sm:h-10 sm:w-10",
              open ? "bg-fabric/15 text-fabric" : "bg-navy/5 text-navy"
            )}
          >
            <CircleHelp size={18} strokeWidth={1.75} />
          </div>

          <div className="min-w-0 flex-1">
            <span className="block text-base font-extrabold leading-snug text-navy sm:text-lg">
              {q}
            </span>
          </div>

          <div
            className={cn(
              "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
              open
                ? "border-navy bg-navy text-white"
                : "border-navy/15 bg-[#fafafa] text-navy/50"
            )}
          >
            <ChevronDown
              size={16}
              className={cn(
                "transition-transform duration-300",
                open && "rotate-180"
              )}
            />
          </div>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="border-t border-navy/10 px-4 pb-4 pt-3 sm:px-5 sm:pb-5 sm:pt-4">
                <p className="text-sm font-medium leading-relaxed text-navy/75 sm:text-[15px]">
                  {a}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export function FAQ() {
  return (
    <section className="bg-gradient-to-b from-[#f5f5f5] to-white py-14 md:py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-2xl font-extrabold leading-snug text-navy md:text-3xl lg:text-4xl">
            أسئلة <span className="text-fabric">شائعة</span>
          </h2>
          <div className="mx-auto mt-4 h-0.5 w-14 rounded-full bg-fabric" />
          <p className="mt-4 text-base font-medium leading-relaxed text-navy/70">
            كل ما خصك تعرف قبل ما تطلب Neo Transat
          </p>
        </motion.div>

        <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-3 sm:mt-12 sm:gap-4">
          {faqs.map((faq, i) => (
            <Item key={faq.q} q={faq.q} a={faq.a} i={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
