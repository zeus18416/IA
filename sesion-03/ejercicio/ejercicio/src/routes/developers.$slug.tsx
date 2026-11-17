import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { MapPin, ChevronRight, Send } from "lucide-react";
import { toast } from "sonner";

import { developerBySlug } from "@/data/developers";
import { specialtyBySlug } from "@/data/specialties";
import { projectImages } from "@/data/project-images";

import { DeveloperAvatar, TechBadge, AvailabilityBadge } from "@/components/marketplace/bits";
import { FavoriteButton, CompareButton } from "@/components/marketplace/ActionButtons";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/developers/$slug")({
  loader: ({ params }) => {
    const dev = developerBySlug(params.slug);
    if (!dev) throw notFound();
    return { dev };
  },
  component: DeveloperProfilePage,
});

/* ------------------------------------------------------------------ */
/*  Contact Dialog                                                     */
/* ------------------------------------------------------------------ */

function ContactDialog({
  devName,
  open,
  onOpenChange,
}: {
  devName: string;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    toast(t("profile.messageSentToast"));
    setName("");
    setEmail("");
    setMessage("");
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("profile.contactTitle", { name: devName })}</DialogTitle>
          <DialogDescription>
            {t("profile.contactDescription")}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <label htmlFor="contact-name" className="text-sm font-medium">
              {t("profile.nameLabel")}
            </label>
            <Input
              id="contact-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder={t("profile.namePlaceholder")}
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="contact-email" className="text-sm font-medium">
              {t("profile.emailLabel")}
            </label>
            <Input
              id="contact-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder={t("profile.emailPlaceholder")}
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="contact-message" className="text-sm font-medium">
              {t("profile.messageLabel")}
            </label>
            <Textarea
              id="contact-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              placeholder={t("profile.messagePlaceholder")}
              rows={4}
            />
          </div>

          <DialogFooter>
            <Button type="submit">
              <Send className="mr-2 size-4" />
              {t("profile.sendMessage")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

function DeveloperProfilePage() {
  const { t } = useTranslation();
  const { dev } = Route.useLoaderData();
  const specialty = specialtyBySlug(dev.specialty);
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="container-page section-y">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-1 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground transition-colors">
          {t("profile.breadcrumbHome")}
        </Link>
        <ChevronRight className="size-3.5" />
        <Link to="/developers" className="hover:text-foreground transition-colors">
          {t("profile.breadcrumbDevelopers")}
        </Link>
        <ChevronRight className="size-3.5" />
        <span className="text-foreground">{dev.name}</span>
      </nav>

      {/* Profile header */}
      <section className="flex flex-col items-start gap-6 md:flex-row md:gap-10">
        <DeveloperAvatar dev={dev} size="xl" />

        <div className="flex-1 space-y-4">
          <div className="space-y-1">
            <h1 className="text-h1">{dev.name}</h1>
            <p className="text-lead">{dev.title}</p>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-4" />
              {dev.location}
            </span>
            <span>{t("profile.yearsExperience", { count: dev.experience })}</span>
            {specialty && <Badge variant="secondary">{specialty.short}</Badge>}
            <AvailabilityBadge availability={dev.availability} />
          </div>

          <p className="text-2xl font-semibold tracking-tight">
            ${dev.hourlyRate}
            <span className="text-base font-normal text-muted-foreground">/hr</span>
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <FavoriteButton dev={dev} withLabel />
            <CompareButton dev={dev} withLabel />
            <Button onClick={() => setContactOpen(true)}>{t("profile.contact")}</Button>
          </div>
        </div>
      </section>

      <Separator className="my-10" />

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList>
          <TabsTrigger value="overview">{t("profile.tabOverview")}</TabsTrigger>
          <TabsTrigger value="experience">{t("profile.tabExperience")}</TabsTrigger>
          <TabsTrigger value="projects">{t("profile.tabProjects")}</TabsTrigger>
          <TabsTrigger value="skills">{t("profile.tabSkills")}</TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview" className="space-y-8">
          <div>
            <h2 className="text-h2 mb-3">{t("profile.about")}</h2>
            <p className="max-w-prose leading-relaxed text-muted-foreground">{dev.summary}</p>
          </div>

          <div>
            <h2 className="text-h2 mb-3">{t("profile.languages")}</h2>
            <ul className="flex flex-wrap gap-2">
              {dev.languages.map((lang) => (
                <li key={lang}>
                  <Badge variant="outline">{lang}</Badge>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-h2 mb-3">{t("profile.education")}</h2>
            <p className="text-muted-foreground">{dev.education}</p>
          </div>

          {dev.certifications.length > 0 && (
            <div>
              <h2 className="text-h2 mb-3">{t("profile.certifications")}</h2>
              <ul className="flex flex-wrap gap-2">
                {dev.certifications.map((cert) => (
                  <li key={cert}>
                    <Badge variant="secondary">{cert}</Badge>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </TabsContent>

        {/* Experience */}
        <TabsContent value="experience" className="space-y-0">
          <h2 className="text-h2 mb-6">{t("profile.career")}</h2>
          <div className="relative border-l-2 border-line pl-6 space-y-8">
            {dev.career.map((item) => (
              <div key={`${item.company}-${item.period}`} className="relative">
                <span className="absolute -left-[calc(1.5rem+5px)] top-1.5 size-2.5 rounded-full bg-violet-soft" />
                <p className="font-semibold">{item.role}</p>
                <p className="text-sm text-muted-foreground">
                  {item.company} &middot; {item.period}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Projects */}
        <TabsContent value="projects">
          <h2 className="text-h2 mb-6">{t("profile.projects")}</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {dev.projects.map((project) => (
              <article key={project.name} className="surface-card overflow-hidden rounded-xl">
                <img
                  src={projectImages[project.image]}
                  alt={project.name}
                  className="aspect-video w-full object-cover"
                />
                <div className="space-y-3 p-5">
                  <h3 className="text-h3">{project.name}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <TechBadge key={tech}>{tech}</TechBadge>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </TabsContent>

        {/* Skills */}
        <TabsContent value="skills">
          <h2 className="text-h2 mb-6">{t("profile.skills")}</h2>
          <div className="flex flex-wrap gap-2">
            {dev.skills.map((skill) => (
              <TechBadge key={skill}>{skill}</TechBadge>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Contact dialog */}
      <ContactDialog devName={dev.name} open={contactOpen} onOpenChange={setContactOpen} />
    </div>
  );
}
