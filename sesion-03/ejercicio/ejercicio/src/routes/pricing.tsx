import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Check, Clock, CalendarRange, CalendarCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/pricing")({
  component: PricingPage,
  head: () => ({ meta: [{ title: "Pricing — STACKORA" }] }),
});

interface PricingTier {
  nameKey: string;
  icon: React.ElementType;
  descKey: string;
  priceKey: string;
  unitKey: string;
  featureKeys: string[];
  highlighted?: boolean;
}

const tiers: PricingTier[] = [
  {
    nameKey: "pricing.tierHourlyName",
    icon: Clock,
    descKey: "pricing.tierHourlyDescription",
    priceKey: "pricing.tierHourlyPrice",
    unitKey: "pricing.tierHourlyUnit",
    featureKeys: ["pricing.tierHourlyFeature1", "pricing.tierHourlyFeature2", "pricing.tierHourlyFeature3"],
  },
  {
    nameKey: "pricing.tierPartTimeName",
    icon: CalendarRange,
    descKey: "pricing.tierPartTimeDescription",
    priceKey: "pricing.tierPartTimePrice",
    unitKey: "pricing.tierPartTimeUnit",
    highlighted: true,
    featureKeys: [
      "pricing.tierPartTimeFeature1",
      "pricing.tierPartTimeFeature2",
      "pricing.tierPartTimeFeature3",
    ],
  },
  {
    nameKey: "pricing.tierFullTimeName",
    icon: CalendarCheck,
    descKey: "pricing.tierFullTimeDescription",
    priceKey: "pricing.tierFullTimePrice",
    unitKey: "pricing.tierFullTimeUnit",
    featureKeys: [
      "pricing.tierFullTimeFeature1",
      "pricing.tierFullTimeFeature2",
      "pricing.tierFullTimeFeature3",
      "pricing.tierFullTimeFeature4",
    ],
  },
];

const faqs = [
  { questionKey: "pricing.faqSwitchModelsQ", answerKey: "pricing.faqSwitchModelsA" },
  { questionKey: "pricing.faqTeamQ", answerKey: "pricing.faqTeamA" },
  { questionKey: "pricing.faqMinCommitmentQ", answerKey: "pricing.faqMinCommitmentA" },
  { questionKey: "pricing.faqBillingQ", answerKey: "pricing.faqBillingA" },
];

function PricingPage() {
  const { t } = useTranslation();

  return (
    <div className="container-page section-y">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
        <ol className="flex items-center gap-1.5">
          <li>
            <Link to="/" className="hover:text-foreground transition-colors">
              {t("pricing.breadcrumbHome")}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-foreground">
            {t("pricing.breadcrumbPricing")}
          </li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="mb-16 text-center">
        <h1 className="text-h1 text-gradient mb-4">{t("pricing.title")}</h1>
        <p className="text-lead max-w-2xl mx-auto">
          {t("pricing.lead")}
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="mb-8">
        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {tiers.map((tier) => (
            <div
              key={tier.nameKey}
              className={`surface-card rounded-2xl p-6 flex flex-col relative ${
                tier.highlighted
                  ? "ring-2 ring-violet-soft"
                  : ""
              }`}
            >
              {tier.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-violet-soft px-3 py-0.5 text-xs font-medium text-white">
                  {t("pricing.recommended")}
                </span>
              )}
              <div className="grid size-10 place-items-center rounded-xl bg-violet-soft/10 mb-4">
                <tier.icon className="size-5 text-violet-soft" />
              </div>
              <h3 className="text-h3">{t(tier.nameKey)}</h3>
              <p className="text-sm text-muted-foreground mb-4">{t(tier.descKey)}</p>
              <div className="mb-6">
                <span className="text-3xl font-bold tracking-tight">{t(tier.priceKey)}</span>
                <span className="text-muted-foreground text-sm">{t(tier.unitKey)}</span>
              </div>
              <ul className="space-y-2 mb-6 flex-1">
                {tier.featureKeys.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="size-4 text-emerald-500 shrink-0" />
                    {t(f)}
                  </li>
                ))}
              </ul>
              <Button
                asChild
                variant={tier.highlighted ? "default" : "outline"}
                className="w-full"
              >
                <Link to="/for-companies">{t("pricing.getStarted")}</Link>
              </Button>
            </div>
          ))}
        </div>
      </section>

      <p className="text-xs text-muted-foreground text-center mb-16 max-w-xl mx-auto">
        {t("pricing.priceDisclaimer")}
      </p>

      <Separator className="mb-16" />

      {/* FAQ */}
      <section className="mb-16 max-w-2xl mx-auto">
        <h2 className="text-h2 text-center mb-8">{t("pricing.faqTitle")}</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger>{t(faq.questionKey)}</AccordionTrigger>
              <AccordionContent>{t(faq.answerKey)}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Final CTA */}
      <section className="text-center">
        <h2 className="text-h2 mb-4">{t("pricing.ctaTitle")}</h2>
        <Button asChild size="lg">
          <Link to="/developers">
            {t("pricing.findYourDeveloper")}
            <ArrowRight className="size-4 ml-2" />
          </Link>
        </Button>
      </section>
    </div>
  );
}
