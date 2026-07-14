"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const navigationItems = [
  { label: "Головна", href: "/" },
  { label: "Проєкти", href: "/projects" },
  { label: "Про мене", href: "/#about" },
  { label: "Контакти", href: "/#contact" },
];

export function Brand() {
  return (
    <Link className="brand" href="/" aria-label="PIXORA — на головну">
      <span className="brand-mark" aria-hidden="true" />
      <span>PIXORA</span>
    </Link>
  );
}

export function MenuButton({
  open,
  onOpen,
}: {
  open: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      className="menu-button"
      type="button"
      aria-expanded={open}
      aria-controls="main-menu"
      onClick={onOpen}
    >
      <span aria-hidden="true">+</span> Меню
    </button>
  );
}

export function ModalMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="menu-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.2 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
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
                onClick={onClose}
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
                {navigationItems.map((item, index) => {
                  const current =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);

                  return (
                    <motion.li
                      key={item.label}
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
                      <Link
                        href={item.href}
                        className={current ? "is-current" : undefined}
                        aria-current={current ? "page" : undefined}
                        onClick={onClose}
                      >
                        <span className="menu-index">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="menu-name">{item.label}</span>
                        <span className="menu-arrow" aria-hidden="true">
                          →
                        </span>
                      </Link>
                    </motion.li>
                  );
                })}
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
  );
}
