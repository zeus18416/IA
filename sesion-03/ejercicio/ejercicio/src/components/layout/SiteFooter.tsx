import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Github, Linkedin, Twitter } from "lucide-react";
import { Logo } from "./Logo";
import { footerColumns } from "./nav-links";

export function SiteFooter() {
  const { t } = useTranslation();

  return (
    <footer className="relative border-t border-line bg-gradient-night">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.4fr_repeat(3,1fr)] md:py-20">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            {t("footer.description")}
          </p>
          <ul className="mt-6 flex gap-2" aria-label={t("footer.socialLinksLabel")}>
            {[
              { icon: Twitter, label: t("footer.xPlaceholder") },
              { icon: Linkedin, label: t("footer.linkedinPlaceholder") },
              { icon: Github, label: t("footer.githubPlaceholder") },
            ].map(({ icon: Icon, label }) => (
              <li key={label}>
                <a
                  href="#"
                  aria-label={label}
                  onClick={(e) => e.preventDefault()}
                  className="grid size-9 place-items-center rounded-full border border-line text-muted-foreground transition-colors hover:border-line-strong hover:text-foreground"
                >
                  <Icon className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        {footerColumns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="text-eyebrow text-muted-foreground">{col.title}</h2>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>{t("footer.copyright", { year: new Date().getFullYear() })}</p>
          <p className="font-mono">{t("footer.disclaimer")}</p>
        </div>
      </div>
    </footer>
  );
}
