export function scrollToOrderForm(behavior: ScrollBehavior = "smooth") {
  const target = document.getElementById("order");
  if (!target) return;

  const stickyHeader = document.querySelector("[data-sticky-header]");
  const offset =
    stickyHeader instanceof HTMLElement ? stickyHeader.offsetHeight + 8 : 128;
  const top = target.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({
    top: Math.max(0, top),
    behavior,
  });
}