import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Heart, ArrowLeft } from "lucide-react";

import { developers } from "@/data/developers";
import { useStore } from "@/lib/store";
import { DeveloperCard } from "@/components/marketplace/DeveloperCard";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/favorites")({
  component: FavoritesPage,
  head: () => ({
    meta: [{ title: "Saved developers — STACKORA" }],
  }),
});

function FavoritesPage() {
  const { t } = useTranslation();
  const { favorites } = useStore();
  const saved = developers.filter((d) => favorites.includes(d.id));

  return (
    <div className="container-page section-y">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
        <ol className="flex items-center gap-1.5">
          <li><Link to="/" className="hover:text-foreground transition-colors">{t("favorites.breadcrumbHome")}</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-foreground">{t("favorites.breadcrumbSaved")}</li>
        </ol>
      </nav>

      <div className="flex items-center gap-3 mb-10">
        <div className="grid size-12 place-items-center rounded-2xl bg-violet-soft/10">
          <Heart className="size-6 text-violet-soft" />
        </div>
        <div>
          <h1 className="text-h2">{t("favorites.title")}</h1>
          <p className="text-sm text-muted-foreground">
            {saved.length === 0
              ? t("favorites.countEmpty")
              : saved.length !== 1
                ? t("favorites.countSummaryPlural", { count: saved.length })
                : t("favorites.countSummary", { count: saved.length })}
          </p>
        </div>
      </div>

      {saved.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {saved.map((dev) => (
            <DeveloperCard key={dev.id} dev={dev} headingLevel="h2" />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line-strong py-20 text-center">
          <Heart className="size-10 text-muted-foreground/40 mb-4" />
          <p className="text-lg font-medium">{t("favorites.emptyTitle")}</p>
          <p className="mt-1 text-sm text-muted-foreground max-w-sm">
            {t("favorites.emptyDescription")}
          </p>
          <Button asChild className="mt-6">
            <Link to="/developers">
              <ArrowLeft className="size-4 mr-2" />
              {t("favorites.exploreTalent")}
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
