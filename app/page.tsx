"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Brand, MenuButton, ModalMenu } from "./components/SiteChrome";

const technologies = ["Next.js", "React", "TypeScript", "Tailwind CSS"];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

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
            Сайти, застосунки,
            <br />
            автоматизація.
            <br />
            <span>Від ідеї до запуску.</span>
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
            Допомагаю бізнесам та стартапам створювати цифрові продукти,
            які вирішують задачі та приносять результат.
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
              Переглянути проєкти <span aria-hidden="true">↗</span>
            </Link>
            <button
              className="action-button action-button-secondary"
              type="button"
              onClick={() => setMenuOpen(true)}
            >
              Написати мені <span aria-hidden="true">↗</span>
            </button>
          </motion.div>
        </motion.div>

        <motion.ul
          className="technology-list"
          aria-label="Технології"
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
        <span className="footer-link">Політика конфіденційності</span>
        <span className="footer-link">Cookie</span>
      </footer>

      <ModalMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </main>
  );
}
