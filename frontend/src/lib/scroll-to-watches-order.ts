function getStickyHeaderOffset() {
  const stickyHeader = document.querySelector("[data-sticky-header]");
  return stickyHeader instanceof HTMLElement ? stickyHeader.offsetHeight + 8 : 128;
}

export function scrollToWatchesOrder(behavior: ScrollBehavior = "smooth") {
  const target = document.getElementById("watches-order-flow");
  if (!target) return;

  const top = target.getBoundingClientRect().top + window.scrollY - getStickyHeaderOffset();
  window.scrollTo({
    top: Math.max(0, top),
    behavior,
  });
}

export function scrollToWatchesCart(behavior: ScrollBehavior = "smooth") {
  const target = document.getElementById("watches-cart");
  if (!target) {
    scrollToWatchesOrder(behavior);
    return;
  }

  const top = target.getBoundingClientRect().top + window.scrollY - getStickyHeaderOffset();
  window.scrollTo({
    top: Math.max(0, top),
    behavior,
  });
}

export function scrollToWatchesCheckout(behavior: ScrollBehavior = "smooth") {
  const target = document.getElementById("watches-checkout");
  if (!target) return;

  const top = target.getBoundingClientRect().top + window.scrollY - getStickyHeaderOffset();
  window.scrollTo({
    top: Math.max(0, top),
    behavior,
  });
}
