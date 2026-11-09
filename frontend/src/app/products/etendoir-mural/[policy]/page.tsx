import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EtendoirPolicyView } from "@/components/etendoir-mural/EtendoirPolicyView";
import type { EtendoirLang } from "@/components/etendoir-mural/copy";
import {
  ETENDOIR_POLICIES,
  ETENDOIR_POLICY_COPY,
  isEtendoirPolicy,
  type EtendoirPolicySlug,
} from "@/components/etendoir-mural/policies";

type Props = {
  params: Promise<{ policy: string }>;
  searchParams: Promise<{ lang?: string }>;
};

function resolveLang(value?: string): EtendoirLang {
  return value === "fr" ? "fr" : "ar";
}

export function generateStaticParams() {
  return ETENDOIR_POLICIES.map((policy) => ({ policy }));
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { policy } = await params;
  if (!isEtendoirPolicy(policy)) return {};
  const { lang: raw } = await searchParams;
  const lang = resolveLang(raw);
  const page = ETENDOIR_POLICY_COPY[lang].pages[policy];
  return {
    title: { absolute: `${page.title} — مجفف ملابس جداري | SHAMANGARO` },
    description: page.description,
    alternates: { canonical: `/products/etendoir-mural/${policy}` },
  };
}

export default async function EtendoirPolicyRoute({ params, searchParams }: Props) {
  const { policy } = await params;
  if (!isEtendoirPolicy(policy)) notFound();
  const { lang } = await searchParams;
  return <EtendoirPolicyView lang={resolveLang(lang)} slug={policy as EtendoirPolicySlug} />;
}
