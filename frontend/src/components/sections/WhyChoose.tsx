"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { Truck, Shield, Gem, Timer, BadgeCheck, Wallet } from "lucide-react";

const trustItems = [
  {
    icon: Wallet,
    title: "الدفع عند الإستلام",
    description: "خلّص غير ملي توصلك — بلا كارطة بنكية، بلا ريسك",
    color: "bg-navy/5 text-navy",
  },
  {
    icon: Truck,
    title: "توصيل لجميع المدن",
    description: "نوصلوها ليك فين ما كنتي فالمغرب — كازا، الرباط، مراكش، طنجة...",
    color: "bg-navy/5 text-navy",
  },
  {
    icon: Shield,
    title: "ضمان سنة كاملة",
    description: "منتج متين مع ضمان على أي عيب في الصنع — راحة بالك مضمونة",
    color: "bg-navy/5 text-navy",
  },
  {
    icon: Gem,
    title: "مواد عالية الجودة",
    description: "خشب طبيعي صلب و قماش Oxford متين — مصنوع باش يدوم",
    color: "bg-navy/5 text-navy",
  },
  {
    icon: Timer,
    title: "تركيب في 30 ثانية",
    description: "بلا أدوات، بلا تعقيد — تحلها و تسترخي في أقل من دقيقة",
    color: "bg-navy/5 text-navy",
  },
  {
    icon: BadgeCheck,
    title: "علامة SHAMANGARO",
    description: "علامة مغربية premium — مصممة بحب للي كيقدرو الجودة",
    color: "bg-navy/5 text-navy",
  },
];

export function WhyChoose() {
  return (
    <section className="bg-cream py-16 md:py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-navy md:text-4xl">
            علاش <span className="text-gold">Neo Transat</span>؟
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            أكثر من كرسي — تجربة إسترخاء مختلفة تماماً
          </p>
        </motion.div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {trustItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="group rounded-2xl border border-border/50 bg-white p-6 shadow-sm transition-all duration-300 hover:border-gold/30 hover:shadow-lg md:p-8"
            >
              <div
                className={`inline-flex rounded-xl p-3 ${item.color} transition-transform duration-300 group-hover:scale-110`}
              >
                <item.icon size={24} />
              </div>
              <h3 className="mt-5 text-lg font-bold text-navy">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
