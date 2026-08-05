/**
 * Mobile viewport verification for Montres Femmes landing page.
 * Run: node scripts/watches-mobile-verify.mjs
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "watches-mobile-screenshots");
const BASE = process.env.WATCHES_VERIFY_BASE ?? "http://localhost:3000";
const PAGE = "/products/montres-femmes";
const WIDTHS = [320, 360, 390];

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ locale: "ar-MA" });

  for (const width of WIDTHS) {
    const page = await context.newPage();
    await page.setViewportSize({ width, height: 900 });
    await page.goto(`${BASE}${PAGE}`, { waitUntil: "networkidle", timeout: 60000 });

    const overflow = await page.evaluate(() => {
      const doc = document.documentElement;
      return doc.scrollWidth > doc.clientWidth + 1;
    });

    await page.screenshot({
      path: path.join(OUT_DIR, `montres-femmes-${width}px.png`),
      fullPage: true,
    });

    console.log(
      JSON.stringify({
        width,
        overflow,
        modelSection: await page
          .getByRole("heading", { name: "اختاري الساعة اللي عجباتك" })
          .isVisible(),
        quantitySection: await page
          .getByRole("heading", { name: "اختاري العدد" })
          .isVisible(),
        summarySection: await page
          .getByRole("heading", { name: "ملخص الطلب" })
          .isVisible()
          .catch(() => false),
        customerSection: await page
          .getByRole("heading", { name: "عمري معلوماتك" })
          .isVisible(),
      })
    );

    await page.close();
  }

  await browser.close();
  console.log(`Screenshots: ${OUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
