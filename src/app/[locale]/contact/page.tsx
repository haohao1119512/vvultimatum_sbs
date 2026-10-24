import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LegalPage } from "@/components/legal-page";
import { JsonLd } from "@/components/site";
import { routing } from "@/i18n/routing";

// Site URL comes from NEXT_PUBLIC_SITE_URL (same as layout/sitemap); contact email is always contact@<domain without www>.
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://vvultimatum.sbs").replace(/\/+$/, "");
const domain = new URL(siteUrl).hostname.replace(/^www\./, "");
const email = `contact@${domain}`;
const pathname = "/contact";
const localePath = (locale: string) => (locale === routing.defaultLocale ? pathname : `/${locale}${pathname}`);

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactPage" });
  const siteName = (await getTranslations({ locale, namespace: "footer" }))("aboutTitle");
  const title = t("metaTitle", { siteName });
  const description = t("metaDescription", { siteName });
  return {
    title,
    description,
    alternates: { canonical: localePath(locale), languages: { ...Object.fromEntries(routing.locales.map((l) => [l, localePath(l)])), "x-default": pathname } },
    openGraph: { title, description, url: `${siteUrl}${localePath(locale)}` },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactPage" });
  const siteName = (await getTranslations({ locale, namespace: "footer" }))("aboutTitle");
  const title = t("title", { siteName });
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: title,
    url: `${siteUrl}${localePath(locale)}`,
    inLanguage: locale,
    mainEntity: { "@type": "Organization", name: siteName, url: siteUrl, email, contactPoint: { "@type": "ContactPoint", contactType: "customer support", email } },
  };
  return (
    <LegalPage title={title}>
      <JsonLd data={jsonLd} />
      <p>{t("intro")}</p>
      <p>{t("emailLead")} <a className="font-semibold text-[hsl(var(--nav-theme))] hover:underline" href={`mailto:${email}`}>{email}</a>. {t("reply")}</p>
      <p>{t("disclaimer", { siteName })}</p>
    </LegalPage>
  );
}
