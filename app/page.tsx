"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const technologies = ["Next.js", "React", "TypeScript", "Tailwind CSS"];
const menuItems = ["Головна", "Проєкти", "Про мене", "Контакти"];

function Brand() {
  return (
    <a className="brand" href="#home" aria-label="PIXORA — на головну">
      <span className="brand-mark" aria-hidden="true" />
      <span>PIXORA</span>
    </a>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const duration = reduceMotion ? 0 : 0.32;

  return (
    <main className="page-shell" id="home">
      <section className="hero" aria-labelledby="hero-title">
        <Image
          className="hero-image"
          src="/pixora-peony.png"
          alt=""
          fill
          priority
          sizes="100vw"
        />
        <div className="hero-wash" aria-hidden="true" />

        <motion.header
          className="site-header"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
        >
          <Brand />
          <button
            className="menu-button"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="main-menu"
            onClick={() => setMenuOpen(true)}
          >
            <span aria-hidden="true">+</span> Меню
          </button>
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
            <button
              className="action-button action-button-primary"
              type="button"
              onClick={() => setMenuOpen(true)}
            >
              Переглянути проєкти <span aria-hidden="true">↗</span>
            </button>
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

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="menu-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.25 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setMenuOpen(false);
            }}
          >
            <motion.section
              id="main-menu"
              className="menu-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Головне меню"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 10, scale: 0.992 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: reduceMotion ? 0 : 8, scale: 0.994 }}
              transition={{
                duration: reduceMotion ? 0 : 0.28,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="menu-header">
                <span className="menu-kicker">Відкрити розділ</span>
                <button
                  ref={closeButtonRef}
                  className="close-button"
                  type="button"
                  aria-label="Закрити меню"
                  onClick={() => setMenuOpen(false)}
                >
                  ×
                </button>
              </div>

              <motion.nav
                aria-label="Навігація"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: { staggerChildren: reduceMotion ? 0 : 0.04 },
                  },
                }}
              >
                <ol className="menu-list">
                  {menuItems.map((item, index) => (
                    <motion.li
                      key={item}
                      variants={{
                        hidden: { opacity: 0, y: 5 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: reduceMotion ? 0 : 0.26,
                            ease: [0.16, 1, 0.3, 1],
                          },
                        },
                      }}
                    >
                      <button type="button" onClick={() => setMenuOpen(false)}>
                        <span className="menu-index">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="menu-name">{item}</span>
                        <span className="menu-arrow" aria-hidden="true">→</span>
                      </button>
                    </motion.li>
                  ))}
                </ol>
              </motion.nav>

              <div className="menu-footer">
                <span>© 2026 PIXORA</span>
                <span className="footer-link">Політика конфіденційності</span>
                <span className="footer-link">Cookie</span>
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
