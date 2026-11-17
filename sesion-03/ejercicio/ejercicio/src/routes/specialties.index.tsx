import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { specialties } from "@/data/specialties";

export const Route = createFileRoute("/specialties/")({
  component: SpecialtiesPage,
  head: () => ({
    meta: [{ title: "Specialties — STACKORA" }],
  }),
});

function SpecialtiesPage() {
  const { t } = useTranslation();

  return (
    <div className="container-page section-y">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
        <ol className="flex items-center gap-1.5">
          <li>
            <Link to="/" className="hover:text-foreground transition-colors">
              {t("specialties.breadcrumbHome")}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-foreground">
            {t("specialties.breadcrumbSpecialties")}
          </li>
        </ol>
      </nav>

      <div className="mb-10">
        <h1 className="text-h1 text-gradient">{t("specialties.title")}</h1>
        <p className="text-lead mt-2 max-w-2xl text-muted-foreground">
          {t("specialties.lead")}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {specialties.map((s) => (
          <Link
            key={s.slug}
            to="/specialties/$slug"
            params={{ slug: s.slug }}
            className="surface-card surface-interactive flex flex-col gap-3 p-5"
          >
            <h2 className="font-display text-base font-semibold">{s.name}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {s.tagline}
            </p>

            <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
              {s.technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center rounded-md border border-line bg-foreground/[0.03] px-2 py-0.5 font-mono text-[0.7rem] text-foreground/80"
                >
                  {tech}
                </span>
              ))}
            </div>

            <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-foreground">
              {t("specialties.explore")}
              <ArrowRight className="size-3.5" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
