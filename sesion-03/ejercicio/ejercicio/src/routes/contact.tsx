import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Mail, Github, Twitter, Linkedin, MessageSquare } from "lucide-react";
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

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({ meta: [{ title: "Contact — STACKORA" }] }),
});

const subjectOptionKeys = [
  "contactPage.subjectGeneral",
  "contactPage.subjectHiring",
  "contactPage.subjectPartnership",
  "contactPage.subjectSupport",
];

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const emptyForm: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const socials = [
  { icon: Github, labelKey: "contactPage.socialGithub", handle: "stackora" },
  { icon: Twitter, labelKey: "contactPage.socialTwitter", handle: "@stackora" },
  { icon: Linkedin, labelKey: "contactPage.socialLinkedin", handle: "stackora" },
];

function ContactPage() {
  const { t } = useTranslation();
  const [form, setForm] = useState<FormState>(emptyForm);

  const set = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error(t("contactPage.toastError"));
      return;
    }
    toast(t("contactPage.toastSuccess"));
    setForm(emptyForm);
  };

  return (
    <div className="container-page section-y">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
        <ol className="flex items-center gap-1.5">
          <li>
            <Link to="/" className="hover:text-foreground transition-colors">
              {t("contactPage.breadcrumbHome")}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-foreground">
            {t("contactPage.breadcrumbContact")}
          </li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="mb-16 text-center">
        <div className="grid size-14 place-items-center rounded-2xl bg-violet-soft/10 mx-auto mb-4">
          <MessageSquare className="size-7 text-violet-soft" />
        </div>
        <h1 className="text-h1 text-gradient mb-4">{t("contactPage.title")}</h1>
        <p className="text-lead max-w-2xl mx-auto">
          {t("contactPage.lead")}
        </p>
      </section>

      {/* Two-column layout */}
      <section className="mb-16 grid gap-10 lg:grid-cols-[1fr_320px] max-w-4xl mx-auto">
        {/* Form */}
        <div>
          <h2 className="text-h2 mb-2">{t("contactPage.formTitle")}</h2>
          <p className="text-sm text-muted-foreground mb-6">
            {t("contactPage.formSimulation")}
          </p>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">{t("contactPage.nameLabel")}</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={set("name")}
                  placeholder={t("contactPage.namePlaceholder")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t("contactPage.emailLabel")}</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  placeholder={t("contactPage.emailPlaceholder")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>{t("contactPage.subjectLabel")}</Label>
              <Select
                value={form.subject}
                onValueChange={(v) => setForm((f) => ({ ...f, subject: v }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("contactPage.selectSubject")} />
                </SelectTrigger>
                <SelectContent>
                  {subjectOptionKeys.map((key) => (
                    <SelectItem key={key} value={t(key)}>
                      {t(key)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">{t("contactPage.messageLabel")}</Label>
              <Textarea
                id="message"
                value={form.message}
                onChange={set("message")}
                placeholder={t("contactPage.messagePlaceholder")}
                rows={5}
              />
            </div>

            <Button type="submit" size="lg" className="w-full sm:w-auto">
              {t("contactPage.sendMessage")}
            </Button>
          </form>
        </div>

        {/* Info panel */}
        <aside className="surface-card rounded-2xl p-6 h-fit">
          <h3 className="text-h3 mb-4">{t("contactPage.contactInfo")}</h3>

          <div className="flex items-center gap-3 mb-5">
            <Mail className="size-4 text-muted-foreground shrink-0" />
            <span className="text-sm">hello@stackora.dev</span>
          </div>

          <Separator className="mb-5" />

          <h4 className="text-sm font-medium mb-3">{t("contactPage.followUs")}</h4>
          <ul className="space-y-3">
            {socials.map((s) => (
              <li key={s.labelKey} className="flex items-center gap-3">
                <s.icon className="size-4 text-muted-foreground shrink-0" />
                <div>
                  <span className="text-sm font-medium">{t(s.labelKey)}</span>
                  <span className="block text-xs text-muted-foreground">{s.handle}</span>
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </div>
  );
}
