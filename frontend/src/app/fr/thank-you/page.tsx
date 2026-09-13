import { ThankYouView } from "@/components/thank-you/ThankYouView";
import { THANK_YOU_COPY } from "@/components/thank-you/copy";
import { getPublicThankYouOrder } from "@/components/thank-you/get-public-order";
import { isWatchesPublicOrder } from "@/lib/watches-orders";

interface FrenchThankYouPageProps {
  searchParams: Promise<{ order?: string }>;
}

export default async function FrenchThankYouPage({
  searchParams,
}: FrenchThankYouPageProps) {
  const params = await searchParams;
  const order = await getPublicThankYouOrder(params.order);
  const isWatchesOrder = isWatchesPublicOrder(order);
  const homeHref = "/fr/products/montres-femmes";

  return (
    <ThankYouView
      order={order}
      homeHref={homeHref}
      isWatchesOrder={isWatchesOrder}
      copy={THANK_YOU_COPY.fr}
    />
  );
}
