import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import {
  DollarSign,
  Rocket,
  FolderOpen,
  CalendarClock,
  FileText,
  UserPlus,
  Sparkles,
  Code2,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/for-developers")({
  component: ForDevelopersPage,
  head: () => ({ meta: [{ title: "For Developers — STACKORA" }] }),
});

const benefits = [
  { icon: DollarSign, titleKey: "forDevelopers.benefitRateTitle", descKey: "forDevelopers.benefitRateDescription" },
  { icon: Rocket, titleKey: "forDevelopers.benefitStartupsTitle", descKey: "forDevelopers.benefitStartupsDescription" },
  { icon: FolderOpen, titleKey: "forDevelopers.benefitPortfolioTitle", descKey: "forDevelopers.benefitPortfolioDescription" },
  { icon: CalendarClock, titleKey: "forDevelopers.benefitScheduleTitle", descKey: "forDevelopers.benefitScheduleDescription" },
];

const steps = [
  { number: "1", icon: FileText, labelKey: "forDevelopers.stepApply" },
  { number: "2", icon: UserPlus, labelKey: "forDevelopers.stepProfile" },
  { number: "3", icon: Sparkles, labelKey: "forDevelopers.stepMatched" },
];

const specialtyOptionKeys = [
  "forDevelopers.specialtyFrontend",
  "forDevelopers.specialtyBackend",
  "forDevelopers.specialtyFullStack",
  "forDevelopers.specialtyAiMl",
  "forDevelopers.specialtyMobile",
  "forDevelopers.specialtyDevops",
  "forDevelopers.specialtyOther",
];

const experienceOptionKeys = [
  "forDevelopers.experience1to3",
  "forDevelopers.experience3to5",
  "forDevelopers.experience5to8",
  "forDevelopers.experience8Plus",
];

interface FormState {
  name: string;
  email: string;
  specialty: string;
  experience: string;
  portfolio: string;
  bio: string;
}

const emptyForm: FormState = {
  name: "",
  email: "",
  specialty: "",
  experience: "",
  portfolio: "",
  bio: "",
};

function ForDevelopersPage() {
  const { t } = useTranslation();
  const [form, setForm] = useState<FormState>(emptyForm);

  const set = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.specialty || !form.experience || !form.bio) {
      toast.error(t("forDevelopers.toastError"));
      return;
    }
    toast(t("forDevelopers.toastSuccess"));
    setForm(emptyForm);
  };

  return (
    <div className="container-page section-y">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
        <ol className="flex items-center gap-1.5">
          <li>
            <Link to="/" className="hover:text-foreground transition-colors">
              {t("forDevelopers.breadcrumbHome")}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-foreground">
            {t("forDevelopers.breadcrumbForDevelopers")}
          </li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="mb-16 text-center">
        <div className="grid size-14 place-items-center rounded-2xl bg-cyan/10 mx-auto mb-4">
          <Code2 className="size-7 text-cyan" />
        </div>
        <h1 className="text-h1 text-gradient mb-4">{t("forDevelopers.title")}</h1>
        <p className="text-lead max-w-2xl mx-auto">
          {t("forDevelopers.lead")}
        </p>
      </section>

      {/* Benefits */}
      <section className="mb-16">
        <h2 className="text-h2 text-center mb-8">{t("forDevelopers.whyTitle")}</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <div key={b.titleKey} className="surface-card rounded-2xl p-6">
              <div className="grid size-10 place-items-center rounded-xl bg-cyan/10 mb-4">
                <b.icon className="size-5 text-cyan" />
              </div>
              <h3 className="text-h3 mb-1">{t(b.titleKey)}</h3>
              <p className="text-sm text-muted-foreground">{t(b.descKey)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How to join */}
      <section className="mb-16">
        <h2 className="text-h2 text-center mb-8">{t("forDevelopers.joinTitle")}</h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
          {steps.map((s, i) => (
            <div key={s.labelKey} className="flex items-center gap-4">
              <div className="flex flex-col items-center text-center">
                <div className="grid size-14 place-items-center rounded-full bg-cyan/10 mb-2">
                  <s.icon className="size-6 text-cyan" />
                </div>
                <span className="text-eyebrow">{t("forDevelopers.step", { number: s.number })}</span>
                <span className="text-sm font-medium mt-1">{t(s.labelKey)}</span>
              </div>
              {i < steps.length - 1 && (
                <ArrowRight className="hidden sm:block size-5 text-muted-foreground mt-[-1rem]" />
              )}
            </div>
          ))}
        </div>
      </section>

      <Separator className="mb-16" />

      {/* Registration Form */}
      <section className="mb-16 max-w-2xl mx-auto">
        <h2 className="text-h2 text-center mb-2">{t("forDevelopers.formTitle")}</h2>
        <p className="text-sm text-muted-foreground text-center mb-8">
          {t("forDevelopers.formSimulation")}
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">{t("forDevelopers.nameLabel")}</Label>
              <Input
                id="name"
                value={form.name}
                onChange={set("name")}
                placeholder={t("forDevelopers.namePlaceholder")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t("forDevelopers.emailLabel")}</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={set("email")}
                placeholder={t("forDevelopers.emailPlaceholder")}
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>{t("forDevelopers.specialtyLabel")}</Label>
              <Select
                value={form.specialty}
                onValueChange={(v) => setForm((f) => ({ ...f, specialty: v }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("forDevelopers.selectSpecialty")} />
                </SelectTrigger>
                <SelectContent>
                  {specialtyOptionKeys.map((key) => (
                    <SelectItem key={key} value={t(key)}>
                      {t(key)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{t("forDevelopers.experienceLabel")}</Label>
              <Select
                value={form.experience}
                onValueChange={(v) => setForm((f) => ({ ...f, experience: v }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("forDevelopers.selectExperience")} />
                </SelectTrigger>
                <SelectContent>
                  {experienceOptionKeys.map((key) => (
                    <SelectItem key={key} value={t(key)}>
                      {t(key)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="portfolio">{t("forDevelopers.portfolioLabel")}</Label>
            <Input
              id="portfolio"
              type="url"
              value={form.portfolio}
              onChange={set("portfolio")}
              placeholder={t("forDevelopers.portfolioPlaceholder")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">{t("forDevelopers.bioLabel")}</Label>
            <Textarea
              id="bio"
              value={form.bio}
              onChange={set("bio")}
              placeholder={t("forDevelopers.bioPlaceholder")}
              rows={4}
            />
          </div>

          <Button type="submit" size="lg" className="w-full sm:w-auto">
            {t("forDevelopers.submitApplication")}
          </Button>
        </form>
      </section>

      {/* Final CTA */}
      <section className="text-center">
        <h2 className="text-h2 mb-4">{t("forDevelopers.ctaTitle")}</h2>
        <Button asChild size="lg">
          <Link to="/developers">
            {t("forDevelopers.browseOpportunities")}
            <ArrowRight className="size-4 ml-2" />
          </Link>
        </Button>
      </section>
    </div>
  );
}
