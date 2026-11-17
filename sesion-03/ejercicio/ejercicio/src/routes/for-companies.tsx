import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import {
  ShieldCheck,
  Puzzle,
  Zap,
  Headset,
  ClipboardList,
  Users,
  Handshake,
  Building2,
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

export const Route = createFileRoute("/for-companies")({
  component: ForCompaniesPage,
  head: () => ({ meta: [{ title: "For Companies — STACKORA" }] }),
});

const benefits = [
  { icon: ShieldCheck, titleKey: "forCompanies.benefitVettedTitle", descKey: "forCompanies.benefitVettedDescription" },
  { icon: Puzzle, titleKey: "forCompanies.benefitFlexibleTitle", descKey: "forCompanies.benefitFlexibleDescription" },
  { icon: Zap, titleKey: "forCompanies.benefitFastTitle", descKey: "forCompanies.benefitFastDescription" },
  { icon: Headset, titleKey: "forCompanies.benefitSupportTitle", descKey: "forCompanies.benefitSupportDescription" },
];

const steps = [
  { number: "1", icon: ClipboardList, labelKey: "forCompanies.stepPost" },
  { number: "2", icon: Users, labelKey: "forCompanies.stepReview" },
  { number: "3", icon: Handshake, labelKey: "forCompanies.stepCollaborate" },
];

const specialtyOptionKeys = [
  "forCompanies.specialtyFrontend",
  "forCompanies.specialtyBackend",
  "forCompanies.specialtyFullStack",
  "forCompanies.specialtyAiMl",
  "forCompanies.specialtyMobile",
  "forCompanies.specialtyDevops",
  "forCompanies.specialtyOther",
];

const budgetOptionKeys = [
  "forCompanies.budgetUnder5k",
  "forCompanies.budget5to15k",
  "forCompanies.budget15to50k",
  "forCompanies.budget50kPlus",
];

interface FormState {
  companyName: string;
  contactName: string;
  email: string;
  description: string;
  specialty: string;
  budget: string;
}

const emptyForm: FormState = {
  companyName: "",
  contactName: "",
  email: "",
  description: "",
  specialty: "",
  budget: "",
};

function ForCompaniesPage() {
  const { t } = useTranslation();
  const [form, setForm] = useState<FormState>(emptyForm);

  const set = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.companyName ||
      !form.contactName ||
      !form.email ||
      !form.description ||
      !form.specialty ||
      !form.budget
    ) {
      toast.error(t("forCompanies.toastError"));
      return;
    }
    toast(t("forCompanies.toastSuccess"));
    setForm(emptyForm);
  };

  return (
    <div className="container-page section-y">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
        <ol className="flex items-center gap-1.5">
          <li>
            <Link to="/" className="hover:text-foreground transition-colors">
              {t("forCompanies.breadcrumbHome")}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-foreground">
            {t("forCompanies.breadcrumbForCompanies")}
          </li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="mb-16 text-center">
        <div className="grid size-14 place-items-center rounded-2xl bg-violet-soft/10 mx-auto mb-4">
          <Building2 className="size-7 text-violet-soft" />
        </div>
        <h1 className="text-h1 text-gradient mb-4">{t("forCompanies.title")}</h1>
        <p className="text-lead max-w-2xl mx-auto">
          {t("forCompanies.lead")}
        </p>
      </section>

      {/* Benefits */}
      <section className="mb-16">
        <h2 className="text-h2 text-center mb-8">{t("forCompanies.whyTitle")}</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <div key={b.titleKey} className="surface-card rounded-2xl p-6">
              <div className="grid size-10 place-items-center rounded-xl bg-violet-soft/10 mb-4">
                <b.icon className="size-5 text-violet-soft" />
              </div>
              <h3 className="text-h3 mb-1">{t(b.titleKey)}</h3>
              <p className="text-sm text-muted-foreground">{t(b.descKey)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="mb-16">
        <h2 className="text-h2 text-center mb-8">{t("forCompanies.processTitle")}</h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
          {steps.map((s, i) => (
            <div key={s.labelKey} className="flex items-center gap-4">
              <div className="flex flex-col items-center text-center">
                <div className="grid size-14 place-items-center rounded-full bg-violet-soft/10 mb-2">
                  <s.icon className="size-6 text-violet-soft" />
                </div>
                <span className="text-eyebrow">{t("forCompanies.step", { number: s.number })}</span>
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

      {/* Request Form */}
      <section className="mb-16 max-w-2xl mx-auto">
        <h2 className="text-h2 text-center mb-2">{t("forCompanies.formTitle")}</h2>
        <p className="text-sm text-muted-foreground text-center mb-8">
          {t("forCompanies.formSimulation")}
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="companyName">{t("forCompanies.companyNameLabel")}</Label>
              <Input
                id="companyName"
                value={form.companyName}
                onChange={set("companyName")}
                placeholder={t("forCompanies.companyNamePlaceholder")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactName">{t("forCompanies.contactNameLabel")}</Label>
              <Input
                id="contactName"
                value={form.contactName}
                onChange={set("contactName")}
                placeholder={t("forCompanies.contactNamePlaceholder")}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t("forCompanies.emailLabel")}</Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={set("email")}
              placeholder={t("forCompanies.emailPlaceholder")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">{t("forCompanies.projectDescriptionLabel")}</Label>
            <Textarea
              id="description"
              value={form.description}
              onChange={set("description")}
              placeholder={t("forCompanies.projectDescriptionPlaceholder")}
              rows={4}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>{t("forCompanies.specialtyNeededLabel")}</Label>
              <Select
                value={form.specialty}
                onValueChange={(v) => setForm((f) => ({ ...f, specialty: v }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("forCompanies.selectSpecialty")} />
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
              <Label>{t("forCompanies.budgetRangeLabel")}</Label>
              <Select
                value={form.budget}
                onValueChange={(v) => setForm((f) => ({ ...f, budget: v }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("forCompanies.selectBudget")} />
                </SelectTrigger>
                <SelectContent>
                  {budgetOptionKeys.map((key) => (
                    <SelectItem key={key} value={t(key)}>
                      {t(key)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full sm:w-auto">
            {t("forCompanies.submitRequest")}
          </Button>
        </form>
      </section>

      {/* Final CTA */}
      <section className="text-center">
        <h2 className="text-h2 mb-4">{t("forCompanies.ctaTitle")}</h2>
        <Button asChild size="lg">
          <Link to="/developers">
            {t("forCompanies.exploreTalentPool")}
            <ArrowRight className="size-4 ml-2" />
          </Link>
        </Button>
      </section>
    </div>
  );
}
