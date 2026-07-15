"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Brand, MenuButton, ModalMenu } from "./components/SiteChrome";
import { PreferenceControls, usePreferences } from "./components/Preferences";

const technologies = ["Next.js", "React", "TypeScript", "Tailwind CSS"];

const homeCopy = {
  uk: {
    titleOne: "Сайти, застосунки,",
    titleTwo: "автоматизація.",
    titleThree: "Від ідеї до запуску.",
    description: "Допомагаю бізнесам та стартапам створювати цифрові продукти, які вирішують задачі та приносять результат.",
    projects: "Переглянути проєкти",
    contact: "Написати мені",
    technologies: "Технології",
    privacy: "Політика конфіденційності",
  },
  en: {
    titleOne: "Websites, apps,",
    titleTwo: "automation.",
    titleThree: "From idea to launch.",
    description: "I help businesses and startups build digital products that solve real problems and deliver results.",
    projects: "View projects",
    contact: "Contact me",
    technologies: "Technologies",
    privacy: "Privacy policy",
  },
} as const;

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const { language } = usePreferences();
  const copy = homeCopy[language];

  const duration = reduceMotion ? 0 : 0.32;

  return (
    <main className="page-shell" id="home">
      <section className="hero" aria-labelledby="hero-title">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/pixora-peony.png"
          aria-hidden="true"
        >
          <source src="/pixora-peony.mp4" type="video/mp4" />
        </video>
        <div className="hero-wash" aria-hidden="true" />

        <motion.header
          className="site-header"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
        >
          <Brand />
          <MenuButton open={menuOpen} onOpen={() => setMenuOpen(true)} />
          <PreferenceControls />
        </motion.header>

        <motion.div
          className="hero-copy"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: reduceMotion ? 0 : 0.04 },
            },
          }}
        >
          <motion.h1
            id="hero-title"
            variants={{
              hidden: { opacity: 0, y: 6 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration, ease: [0.16, 1, 0.3, 1] },
              },
            }}
          >
            {copy.titleOne}
            <br />
            {copy.titleTwo}
            <br />
            <span>{copy.titleThree}</span>
          </motion.h1>

          <motion.p
            className="hero-description"
            variants={{
              hidden: { opacity: 0, y: 4 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration, ease: [0.16, 1, 0.3, 1] },
              },
            }}
          >
            {copy.description}
          </motion.p>

          <motion.div
            className="hero-actions"
            variants={{
              hidden: { opacity: 0, y: 4 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration, ease: [0.16, 1, 0.3, 1] },
              },
            }}
          >
            <Link
              className="action-button action-button-primary"
              href="/projects"
            >
              {copy.projects} <span aria-hidden="true">↗</span>
            </Link>
            <button
              className="action-button action-button-secondary"
              type="button"
              onClick={() => setMenuOpen(true)}
            >
              {copy.contact} <span aria-hidden="true">↗</span>
            </button>
          </motion.div>
        </motion.div>

        <motion.ul
          className="technology-list"
          aria-label={copy.technologies}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration,
            delay: reduceMotion ? 0 : 0.12,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {technologies.map((technology, index) => (
            <li key={technology}>
              <span className="technology-mark" aria-hidden="true">
                {index === 2 ? "TS" : technology.slice(0, 1)}
              </span>
              {technology}
            </li>
          ))}
        </motion.ul>
      </section>

      <footer className="site-footer">
        <span>© 2026 PIXORA</span>
        <span className="footer-link">{copy.privacy}</span>
        <span className="footer-link">Cookie</span>
      </footer>

      <ModalMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </main>
  );
}
