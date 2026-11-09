"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/shared/Container";
import type { OrderPublic } from "@/lib/orders";
import { cn } from "@/lib/utils";
import { ETENDOIR_PRODUCT } from "./config";
import type { EtendoirLang } from "./copy";

const THANKS = {
  ar: {
    metaTitle: "تسجّل الطلب | SHAMANGARO",
    missingMeta: "الطلب ما تأكدش | SHAMANGARO",
    languageLabel: "اللغة",
    eyebrow: "SHAMANGARO",
    title: "تسجّل الطلب",
    subtitle: "شكراً. غادي نعيطو ليك باش نأكدو العنوان، ومن بعد يتسيفط المجفف.",
    missingTitle: "هاد الطلب ما تأكدش",
    missingBody:
      "ما لقينا حتى طلب مسجّل بهاد الرقم. هاد الصفحة ماشي تأكيد، وما تسجّل حتى طلب جديد.",
    photoAlt: "مجفف ملابس جداري مفتوح على الحيط، والملابس معلقة فالمناشير",
    orderNumber: "رقم الطلب",
    product: "المنتج",
    productName: "مجفف ملابس جداري",
    quantity: "العدد",
    offers: { 1: "مجفف واحد", 2: "جوج مجففات", 3: "3 مجففات" },
    total: "المجموع",
    currency: "درهم",
    delivery: "التوصيل",
    deliveryValue: "مجاني لجميع مدن المغرب · 2 إلى 5 أيام عمل",
    payment: "الدفع",
    paymentValue: "عند الاستلام. ما كاينش خلاص مسبق.",
    name: "الاسم",
    phone: "الهاتف",
    back: "رجع لصفحة المجفف",
  },
  fr: {
    metaTitle: "Commande enregistrée | SHAMANGARO",
    missingMeta: "Commande non confirmée | SHAMANGARO",
    languageLabel: "Langue",
    eyebrow: "SHAMANGARO",
    title: "Commande enregistrée",
    subtitle:
      "Merci. Nous vous appelons pour confirmer l’adresse, puis l’étendoir est expédié.",
    missingTitle: "Cette commande n’est pas confirmée",
    missingBody:
      "Aucune commande enregistrée ne correspond à ce numéro. Cette page n’est pas une confirmation, et aucune nouvelle commande n’a été créée.",
    photoAlt:
      "Étendoir mural ouvert sur le mur, avec des vêtements suspendus aux crochets",
    orderNumber: "Numéro de commande",
    product: "Produit",
    productName: "Étendoir mural pliant",
    quantity: "Quantité",
    offers: { 1: "1 étendoir", 2: "2 étendoirs", 3: "3 étendoirs" },
    total: "Total",
    currency: "DH",
    delivery: "Livraison",
    deliveryValue: "Gratuite dans tout le Maroc · 2 à 5 jours ouvrables",
    payment: "Paiement",
    paymentValue: "À la livraison. Aucun paiement n’est demandé à l’avance.",
    name: "Nom",
    phone: "Téléphone",
    back: "Retour à l’étendoir",
  },
} as const;

function formatPrice(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(2);
}

function quantityLabel(quantity: number, offers: Record<1 | 2 | 3, string>): string {
  if (quantity === 1 || quantity === 2 || quantity === 3) return offers[quantity];
  return `× ${quantity}`;
}

export function EtendoirThankYou({
  order,
  initialLang,
}: {
  order: OrderPublic | null;
  initialLang: EtendoirLang;
}) {
  const [lang, setLang] = useState<EtendoirLang>(initialLang);
  const copy = THANKS[lang];
  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.title = order ? copy.metaTitle : copy.missingMeta;
  }, [copy.metaTitle, copy.missingMeta, order]);

  return (
    <div
      dir={dir}
      lang={lang}
      className="min-h-screen bg-[radial-gradient(ellipse_at_top,_#fff1f4_0%,_#ffffff_58%)] text-[#121212]"
    >
      <header className="border-b border-[#F0E4E7] bg-white/95">
        <Container className="h-16">
          <div className="relative flex h-full items-center justify-between" dir="ltr">
            <span className="w-14 shrink-0" aria-hidden />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <Link
                href={ETENDOIR_PRODUCT.sourcePage}
                className="pointer-events-auto flex flex-col items-center leading-none"
                aria-label="SHAMANGARO"
              >
                <span className="text-base font-extrabold tracking-wide text-[#121212] sm:text-lg">
                  SHAMANGARO
                </span>
                <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#121212]/45 sm:text-[10px]">
                  Premium Brand
                </span>
              </Link>
            </div>
            <div
              role="group"
              aria-label={copy.languageLabel}
              className="relative z-10 flex items-center gap-2 text-[11px] font-medium leading-none"
            >
              {(["fr", "ar"] as const).map((code) => (
                <button
                  key={code}
                  type="button"
                  aria-pressed={lang === code}
                  onClick={() => setLang(code)}
                  className={cn(
                    "py-1",
                    lang === code
                      ? "text-[#121212] underline decoration-[#DA0037] decoration-2 underline-offset-[5px]"
                      : "text-[#121212]/35"
                  )}
                >
                  {code === "fr" ? "FR" : "دارجة"}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </header>

      <main className="py-8 sm:py-14">
        <Container>
          <article className="mx-auto max-w-xl rounded-2xl border-2 border-dashed border-[#121212] bg-white p-5 sm:p-8">
            {order ? (
              <>
                <div className="flex items-start gap-4">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#EEEDE9] sm:h-24 sm:w-24">
                    <Image
                      src="/images/etendoir-mural/hero-angle.jpg"
                      alt={copy.photoAlt}
                      fill
                      sizes="96px"
                      className="object-cover object-center"
                      priority
                    />
                  </div>
                  <div className="min-w-0 text-start">
                    <p className="text-[11px] font-bold tracking-[0.16em] text-[#DA0037]">
                      {copy.eyebrow}
                    </p>
                    <h1 className="mt-1 text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
                      {copy.title}
                    </h1>
                    <p className="mt-2 text-sm leading-relaxed text-[#5C5C5C]">{copy.subtitle}</p>
                  </div>
                </div>

                <p className="mt-6 text-xs font-semibold text-[#6B6B6B]">{copy.orderNumber}</p>
                <p className="mt-1 break-all text-xl font-black tracking-wide text-[#121212]" dir="ltr">
                  {order.order_number}
                </p>

                <dl className="mt-6 divide-y divide-[#F3E6E9] border-y border-[#F3E6E9]">
                  <SummaryRow label={copy.product} value={copy.productName} />
                  <SummaryRow
                    label={copy.quantity}
                    value={quantityLabel(order.quantity, copy.offers)}
                  />
                  <SummaryRow
                    label={copy.total}
                    value={`${formatPrice(order.total_price)} ${copy.currency}`}
                    emphasize
                  />
                  <SummaryRow label={copy.delivery} value={copy.deliveryValue} />
                  <SummaryRow label={copy.payment} value={copy.paymentValue} />
                  <SummaryRow label={copy.name} value={order.customer_name} />
                  <SummaryRow label={copy.phone} value={order.phone} ltr />
                </dl>
              </>
            ) : (
              <div className="text-start">
                <p className="text-[11px] font-bold tracking-[0.16em] text-[#DA0037]">
                  {copy.eyebrow}
                </p>
                <h1 className="mt-2 text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
                  {copy.missingTitle}
                </h1>
                <p className="mt-3 text-sm leading-relaxed text-[#5C5C5C]">{copy.missingBody}</p>
              </div>
            )}

            <Link
              href={ETENDOIR_PRODUCT.sourcePage}
              className="mt-6 flex min-h-12 w-full items-center justify-center rounded-lg bg-[#DA0037] py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#C20032]"
            >
              {copy.back}
            </Link>
          </article>
        </Container>
      </main>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  emphasize = false,
  ltr = false,
}: {
  label: string;
  value: string;
  emphasize?: boolean;
  ltr?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <dt className="shrink-0 text-sm text-[#6B6B6B]">{label}</dt>
      <dd
        className={cn(
          "text-end text-sm font-bold text-[#121212]",
          emphasize && "text-base text-[#DA0037]"
        )}
        dir={ltr ? "ltr" : undefined}
      >
        {value}
      </dd>
    </div>
  );
}
