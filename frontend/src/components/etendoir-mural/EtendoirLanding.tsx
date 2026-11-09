"use client";

import { useEffect, useState } from "react";
import { ArrowUp, ShoppingCart, Star, Truck } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Container } from "@/components/shared/Container";
import { ApiError } from "@/lib/api";
import {
  buildEtendoirOrderPayload,
  createEtendoirOrder,
  getEtendoirThankYouHref,
  isEtendoirOrderServiceAvailable,
} from "@/lib/etendoir-orders";
import { trackMetaAddToCart } from "@/lib/meta-pixel";
import {
  buildEtendoirPurchaseEvent,
  trackMetaPurchase,
} from "@/lib/meta-pixel-purchase";
import {
  isValidMoroccanPhone,
  normalizeMoroccanPhone,
} from "@/lib/phone";
import { cn } from "@/lib/utils";
import {
  ETENDOIR_CITIES,
  ETENDOIR_GALLERY,
  ETENDOIR_OFFERS,
  ETENDOIR_PRODUCT,
  type EtendoirQuantity,
} from "./config";
import { ETENDOIR_COPY, type EtendoirLang } from "./copy";
import { CompareSlider } from "./CompareSlider";
import { ProductGallery } from "./ProductGallery";

type FormValues = { name: string; phone: string; city: string };
type FormErrors = Partial<Record<keyof FormValues, string>>;

function scrollToTop() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
}

function scrollToId(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  const header = document.querySelector("[data-sticky-header]");
  const offset = header instanceof HTMLElement ? header.offsetHeight + 12 : 72;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const top = target.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
}

export function EtendoirLanding() {
  const router = useRouter();
  const [lang, setLangState] = useState<EtendoirLang>("fr");
  const [askLang, setAskLang] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState<EtendoirQuantity>(1);
  const [form, setForm] = useState<FormValues>({ name: "", phone: "", city: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [ordersReady, setOrdersReady] = useState<boolean | null>(null);
  const copy = ETENDOIR_COPY[lang];
  const dir = lang === "ar" ? "rtl" : "ltr";
  const selectedOffer = ETENDOIR_OFFERS.find((offer) => offer.quantity === quantity) ?? ETENDOIR_OFFERS[0];

  const chooseLanguage = (next: EtendoirLang) => {
    setLangState(next);
    setAskLang(false);
    sessionStorage.setItem("etendoir-lang", next);
  };

  useEffect(() => {
    const saved = sessionStorage.getItem("etendoir-lang");
    if (saved === "fr" || saved === "ar") {
      setLangState(saved);
      return;
    }
    setAskLang(true);
  }, []);

  useEffect(() => {
    if (!askLang) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [askLang]);

  useEffect(() => {
    document.title = copy.metaTitle;
  }, [copy.metaTitle]);

  useEffect(() => {
    let cancelled = false;
    isEtendoirOrderServiceAvailable().then((ready) => {
      if (!cancelled) setOrdersReady(ready);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const ids = ["etendoir-gallery", "etendoir-order"];
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node instanceof HTMLElement);
    const seen = new Set<string>();
    const update = () => {
      const narrow = window.matchMedia("(max-width: 1023px)").matches;
      setStickyVisible(narrow && seen.size === 0 && window.scrollY > 420);
      setShowTop(window.scrollY > 480);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) seen.add(entry.target.id);
          else seen.delete(entry.target.id);
        }
        update();
      },
      { threshold: 0.2 }
    );
    nodes.forEach((node) => observer.observe(node));
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const goToOrder = () => {
    if (!added) {
      setAdded(true);
      trackMetaAddToCart({
        contentId: ETENDOIR_PRODUCT.slug,
        value: selectedOffer.total,
      });
    }
    scrollToId("etendoir-order");
  };

  const setField = (key: keyof FormValues, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors: FormErrors = {};
    if (form.name.trim().length < 2) nextErrors.name = copy.errors.name;
    if (!isValidMoroccanPhone(form.phone)) nextErrors.phone = copy.errors.phone;
    if (!form.city.trim()) nextErrors.city = copy.errors.city;
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    if (ordersReady !== true) {
      setOrdersReady(false);
      return;
    }
    setSubmitError("");
    setSubmitting(true);
    try {
      const payload = buildEtendoirOrderPayload(
        {
          name: form.name,
          phone: normalizeMoroccanPhone(form.phone),
          city: form.city,
        },
        quantity
      );
      const result = await createEtendoirOrder(payload);
      trackMetaPurchase(
        buildEtendoirPurchaseEvent(result.order_number, result.total_price, quantity)
      );
      router.push(getEtendoirThankYouHref(result.order_number, lang));
    } catch (err) {
      setSubmitting(false);
      if (err instanceof ApiError && (err.status === 0 || err.status >= 500)) {
        setOrdersReady(false);
        return;
      }
      setSubmitError(err instanceof ApiError ? err.message : copy.errors.generic);
    }
  };

  const recheckOrders = async () => {
    setOrdersReady(null);
    setOrdersReady(await isEtendoirOrderServiceAvailable());
  };

  const fieldClass = (invalid?: string) =>
    cn(
      "mt-1.5 h-12 w-full rounded-lg border bg-white px-3 text-base text-[#121212] outline-none transition focus:border-[#DA0037] focus:ring-2 focus:ring-[#DA0037]/15",
      invalid ? "border-red-400" : "border-[#E7E2DE]"
    );

  return (
    <div dir={dir} lang={lang} className="bg-white text-[#121212]">
      <header
        data-sticky-header
        className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm"
      >
        <Container className="h-[4.75rem]">
          <div className="relative flex h-full items-center justify-between" dir="ltr">
          <a
            href="#etendoir-order"
            aria-label={copy.showroom}
            onClick={(event) => {
              event.preventDefault();
              goToOrder();
            }}
            className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full text-[#121212] transition-colors hover:bg-[#DA0037]/10"
          >
            <ShoppingCart size={18} strokeWidth={1.75} />
          </a>
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <a
              href="#top"
              onClick={(event) => {
                event.preventDefault();
                scrollToTop();
              }}
              className="pointer-events-auto flex flex-col items-center leading-none"
              aria-label="SHAMANGARO"
            >
              <span className="text-xl font-extrabold tracking-wide text-[#121212] sm:text-2xl">
                SHAMANGARO
              </span>
              <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#121212]/45 sm:text-xs">
                Premium Brand
              </span>
            </a>
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
                onClick={() => chooseLanguage(code)}
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
        <p className="flex items-center justify-center gap-2 bg-[#121212] px-4 py-2 text-center text-[11px] font-semibold tracking-[0.08em] text-[#EEEDE9] sm:text-xs">
          <Truck className="h-3.5 w-3.5 shrink-0" aria-hidden />
          {copy.deliveryBand}
        </p>
      </header>

      <main>
        <section className="bg-white pb-8 pt-4 sm:pb-12 sm:pt-6">
          <Container>
          <div
            dir="ltr"
            className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:gap-10"
          >
            <div dir={dir} className="order-1">
              <div className="overflow-hidden rounded-[28px] bg-[#FAF8F7]">
                <ProductGallery lang={lang} />
              </div>
              <h1 className="mx-auto mt-4 flex w-fit max-w-full flex-wrap items-end justify-center gap-x-3 gap-y-3 px-1 text-center sm:gap-x-4">
                <span className="relative pb-2 text-3xl font-semibold leading-none tracking-tight text-[#121212] sm:text-4xl lg:text-5xl">
                  {copy.title}
                  <span
                    className="pointer-events-none absolute bottom-0 start-0 h-[3px] w-[76%] bg-[#DA0037] [clip-path:polygon(0_0,100%_0,88%_100%,0_100%)] rtl:[clip-path:polygon(12%_0,100%_0,100%_100%,0_100%)] sm:h-1"
                    aria-hidden
                  />
                </span>
                <span className="relative mb-1 inline-flex">
                  <span
                    className="absolute -inset-x-2 -inset-y-1.5 -rotate-12 rounded-full bg-[#FDE8EE]"
                    aria-hidden
                  />
                  <span
                    className="absolute inset-0 translate-x-1 translate-y-1 -rotate-[10deg] rounded-2xl bg-[#121212]"
                    aria-hidden
                  />
                  <span className="relative -rotate-[10deg] rounded-2xl bg-[#DA0037] px-3 py-1.5 text-lg font-extrabold leading-none text-white sm:px-3.5 sm:py-2 sm:text-xl">
                    {copy.titleAccent}
                  </span>
                </span>
              </h1>
              <p className="mt-3 flex items-center justify-center gap-2 text-sm text-[#121212]">
                <span className="flex gap-0.5 text-[#DA0037]" aria-hidden>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-3.5 w-3.5 fill-[#DA0037]" />
                  ))}
                </span>
                <span className="font-bold">{copy.ratingScore}</span>
                <span className="text-[#5C5C5C]">{copy.ratingLabel}</span>
              </p>
            </div>
            <div dir={dir} className="order-2 lg:sticky lg:top-28 lg:self-start">
              <p className="text-sm font-bold leading-relaxed text-[#121212]">{copy.lead}</p>
              <ul className="mt-3 grid grid-cols-3 gap-2">
                {copy.specs.map((spec) => (
                  <li
                    key={spec.label}
                    className="rounded-xl border border-[#F0E4E7] bg-[#FAF8F7] px-2 py-3 text-center"
                  >
                    <p className="text-2xl font-extrabold leading-none text-[#DA0037]">{spec.value}</p>
                    <p className="mt-1.5 text-[11px] font-semibold leading-tight text-[#121212]">
                      {spec.label}
                    </p>
                  </li>
                ))}
              </ul>
              <div className="mt-5 text-center">
                <h3 className="relative inline-block pb-2 text-xl font-extrabold tracking-tight text-[#121212] sm:text-2xl">
                  {copy.spacesTitle}
                  <span
                    className="pointer-events-none absolute bottom-0 left-1/2 h-1 w-[78%] -translate-x-1/2 bg-[#DA0037] [clip-path:polygon(0_0,100%_0,90%_100%,8%_100%)]"
                    aria-hidden
                  />
                </h3>
                <ul className="mt-4 grid grid-cols-2 gap-2.5">
                  {copy.places.map((place) => (
                    <li
                      key={place}
                      className="rounded-2xl bg-[#E6E4E0] px-3 py-4 text-center text-base font-extrabold leading-tight text-[#121212] shadow-[3px_3px_0_#121212] sm:text-lg"
                    >
                      {place}
                    </li>
                  ))}
                </ul>
              </div>
              <form
                id="etendoir-order"
                onSubmit={handleSubmit}
                noValidate
                className="mt-4 scroll-mt-28 overflow-hidden rounded-2xl border-2 border-dashed border-[#121212] bg-white text-[#121212]"
              >
                <div className="flex items-center justify-between gap-3 border-b border-[#F3E6E9] px-4 py-3">
                  <h2 className="min-w-0 text-base font-bold leading-tight text-[#121212]">
                    {copy.title} {copy.titleAccent}
                  </h2>
                  <p className="shrink-0 text-lg font-extrabold text-[#DA0037]">
                    {selectedOffer.total}
                    <span className="ms-1 text-xs font-semibold text-[#121212]">{copy.priceUnit}</span>
                  </p>
                </div>

                <div className="space-y-4 p-4">
                  <div role="radiogroup" aria-label={copy.offerTitle} className="space-y-3">
                    <p className="text-sm font-semibold text-[#121212]">{copy.offerTitle}</p>
                    {ETENDOIR_OFFERS.map((offer) => {
                      const selected = offer.quantity === quantity;
                      const full = ETENDOIR_PRODUCT.unitPrice * offer.quantity;
                      const saved = full - offer.total;
                      return (
                        <button
                          key={offer.quantity}
                          type="button"
                          role="radio"
                          aria-checked={selected}
                          onClick={() => setQuantity(offer.quantity)}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-2xl border-2 px-4 py-3.5 text-start transition",
                            selected
                              ? "border-[#121212] bg-[#121212] text-white"
                              : "border-[#E4DFDA] bg-white text-[#121212] hover:border-[#121212]"
                          )}
                        >
                          <span
                            className={cn(
                              "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold",
                              selected ? "bg-white text-[#121212]" : "border border-[#E4DFDA] bg-[#FAF8F7] text-[#121212]"
                            )}
                          >
                            {offer.quantity}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-semibold">
                              {copy.offers[offer.quantity]}
                            </span>
                            {saved > 0 ? (
                              <span
                                className={cn(
                                  "mt-0.5 block text-xs font-bold",
                                  selected ? "text-[#FFD0DC]" : "text-[#DA0037]"
                                )}
                              >
                                {copy.save} {saved} {copy.priceUnit}
                              </span>
                            ) : null}
                          </span>
                          <span className="shrink-0 text-end">
                            {saved > 0 ? (
                              <span
                                className={cn(
                                  "block text-xs line-through",
                                  selected ? "text-white/55" : "text-[#6B6B6B]"
                                )}
                              >
                                {full} {copy.priceUnit}
                              </span>
                            ) : null}
                            <span className="block text-base font-extrabold">
                              {offer.total} {copy.priceUnit}
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <label className="block text-sm font-semibold text-[#121212]">
                    {copy.name}
                    <input
                      value={form.name}
                      onChange={(event) => setField("name", event.target.value)}
                      placeholder={copy.namePlaceholder}
                      autoComplete="name"
                      className={fieldClass(errors.name)}
                    />
                  </label>
                  {errors.name ? <p className="-mt-2 text-xs text-red-600">{errors.name}</p> : null}
                  <label className="block text-sm font-semibold text-[#121212]">
                    {copy.phone}
                    <input
                      value={form.phone}
                      onChange={(event) => setField("phone", event.target.value)}
                      placeholder={copy.phonePlaceholder}
                      inputMode="tel"
                      autoComplete="tel"
                      dir="ltr"
                      className={cn(fieldClass(errors.phone), "text-start")}
                    />
                  </label>
                  {errors.phone ? <p className="-mt-2 text-xs text-red-600">{errors.phone}</p> : null}
                  <label className="block text-sm font-semibold text-[#121212]">
                    {copy.city}
                    <select
                      value={form.city}
                      onChange={(event) => setField("city", event.target.value)}
                      className={fieldClass(errors.city)}
                    >
                      <option value="">{copy.cityPlaceholder}</option>
                      {ETENDOIR_CITIES.map((city) => (
                        <option key={city.value} value={city.value}>
                          {city[lang]}
                        </option>
                      ))}
                    </select>
                  </label>
                  {errors.city ? <p className="-mt-2 text-xs text-red-600">{errors.city}</p> : null}

                  <div className="flex items-center justify-between gap-3 rounded-2xl bg-[#E6E4E0] px-4 py-3.5 text-[#121212] shadow-[4px_4px_0_#DA0037]">
                    <p className="text-sm font-bold">{copy.offers[quantity]}</p>
                    <p className="shrink-0 text-xl font-extrabold">
                      {selectedOffer.total}
                      <span className="ms-1 text-xs font-semibold text-[#121212]/55">{copy.priceUnit}</span>
                    </p>
                  </div>
                  {ordersReady === false ? (
                    <div role="alert" className="rounded-lg border border-[#DA0037]/25 bg-[#FDE8EE] px-3 py-3 text-start">
                      <p className="text-sm leading-relaxed text-[#121212]">{copy.errors.unavailable}</p>
                      <button
                        type="button"
                        onClick={recheckOrders}
                        className="mt-2 text-sm font-bold text-[#DA0037] underline decoration-[#DA0037]/40 underline-offset-4"
                      >
                        {copy.errors.retry}
                      </button>
                    </div>
                  ) : null}
                  {submitError ? (
                    <p role="alert" className="rounded-lg border border-[#DA0037]/25 bg-[#FDE8EE] px-3 py-3 text-sm leading-relaxed text-[#121212]">
                      {submitError}
                    </p>
                  ) : null}
                  <button
                    type="submit"
                    disabled={submitting || ordersReady !== true}
                    className="w-full rounded-lg bg-[#DA0037] py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#C20032] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {submitting ? copy.submitting : copy.submit.replace("349", String(selectedOffer.total))}
                  </button>
                  <p className="text-center text-xs leading-relaxed text-[#6B6B6B]">{copy.addressNote}</p>
                  <p className="flex items-center justify-center gap-1.5 text-center text-xs font-semibold text-[#121212]">
                    <Truck className="h-3.5 w-3.5 shrink-0" aria-hidden />
                    {copy.delivery}
                  </p>
                </div>
              </form>
            </div>
          </div>
          </Container>
        </section>

        <section className="bg-[#121212] py-10 text-white sm:py-14">
          <Container>
            <div className="mb-6 text-center">
            <p className="mx-auto h-0.5 w-8 bg-[#DA0037]" aria-hidden />
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{copy.compareTitle}</h2>
            <p className="mt-2 text-sm leading-relaxed text-white/70">{copy.compareLead}</p>
            </div>
            <div className="mt-8">
              <CompareSlider lang={lang} />
            </div>
            <p className="mt-3 text-center text-xs font-medium text-white/55">{copy.compareHint}</p>
          </Container>
        </section>

        <section className="py-8 sm:py-12">
          <Container>
            <div className="mb-4 text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-[#121212] sm:text-4xl">{copy.benefitsTitle}</h2>
            </div>
            <ol className="grid gap-4 sm:grid-cols-3">
              {copy.benefits.map((benefit, index) => (
                <li
                  key={benefit.title}
                  className="flex gap-3 p-1"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FDE8EE] text-sm font-bold text-[#DA0037]">
                    0{index + 1}
                  </div>
                  <div className="min-w-0 text-start">
                    <h3 className="font-bold text-[#121212]">{benefit.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#5C5C5C]">{benefit.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        <DeliveryStrip band={copy.deliveryBand} detail={copy.deliveryDetail} />

        <section className="bg-[radial-gradient(ellipse_at_top,_#fff1f4_0%,_#ffffff_70%)] py-10 sm:py-14">
          <Container>
            <div className="mb-8 text-center">
              <h2 className="relative inline-block pb-2 text-3xl font-extrabold tracking-tight text-[#121212] sm:text-4xl">
                {copy.howTitle}
                <span
                  className="absolute bottom-0 start-0 h-[3px] w-[72%] bg-[#DA0037] [clip-path:polygon(0_0,100%_0,86%_100%,0_100%)] rtl:[clip-path:polygon(14%_0,100%_0,100%_100%,0_100%)]"
                  aria-hidden
                />
              </h2>
            </div>
            <ol className="mx-auto flex max-w-4xl flex-col gap-6 sm:gap-10">
              {copy.steps.map((step, index) => {
                const image = ETENDOIR_GALLERY.find((item) => item.id === step.image)!;
                const featured = step.image === "hang";
                return (
                  <li key={step.image} className="relative">
                    <span className="absolute -top-3 start-3 z-10 -rotate-6 rounded-xl bg-[#DA0037] px-2.5 py-1 text-sm font-extrabold leading-none text-white shadow-[3px_3px_0_#121212]">
                      {index + 1}
                    </span>
                    <div className="overflow-hidden rounded-2xl bg-[#FAF8F7]">
                      <div
                        className={cn(
                          "relative",
                          step.image === "open" ? "aspect-[5/2]" : featured ? "aspect-square" : "aspect-[4/3]"
                        )}
                      >
                        <Image
                          src={image.src}
                          alt={copy.alts[image.id]}
                          fill
                          sizes={featured ? "(min-width: 640px) 56rem, 100vw" : "(min-width: 640px) 48rem, 100vw"}
                          className={featured ? "object-contain p-1" : "object-contain p-3 sm:p-4"}
                        />
                      </div>
                      <p className="bg-white px-4 py-3.5 text-start text-base font-bold leading-relaxed text-[#121212] sm:px-5 sm:py-4 sm:text-lg">
                        {step.body}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </Container>
        </section>

        <DeliveryStrip band={copy.deliveryBand} detail={copy.deliveryDetail} />

        <section className="bg-[#FAF8F7] py-10 sm:py-14">
          <Container>
            <div className="mb-4 text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-[#121212] sm:text-4xl">{copy.faqTitle}</h2>
            </div>
            <div className="mx-auto max-w-2xl space-y-3">
              {copy.faqs.map((item) => (
                <details key={item.q} className="rounded-xl bg-white p-3 shadow-sm">
                  <summary className="cursor-pointer list-none font-bold text-[#121212] [&::-webkit-details-marker]:hidden">
                    {item.q}
                  </summary>
                  <p className="mt-2 border-t border-[#F3E6E9] pt-2 text-sm leading-relaxed text-[#5C5C5C]">{item.a}</p>
                </details>
              ))}
            </div>
          </Container>
        </section>

      </main>

      <footer className="bg-[#121212] pb-24 text-white lg:pb-0">
        <Container className="flex flex-col items-center gap-5 py-10 text-center">
          <p className="text-sm font-semibold tracking-[0.18em]">{copy.footerNote}</p>
          <nav aria-label={copy.footerPolicies} className="flex flex-col items-center gap-3">
            <p className="text-xs font-semibold tracking-wide text-[#EEEDE9]">{copy.footerPolicies}</p>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
              {copy.links.map((link) => (
                <a
                  key={link.href}
                  href={`${link.href}?lang=${lang}`}
                  className="text-white! no-underline transition-colors hover:text-[#DA0037]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>
          <p className="text-xs leading-relaxed text-[#EEEDE9]">{copy.copyright}</p>
        </Container>
      </footer>

      {askLang ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#121212]/55 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="etendoir-lang-title"
        >
          <div className="w-full max-w-xs rounded-3xl bg-white px-5 py-5 text-center shadow-[4px_4px_0_#DA0037]">
            <p id="etendoir-lang-title" className="text-lg font-extrabold text-[#121212]">
              Choisissez votre langue
            </p>
            <p className="mt-1 text-base font-bold text-[#121212]" dir="rtl">
              اختار اللغة
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              <button
                type="button"
                autoFocus
                onClick={() => chooseLanguage("fr")}
                className="rounded-xl bg-[#121212] px-2.5 py-3 text-sm font-extrabold text-white"
              >
                Français
              </button>
              <button
                type="button"
                dir="rtl"
                onClick={() => chooseLanguage("ar")}
                className="rounded-xl bg-[#DA0037] px-2.5 py-3 text-sm font-extrabold text-white"
              >
                الدارجة
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {showTop ? (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label={copy.scrollTop}
          className={cn(
            "fixed end-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-[#121212]/12 bg-[#E6E4E0]/95 text-[#121212] shadow-sm backdrop-blur-sm transition hover:bg-[#121212] hover:text-white",
            stickyVisible ? "bottom-24 lg:bottom-6" : "bottom-5 lg:bottom-6"
          )}
        >
          <ArrowUp className="h-5 w-5" strokeWidth={1.75} aria-hidden />
        </button>
      ) : null}

      {stickyVisible ? (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#F0E4E7] bg-white p-3 lg:hidden">
          <button
            type="button"
            onClick={goToOrder}
            className="w-full rounded-lg bg-[#DA0037] py-3 text-sm font-bold text-white shadow-md"
          >
            {copy.orderCta.replace("349", String(selectedOffer.total))}
          </button>
        </div>
      ) : null}
    </div>
  );
}

function DeliveryStrip({ band, detail }: { band: string; detail: string }) {
  return (
    <div className="relative overflow-hidden bg-[#DA0037] text-white" role="note" aria-label={band}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/35" aria-hidden />
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4 py-3 text-center sm:gap-x-5 sm:py-3.5">
        <span className="flex items-center gap-2 text-sm font-extrabold sm:text-base">
          <Truck className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" aria-hidden />
          {band}
        </span>
        <span className="hidden h-4 w-px bg-white/45 sm:block" aria-hidden />
        <span className="text-xs font-semibold text-white/95 sm:text-sm">{detail}</span>
      </div>
    </div>
  );
}
