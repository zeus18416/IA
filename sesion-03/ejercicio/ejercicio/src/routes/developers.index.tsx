import { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  LayoutList,
  X,
} from "lucide-react";
import { motion } from "motion/react";

import { PageHeader } from "@/components/layout/PageHeader";
import { DeveloperCard } from "@/components/marketplace/DeveloperCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { developers } from "@/data/developers";
import { specialties } from "@/data/specialties";
import {
  filterDevelopers,
  countActiveFilters,
  sortOptions,
  experienceOptions,
  RATE_MIN,
  RATE_MAX,
  type DevFilters,
  type SortKey,
} from "@/lib/filters";

export const Route = createFileRoute("/developers/")({
  component: DevelopersPage,
  head: () => ({
    meta: [
      { title: "Developers — STACKORA" },
      {
        name: "description",
        content:
          "Browse our curated catalog of developers. Filter by specialty, experience, rate and availability.",
      },
    ],
  }),
});

function DevelopersPage() {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [minExp, setMinExp] = useState(0);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [maxRate, setMaxRate] = useState(RATE_MAX);
  const [sort, setSort] = useState<SortKey>("relevance");
  const [layout, setLayout] = useState<"grid" | "list">("grid");

  const filters: DevFilters = useMemo(
    () => ({
      q: query || undefined,
      specialties:
        selectedSpecialties.length > 0 ? selectedSpecialties : undefined,
      minExp: minExp || undefined,
      available: availableOnly || undefined,
      maxRate: maxRate < RATE_MAX ? maxRate : undefined,
      sort,
    }),
    [query, selectedSpecialties, minExp, availableOnly, maxRate, sort],
  );

  const filtered = useMemo(
    () => filterDevelopers(developers, filters),
    [filters],
  );

  const activeCount = countActiveFilters(filters);

  function clearFilters() {
    setQuery("");
    setSelectedSpecialties([]);
    setMinExp(0);
    setAvailableOnly(false);
    setMaxRate(RATE_MAX);
  }

  function toggleSpecialty(slug: string) {
    setSelectedSpecialties((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );
  }

  return (
    <main>
      <PageHeader
        crumbs={[{ label: t("developers.breadcrumb") }]}
        eyebrow={t("developers.eyebrow")}
        title={t("developers.title")}
        lead={t("developers.lead")}
      />

      <div className="container-page section-y">
        {/* Search bar */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t("developers.searchPlaceholder")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Desktop sidebar filters */}
          <aside className="hidden w-64 shrink-0 lg:block" aria-label={t("developers.filtersLabel")}>
            <FilterPanel
              selectedSpecialties={selectedSpecialties}
              toggleSpecialty={toggleSpecialty}
              minExp={minExp}
              setMinExp={setMinExp}
              availableOnly={availableOnly}
              setAvailableOnly={setAvailableOnly}
              maxRate={maxRate}
              setMaxRate={setMaxRate}
              activeCount={activeCount}
              onClear={clearFilters}
            />
          </aside>

          {/* Mobile filter drawer */}
          <div className="flex items-center gap-3 lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <SlidersHorizontal className="size-4" />
                  {t("developers.filters")}
                  {activeCount > 0 && (
                    <Badge variant="secondary" className="ml-1 size-5 rounded-full p-0 text-xs">
                      {activeCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>{t("developers.filters")}</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterPanel
                    selectedSpecialties={selectedSpecialties}
                    toggleSpecialty={toggleSpecialty}
                    minExp={minExp}
                    setMinExp={setMinExp}
                    availableOnly={availableOnly}
                    setAvailableOnly={setAvailableOnly}
                    maxRate={maxRate}
                    setMaxRate={setMaxRate}
                    activeCount={activeCount}
                    onClear={clearFilters}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Results */}
          <section className="min-w-0 flex-1" aria-label={t("developers.developerResultsLabel")}>
            {/* Toolbar */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                {t("developers.showing")}{" "}
                {filtered.length !== 1
                  ? t("developers.developerCountPlural", { count: filtered.length })
                  : t("developers.developerCount", { count: filtered.length })}
              </p>

              <div className="flex items-center gap-3">
                <Select
                  value={sort}
                  onValueChange={(v) => setSort(v as SortKey)}
                >
                  <SelectTrigger className="w-44">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex rounded-md border border-input">
                  <Button
                    variant={layout === "grid" ? "secondary" : "ghost"}
                    size="icon"
                    className="size-9 rounded-r-none"
                    aria-label={t("developers.gridView")}
                    onClick={() => setLayout("grid")}
                  >
                    <LayoutGrid className="size-4" />
                  </Button>
                  <Button
                    variant={layout === "list" ? "secondary" : "ghost"}
                    size="icon"
                    className="size-9 rounded-l-none"
                    aria-label={t("developers.listView")}
                    onClick={() => setLayout("list")}
                  >
                    <LayoutList className="size-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Cards */}
            {filtered.length > 0 ? (
              <div
                className={
                  layout === "grid"
                    ? "grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
                    : "flex flex-col gap-4"
                }
              >
                {filtered.map((dev, i) => (
                  <motion.div
                    key={dev.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                  >
                    <DeveloperCard
                      dev={dev}
                      layout={layout}
                      headingLevel="h2"
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-muted-foreground/25 py-20 text-center">
                <Search className="mb-4 size-10 text-muted-foreground/50" />
                <p className="text-lg font-medium">{t("developers.noResults")}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t("developers.noResultsHint")}
                </p>
                {activeCount > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={clearFilters}
                  >
                    {t("developers.clearAllFilters")}
                  </Button>
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/*  Filter panel — shared between desktop sidebar and mobile drawer   */
/* ------------------------------------------------------------------ */

interface FilterPanelProps {
  selectedSpecialties: string[];
  toggleSpecialty: (slug: string) => void;
  minExp: number;
  setMinExp: (v: number) => void;
  availableOnly: boolean;
  setAvailableOnly: (v: boolean) => void;
  maxRate: number;
  setMaxRate: (v: number) => void;
  activeCount: number;
  onClear: () => void;
}

function FilterPanel({
  selectedSpecialties,
  toggleSpecialty,
  minExp,
  setMinExp,
  availableOnly,
  setAvailableOnly,
  maxRate,
  setMaxRate,
  activeCount,
  onClear,
}: FilterPanelProps) {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      {/* Header with count and clear */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {t("developers.filters")}
          {activeCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {activeCount}
            </Badge>
          )}
        </h2>
        {activeCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="h-auto gap-1 px-2 py-1 text-xs"
            onClick={onClear}
          >
            <X className="size-3" />
            {t("developers.clear")}
          </Button>
        )}
      </div>

      <Separator />

      {/* Specialty */}
      <fieldset>
        <legend className="mb-3 text-sm font-medium">{t("developers.specialty")}</legend>
        <div className="space-y-2.5">
          {specialties.map((sp) => (
            <label
              key={sp.slug}
              className="flex cursor-pointer items-center gap-2.5 text-sm"
            >
              <Checkbox
                checked={selectedSpecialties.includes(sp.slug)}
                onCheckedChange={() => toggleSpecialty(sp.slug)}
              />
              {sp.short}
            </label>
          ))}
        </div>
      </fieldset>

      <Separator />

      {/* Experience */}
      <fieldset>
        <legend className="mb-3 text-sm font-medium">{t("developers.experience")}</legend>
        <Select
          value={String(minExp)}
          onValueChange={(v) => setMinExp(Number(v))}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {experienceOptions.map((opt) => (
              <SelectItem key={opt.value} value={String(opt.value)}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </fieldset>

      <Separator />

      {/* Availability */}
      <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium">
        <Checkbox
          checked={availableOnly}
          onCheckedChange={(v) => setAvailableOnly(v === true)}
        />
        {t("developers.availableNow")}
      </label>

      <Separator />

      {/* Rate slider */}
      <fieldset>
        <legend className="mb-3 text-sm font-medium">
          {t("developers.maxHourlyRate")}{" "}
          <span className="font-normal text-muted-foreground">
            {t("developers.maxHourlyRateValue", { value: maxRate })}
          </span>
        </legend>
        <Slider
          min={RATE_MIN}
          max={RATE_MAX}
          step={5}
          value={[maxRate]}
          onValueChange={([v]) => setMaxRate(v)}
        />
        <div className="mt-1.5 flex justify-between text-xs text-muted-foreground">
          <span>${RATE_MIN}</span>
          <span>${RATE_MAX}</span>
        </div>
      </fieldset>
    </div>
  );
}
