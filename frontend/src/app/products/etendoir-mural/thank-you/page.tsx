import type { Metadata } from "next";
import { EtendoirThankYou } from "@/components/etendoir-mural/EtendoirThankYou";
import { getPublicThankYouOrder } from "@/components/thank-you/get-public-order";
import { isEtendoirPublicOrder } from "@/lib/etendoir-orders";

interface EtendoirThankYouPageProps {
  searchParams: Promise<{ order?: string; lang?: string }>;
}

export async function generateMetadata({
  searchParams,
}: EtendoirThankYouPageProps): Promise<Metadata> {
  const params = await searchParams;
  const fetched = await getPublicThankYouOrder(params.order);
  const confirmed = isEtendoirPublicOrder(fetched);
  return {
    title: {
      absolute: confirmed
        ? "تسجّل الطلب | SHAMANGARO"
        : "الطلب ما تأكدش | SHAMANGARO",
    },
    robots: { index: false, follow: false },
  };
}

export default async function EtendoirThankYouPage({
  searchParams,
}: EtendoirThankYouPageProps) {
  const params = await searchParams;
  const fetched = await getPublicThankYouOrder(params.order);
  const order = isEtendoirPublicOrder(fetched) ? fetched : null;
  const lang = params.lang === "fr" ? "fr" : "ar";

  return <EtendoirThankYou order={order} initialLang={lang} />;
}
