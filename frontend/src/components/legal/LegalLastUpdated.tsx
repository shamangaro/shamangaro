export function LegalLastUpdated({
  lang = "ar",
}: {
  lang?: "ar" | "fr" | "ar-watches";
}) {
  if (lang === "fr") {
    return (
      <p className="text-center text-sm leading-relaxed text-muted-foreground">
        Dernière mise à jour : septembre 2026 — SHAMANGARO Montres Femmes ·{" "}
        <span className="text-[#134A35]/80">Maroc</span>
      </p>
    );
  }

  if (lang === "ar-watches") {
    return (
      <p className="text-center text-sm leading-relaxed text-muted-foreground">
        آخر تحديث: سبتمبر 2026 — SHAMANGARO Montres Femmes ·{" "}
        <span className="text-[#134A35]/80">المغرب</span>
      </p>
    );
  }

  return (
    <p className="text-center text-sm leading-relaxed text-muted-foreground">
      آخر تحديث: سبتمبر 2026 — SHAMANGARO ·{" "}
      <span className="text-navy/70">المغرب</span>
    </p>
  );
}
