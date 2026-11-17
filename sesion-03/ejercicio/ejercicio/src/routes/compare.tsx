import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { GitCompareArrows, ArrowLeft, X } from "lucide-react";

import { developers } from "@/data/developers";
import { specialtyBySlug } from "@/data/specialties";
import { useStore } from "@/lib/store";
import { DeveloperAvatar, TechBadge, AvailabilityBadge } from "@/components/marketplace/bits";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/compare")({
  component: ComparePage,
  head: () => ({
    meta: [{ title: "Compare developers — STACKORA" }],
  }),
});

function ComparePage() {
  const { t } = useTranslation();
  const { compare, dispatch } = useStore();
  const selected = compare
    .map((id) => developers.find((d) => d.id === id))
    .filter((d): d is (typeof developers)[number] => !!d);

  return (
    <div className="container-page section-y">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
        <ol className="flex items-center gap-1.5">
          <li><Link to="/" className="hover:text-foreground transition-colors">{t("comparePage.breadcrumbHome")}</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-foreground">{t("comparePage.breadcrumbCompare")}</li>
        </ol>
      </nav>

      <div className="flex items-center gap-3 mb-10">
        <div className="grid size-12 place-items-center rounded-2xl bg-cyan/10">
          <GitCompareArrows className="size-6 text-cyan" />
        </div>
        <div>
          <h1 className="text-h2">{t("comparePage.title")}</h1>
          <p className="text-sm text-muted-foreground">
            {selected.length < 2
              ? t("comparePage.minWarning")
              : t("comparePage.comparingSummary", { count: selected.length })}
          </p>
        </div>
      </div>

      {selected.length < 2 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line-strong py-20 text-center">
          <GitCompareArrows className="size-10 text-muted-foreground/40 mb-4" />
          <p className="text-lg font-medium">{t("comparePage.emptyTitle")}</p>
          <p className="mt-1 text-sm text-muted-foreground max-w-sm">
            {t("comparePage.emptyDescription")}
          </p>
          <Button asChild className="mt-6">
            <Link to="/developers">
              <ArrowLeft className="size-4 mr-2" />
              {t("comparePage.exploreTalent")}
            </Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto -mx-4 px-4">
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                <tr>
                  <th className="w-40 p-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {t("comparePage.attribute")}
                  </th>
                  {selected.map((dev) => (
                    <th key={dev.id} className="p-4 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <DeveloperAvatar dev={dev} size="md" />
                        <Link
                          to="/developers/$slug"
                          params={{ slug: dev.slug }}
                          className="font-display text-base font-medium hover:text-violet-soft transition-colors"
                        >
                          {dev.name}
                        </Link>
                        <button
                          type="button"
                          onClick={() => dispatch({ type: "removeCompare", id: dev.id })}
                          className="inline-flex items-center gap-1 rounded-full border border-line px-2.5 py-1 text-xs text-muted-foreground hover:border-destructive hover:text-destructive transition-colors"
                        >
                          <X className="size-3" /> {t("comparePage.remove")}
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                <CompareRow label={t("comparePage.rowTitle")}>
                  {selected.map((d) => <td key={d.id} className="p-4 text-center text-sm">{d.title}</td>)}
                </CompareRow>
                <CompareRow label={t("comparePage.rowSpecialty")}>
                  {selected.map((d) => (
                    <td key={d.id} className="p-4 text-center">
                      <span className="inline-flex rounded-full bg-violet-soft/10 px-3 py-1 text-xs font-medium text-violet-soft">
                        {specialtyBySlug(d.specialty)?.name}
                      </span>
                    </td>
                  ))}
                </CompareRow>
                <CompareRow label={t("comparePage.rowExperience")}>
                  {selected.map((d) => (
                    <td key={d.id} className="p-4 text-center font-mono text-sm">{t("comparePage.yearsValue", { count: d.experience })}</td>
                  ))}
                </CompareRow>
                <CompareRow label={t("comparePage.rowRate")}>
                  {selected.map((d) => (
                    <td key={d.id} className="p-4 text-center">
                      <span className="font-display text-lg">${d.hourlyRate}</span>
                      <span className="text-sm text-muted-foreground">{t("common.perHour")}</span>
                    </td>
                  ))}
                </CompareRow>
                <CompareRow label={t("comparePage.rowAvailability")}>
                  {selected.map((d) => (
                    <td key={d.id} className="p-4 text-center">
                      <span className="inline-flex justify-center">
                        <AvailabilityBadge availability={d.availability} />
                      </span>
                    </td>
                  ))}
                </CompareRow>
                <CompareRow label={t("comparePage.rowLocation")}>
                  {selected.map((d) => <td key={d.id} className="p-4 text-center text-sm">{d.location}</td>)}
                </CompareRow>
                <CompareRow label={t("comparePage.rowSkills")}>
                  {selected.map((d) => (
                    <td key={d.id} className="p-4">
                      <div className="flex flex-wrap justify-center gap-1">
                        {d.skills.map((s) => <TechBadge key={s}>{s}</TechBadge>)}
                      </div>
                    </td>
                  ))}
                </CompareRow>
                <CompareRow label={t("comparePage.rowLanguages")}>
                  {selected.map((d) => (
                    <td key={d.id} className="p-4 text-center text-sm">{d.languages.join(", ")}</td>
                  ))}
                </CompareRow>
                <CompareRow label={t("comparePage.rowProfile")}>
                  {selected.map((d) => (
                    <td key={d.id} className="p-4 text-center">
                      <Button asChild size="sm" variant="outline">
                        <Link to="/developers/$slug" params={{ slug: d.slug }}>{t("common.viewProfile")}</Link>
                      </Button>
                    </td>
                  ))}
                </CompareRow>
              </tbody>
            </table>
          </div>

          <Separator className="my-8" />

          <div className="flex justify-center gap-3">
            <Button variant="outline" onClick={() => dispatch({ type: "clearCompare" })}>
              {t("comparePage.clearComparison")}
            </Button>
            <Button asChild>
              <Link to="/developers">{t("comparePage.browseMoreTalent")}</Link>
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

function CompareRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <tr className="hover:bg-surface/50 transition-colors">
      <td className="p-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</td>
      {children}
    </tr>
  );
}
