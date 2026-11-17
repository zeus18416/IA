import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ArrowRight, ChevronRight } from "lucide-react";

import { specialtyBySlug } from "@/data/specialties";
import { developersBySpecialty } from "@/data/developers";

import { TechBadge } from "@/components/marketplace/bits";
import { DeveloperCard } from "@/components/marketplace/DeveloperCard";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/specialties/$slug")({
  loader: ({ params }) => {
    const spec = specialtyBySlug(params.slug);
    if (!spec) throw notFound();
    return { spec };
  },
  component: SpecialtyDetailPage,
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData.spec.name} — STACKORA` }],
  }),
});

function SpecialtyDetailPage() {
  const { t } = useTranslation();
  const { spec } = Route.useLoaderData();
  const devs = developersBySpecialty(spec.slug).slice(0, 6);

  return (
    <div className="container-page section-y">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-8 flex items-center gap-1 text-sm text-muted-foreground"
      >
        <Link to="/" className="hover:text-foreground transition-colors">
          {t("specialties.breadcrumbHome")}
        </Link>
        <ChevronRight className="size-3.5" />
        <Link to="/specialties" className="hover:text-foreground transition-colors">
          {t("specialties.breadcrumbSpecialties")}
        </Link>
        <ChevronRight className="size-3.5" />
        <span className="text-foreground">{spec.name}</span>
      </nav>

      {/* Hero */}
      <section className="mb-12">
        <h1 className="text-h1 text-gradient">{spec.name}</h1>
        <p className="text-lead mt-2 max-w-2xl text-muted-foreground">{spec.tagline}</p>
        <p className="mt-4 max-w-prose leading-relaxed text-muted-foreground">
          {spec.description}
        </p>
      </section>

      {/* Technologies */}
      <section className="mb-12">
        <h2 className="text-h2 mb-4">{t("specialtyDetail.technologies")}</h2>
        <ul className="flex flex-wrap gap-2">
          {spec.technologies.map((tech) => (
            <li key={tech}>
              <TechBadge>{tech}</TechBadge>
            </li>
          ))}
        </ul>
      </section>

      {/* Typical projects */}
      <section className="mb-12">
        <h2 className="text-h2 mb-4">{t("specialtyDetail.typicalProjects")}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {spec.typicalProjects.map((proj) => (
            <article key={proj.title} className="surface-card flex flex-col gap-2 p-5">
              <h3 className="font-display text-base font-semibold">{proj.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{proj.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Featured developers */}
      {devs.length > 0 && (
        <section className="mb-12">
          <h2 className="text-h2 mb-4">
            {t("specialtyDetail.developersTitle", { name: spec.short })}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {devs.map((dev) => (
              <DeveloperCard key={dev.id} dev={dev} headingLevel="h3" />
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="text-center">
        <Button asChild size="lg">
          <Link to="/developers">
            {t("specialtyDetail.exploreAllDevelopers")}
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>
      </section>
    </div>
  );
}
