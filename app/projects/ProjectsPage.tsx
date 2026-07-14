"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Brand, MenuButton, ModalMenu } from "../components/SiteChrome";

const projects = [
  {
    number: "01",
    variant: "tracker",
    title: "Nova Tracker",
    description: "Вебплатформа для моніторингу та аналітики логістики.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    number: "02",
    variant: "medtech",
    title: "MedTech",
    description: "Сайт для постачальника медичного обладнання та рішень.",
    stack: ["React", "Vite", "TypeScript"],
  },
  {
    number: "03",
    variant: "travel",
    title: "Travel Time",
    description: "Мобільний застосунок для планування подорожей.",
    stack: ["React Native", "Expo", "TypeScript"],
  },
  {
    number: "04",
    variant: "tasks",
    title: "Task Manager",
    description: "Вебзастосунок для керування задачами та командною роботою.",
    stack: ["Next.js", "Tailwind CSS", "PostgreSQL"],
  },
];

const skills = [
  {
    code: "UI",
    title: "UI/UX сайти",
    detail: "Landing pages · Корпоративні сайти · Портфоліо",
    level: 0.95,
    percent: "95%",
  },
  {
    code: "</>",
    title: "Вебзастосунки",
    detail: "Next.js · React · TypeScript · Tailwind CSS",
    level: 0.9,
    percent: "90%",
  },
  {
    code: "A",
    title: "Автоматизація",
    detail: "Скрипти · Внутрішні інструменти · Робочі процеси",
    level: 0.8,
    percent: "80%",
  },
  {
    code: "API",
    title: "Інтеграції",
    detail: "API · Платіжні системи · CRM · Сторонні сервіси",
    level: 0.85,
    percent: "85%",
  },
  {
    code: "APP",
    title: "Мобільні застосунки",
    detail: "React Native · Expo · Кросплатформні рішення",
    level: 0.75,
    percent: "75%",
  },
];

function ProjectPreview({
  variant,
  title,
}: {
  variant: string;
  title: string;
}) {
  return (
    <div
      className={`project-preview preview-${variant}`}
      role="img"
      aria-label={`Плейсхолдер прев’ю проєкту ${title}`}
    >
      <div className="preview-chrome">
        <span />
        <span />
        <span />
      </div>

      {variant === "tracker" && (
        <div className="tracker-ui">
          <div className="tracker-sidebar">
            <b>N</b>
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="tracker-content">
            <div className="preview-title-row">
              <strong>Nova Tracker</strong>
              <span />
            </div>
            <div className="tracker-metrics">
              <i />
              <i />
              <i />
            </div>
            <div className="tracker-chart">
              <span style={{ height: "32%" }} />
              <span style={{ height: "48%" }} />
              <span style={{ height: "42%" }} />
              <span style={{ height: "68%" }} />
              <span style={{ height: "61%" }} />
              <span style={{ height: "84%" }} />
            </div>
          </div>
        </div>
      )}

      {variant === "medtech" && (
        <div className="medtech-ui">
          <div className="medtech-copy">
            <small>MED / TECH</small>
            <strong>Обладнання для сучасних клінік</strong>
            <i />
            <i />
            <button tabIndex={-1}>Детальніше</button>
          </div>
          <div className="medtech-object" aria-hidden="true">
            <span />
            <i />
            <i />
          </div>
        </div>
      )}

      {variant === "travel" && (
        <div className="travel-ui">
          <div className="travel-phone travel-phone-back">
            <b>Маршрут</b>
            <i />
            <i />
            <i />
          </div>
          <div className="travel-phone travel-phone-front">
            <b>Travel Time</b>
            <div />
            <i />
            <i />
          </div>
        </div>
      )}

      {variant === "tasks" && (
        <div className="tasks-ui">
          <div className="tasks-sidebar">
            <b>T</b>
            <i />
            <i />
            <i />
          </div>
          <div className="tasks-table">
            <strong>Мої завдання</strong>
            {[0, 1, 2, 3].map((row) => (
              <div key={row}>
                <span />
                <i />
                <em />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function ProjectsPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const duration = reduceMotion ? 0 : 0.55;

  return (
    <main className="projects-page" id="projects-top">
      <header className="projects-topbar">
        <Brand />
        <MenuButton open={menuOpen} onOpen={() => setMenuOpen(true)} />
      </header>

      <div className="projects-content">
        <motion.section
          className="projects-intro"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="section-eyebrow">
            <span>01</span> Проєкти
          </p>
          <h1>
            Що я зробив.
            <br />
            <span>Реальні кейси.</span>
          </h1>
          <p className="projects-lead">
            Сайти, застосунки та цифрові продукти, створені від ідеї до
            запуску.
          </p>
        </motion.section>

        <section className="projects-grid" aria-label="Кейси PIXORA">
          {projects.map((project, index) => (
            <motion.article
              className="project-card"
              key={project.title}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{
                duration,
                delay: reduceMotion ? 0 : index * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <span className="project-number">{project.number}</span>
              <ProjectPreview
                variant={project.variant}
                title={project.title}
              />
              <div className="project-card-copy">
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                <ul aria-label={`Стек ${project.title}`}>
                  {project.stack.map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </section>

        <motion.section
          className="skills-section"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
          aria-labelledby="skills-title"
        >
          <div className="skills-intro">
            <p className="section-eyebrow">
              <span>02</span> Навички
            </p>
            <h2 id="skills-title">
              Де можу
              <br />
              закрити задачу
            </h2>
            <p>
              Підбираю інструменти під задачу. Працюю там, де беру
              відповідальність за результат.
            </p>
          </div>

          <div className="skills-list">
            {skills.map((skill, index) => (
              <div className="skill-row" key={skill.title}>
                <span className="skill-icon" aria-hidden="true">
                  {skill.code}
                </span>
                <div className="skill-copy">
                  <h3>{skill.title}</h3>
                  <p>{skill.detail}</p>
                </div>
                <div className="skill-meter">
                  <span className="skill-track">
                    <motion.span
                      className="skill-fill"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: skill.level }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.8,
                        delay: reduceMotion ? 0 : index * 0.07,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    />
                  </span>
                  <span>{skill.percent}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="projects-cta"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="cta-flower" aria-hidden="true">
            <Image
              src="/pixora-peony.png"
              alt=""
              fill
              sizes="260px"
            />
          </div>
          <div className="projects-cta-copy">
            <h2>Є задача?</h2>
            <p>Опишіть вашу ідею — запропоную рішення та план дій.</p>
          </div>
          <div className="projects-cta-actions">
            <button
              className="action-button action-button-primary"
              type="button"
              onClick={() => setMenuOpen(true)}
            >
              Написати мені <span aria-hidden="true">↗</span>
            </button>
            <button
              className="action-button action-button-secondary"
              type="button"
              onClick={() => setMenuOpen(true)}
            >
              Обговорити проєкт <span aria-hidden="true">↗</span>
            </button>
          </div>
        </motion.section>
      </div>

      <footer className="site-footer projects-footer">
        <span>© 2026 PIXORA</span>
        <span className="footer-link">Політика конфіденційності</span>
        <span className="footer-link">Cookie</span>
      </footer>

      <ModalMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </main>
  );
}
