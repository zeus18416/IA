import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Compass, Search, FileCheck, GitCompareArrows, Handshake, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { processSteps } from "@/data/process";
import { cn } from "@/lib/utils";

const stepIcons = [Compass, Search, FileCheck, GitCompareArrows, Handshake] as const;

export const Route = createFileRoute("/how-it-works")({
  component: HowItWorksPage,
  head: () => ({
    meta: [{ title: "How It Works — STACKORA" }],
  }),
});

function HowItWorksPage() {
  const { t } = useTranslation();

  return (
    <div className="container-page section-y">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
        <ol className="flex items-center gap-1.5">
          <li>
            <Link to="/" className="hover:text-foreground transition-colors">
              {t("howItWorks.breadcrumbHome")}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-foreground">
            {t("howItWorks.breadcrumbHowItWorks")}
          </li>
        </ol>
      </nav>

      <div className="mb-16 max-w-2xl">
        <h1 className="text-h1 text-gradient">{t("howItWorks.title")}</h1>
        <p className="text-lead mt-2 text-muted-foreground">
          {t("howItWorks.lead")}
        </p>
      </div>

      <div className="space-y-20">
        {processSteps.map((step, i) => {
          const Icon = stepIcons[i];
          const isEven = i % 2 === 1;

          return (
            <section
              key={step.n}
              className={cn(
                "grid items-center gap-8 md:grid-cols-2 md:gap-12",
                isEven && "md:[&>*:first-child]:order-2"
              )}
            >
              <div>
                <p className="text-eyebrow mb-2">{step.n}</p>
                <h2 className="text-h2 mb-3">{t(`process.step${step.n}Title`)}</h2>
                <p className="text-lg font-medium text-foreground/90 mb-2">
                  {t(`process.step${step.n}Short`)}
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {t(`process.step${step.n}Detail`)}
                </p>
                <ul className="space-y-2">
                  {[1, 2, 3].map((pointIdx) => (
                    <li
                      key={pointIdx}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-foreground/30" />
                      {t(`process.step${step.n}Point${pointIdx}`)}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="surface-card flex items-center justify-center rounded-2xl p-10">
                <Icon className="size-20 text-foreground/10" strokeWidth={1} />
              </div>
            </section>
          );
        })}
      </div>

      {/* CTA */}
      <section className="mt-24 rounded-2xl surface-card p-10 text-center md:p-16">
        <h2 className="text-h2 text-gradient mb-3">{t("howItWorks.ctaTitle")}</h2>
        <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
          {t("howItWorks.ctaDescription")}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link to="/developers">
              {t("howItWorks.browseDevelopers")}
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/for-companies">{t("howItWorks.forCompanies")}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
