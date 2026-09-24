import {
  DEFAULT_WATCH_VARIANT,
  WATCH_HERO_LCP_HEIGHT,
  WATCH_HERO_LCP_IMAGE,
  WATCH_HERO_LCP_WIDTH,
  type WatchVariantId,
} from "./config";

export function WatchesHeroPhoto({
  variantId,
  src,
  alt,
}: {
  variantId: WatchVariantId;
  src: string;
  alt: string;
}) {
  const isLcp = variantId === DEFAULT_WATCH_VARIANT;

  return (
    <img
      src={isLcp ? WATCH_HERO_LCP_IMAGE : src}
      alt={alt}
      width={WATCH_HERO_LCP_WIDTH}
      height={WATCH_HERO_LCP_HEIGHT}
      className="absolute inset-0 h-full w-full object-contain object-center p-1.5 sm:p-3"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "contain",
        objectPosition: "center",
      }}
      fetchPriority={isLcp ? "high" : "low"}
      decoding={isLcp ? "sync" : "async"}
      loading={isLcp ? "eager" : "lazy"}
    />
  );
}
