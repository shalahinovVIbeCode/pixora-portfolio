"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import type { IconType } from "react-icons";
import {
  PiArrowUpRight,
  PiEnvelopeSimple,
  PiGithubLogo,
  PiInstagramLogo,
  PiSparkle,
  PiTelegramLogo,
} from "react-icons/pi";
import { Brand, MenuButton, ModalMenu } from "../components/SiteChrome";
import { PreferenceControls, usePreferences } from "../components/Preferences";

type ContactChannel = {
  label: string;
  href: string;
  icon: IconType;
  external?: boolean;
};

const channels = [
  { label: "Telegram", href: "https://t.me/shalahinovads", icon: PiTelegramLogo, external: true },
  { label: "Instagram", href: "https://instagram.com/shalahinov.ads", icon: PiInstagramLogo, external: true },
  { label: "Email", href: "mailto:shalahinov.ads@gmail.com", icon: PiEnvelopeSimple },
  { label: "GitHub", href: "https://github.com/shalahinovVIbeCode", icon: PiGithubLogo, external: true },
] as const satisfies readonly ContactChannel[];

const details = [
  { label: { uk: "Місто", en: "City" }, value: { uk: "Львів, Україна", en: "Lviv, Ukraine" } },
  { label: { uk: "Часовий пояс", en: "Time zone" }, value: { uk: "UTC+3", en: "UTC+3" } },
  { label: { uk: "Відповідь", en: "Reply" }, value: { uk: "протягом доби", en: "within one day" } },
] as const;

const contactsCopy = {
  uk: {
    section: "Контакти",
    title: "Напишіть, що потрібно зробити, а я розберусь.",
    channels: "Канали зв’язку",
    panelTitle: "Зручно зв’язатися напряму — оберіть будь-який канал.",
    panelLead: "Відкритий до нових проєктів, співпраці та цікавих ідей.",
    telegram: "Написати в Telegram",
    email: "Написати email",
    all: "Усі контакти",
    rights: "Усі права захищено.",
  },
  en: {
    section: "Contacts",
    title: "Tell me what needs to be built. I’ll figure it out.",
    channels: "Contact channels",
    panelTitle: "Reach me directly — choose any channel.",
    panelLead: "Open to new projects, collaborations, and interesting ideas.",
    telegram: "Message on Telegram",
    email: "Send email",
    all: "All contacts",
    rights: "All rights reserved.",
  },
} as const;

function ChannelLink({ channel, compact = false }: { channel: ContactChannel; compact?: boolean }) {
  const Icon = channel.icon;
  return (
    <a
      className={compact ? "contact-strip-link" : "contact-channel-link"}
      href={channel.href}
      aria-label={channel.label}
      target={channel.external ? "_blank" : undefined}
      rel={channel.external ? "noreferrer" : undefined}
    >
      <span className="contact-link-label"><Icon aria-hidden="true" />{channel.label}</span>
      {compact && <PiArrowUpRight aria-hidden="true" />}
    </a>
  );
}

export function ContactsPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = Boolean(useReducedMotion());
  const { language } = usePreferences();
  const copy = contactsCopy[language];
  const revealY = reduceMotion ? 0 : 14;
  const duration = reduceMotion ? 0 : 0.65;

  return (
    <main className="contacts-page" id="contacts-top">
      <header className="contacts-topbar">
        <Brand />
        <MenuButton open={menuOpen} onOpen={() => setMenuOpen(true)} />
        <PreferenceControls />
      </header>

      <div className="contacts-content">
        <motion.section
          className="contacts-hero"
          initial={{ opacity: 0, y: revealY }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="contacts-copy">
            <p className="section-eyebrow"><span>01</span> {copy.section}</p>
            <h1>{copy.title}</h1>
            <a className="contacts-email" href="mailto:shalahinov.ads@gmail.com">
              <span>shalahinov.ads@gmail.com</span><PiArrowUpRight aria-hidden="true" />
            </a>
            <dl className="contact-details">
              {details.map((detail) => (
                <div key={detail.label.uk}><dt>{detail.label[language]}</dt><dd>{detail.value[language]}</dd></div>
              ))}
            </dl>
          </div>

          <aside className="contact-panel" aria-label={copy.channels}>
            <div className="contact-panel-intro">
              <span className="contact-spark" aria-hidden="true"><PiSparkle /></span>
              <div>
                <h2>{copy.panelTitle}</h2>
                <p>{copy.panelLead}</p>
              </div>
            </div>
            <div className="contact-channel-grid">
              {channels.map((channel) => <ChannelLink channel={channel} key={channel.label} />)}
            </div>
            <div className="contact-primary-actions">
              <a className="action-button action-button-primary" href="https://t.me/shalahinovads" target="_blank" rel="noreferrer">
                <PiTelegramLogo aria-hidden="true" />{copy.telegram}
              </a>
              <a className="action-button action-button-secondary" href="mailto:shalahinov.ads@gmail.com">
                <PiEnvelopeSimple aria-hidden="true" />{copy.email}
              </a>
            </div>
          </aside>
        </motion.section>

        <motion.nav
          className="contact-strip"
          aria-label={copy.all}
          initial={{ opacity: 0, y: revealY }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration, delay: reduceMotion ? 0 : 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          {channels.map((channel) => <ChannelLink channel={channel} compact key={channel.label} />)}
        </motion.nav>
      </div>

      <footer className="site-footer contacts-footer"><span>© 2026 PIXORA. {copy.rights}</span></footer>
      <ModalMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </main>
  );
}
