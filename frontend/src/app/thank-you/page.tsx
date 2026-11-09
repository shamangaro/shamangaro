import { ThankYouView } from "@/components/thank-you/ThankYouView";
import { THANK_YOU_COPY } from "@/components/thank-you/copy";
import { getPublicThankYouOrder } from "@/components/thank-you/get-public-order";
import { getEtendoirThankYouHomeHref, isEtendoirPublicOrder } from "@/lib/etendoir-orders";
import { getWatchesThankYouHomeHref, isWatchesPublicOrder } from "@/lib/watches-orders";

interface ThankYouPageProps {
  searchParams: Promise<{ order?: string }>;
}

export default async function ThankYouPage({ searchParams }: ThankYouPageProps) {
  const params = await searchParams;
  const order = await getPublicThankYouOrder(params.order);
  const isWatchesOrder = isWatchesPublicOrder(order);
  const homeHref = isEtendoirPublicOrder(order)
    ? getEtendoirThankYouHomeHref()
    : getWatchesThankYouHomeHref(order);

  return (
    <ThankYouView
      order={order}
      homeHref={homeHref}
      isWatchesOrder={isWatchesOrder}
      copy={THANK_YOU_COPY.darija}
    />
  );
}
