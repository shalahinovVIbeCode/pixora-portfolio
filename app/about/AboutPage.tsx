"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import type { IconType } from "react-icons";
import {
  SiFramer,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { Brand, MenuButton, ModalMenu } from "../components/SiteChrome";
import { PreferenceControls, usePreferences } from "../components/Preferences";

type Benefit = {
  number: string;
  title: string;
  description: string;
};

type FitColumn = {
  number: string;
  label: string;
  title: string;
  description: string;
  items: readonly string[];
  tone: "positive" | "neutral";
};

type Technology = {
  name: string;
  detail: string;
  icon: IconType;
};

const benefits = [
  {
    number: "01",
    title: "Один контакт",
    description:
      "Ви говорите напряму з людиною, яка проєктує, пише код і відповідає за результат.",
  },
  {
    number: "02",
    title: "Цілісне рішення",
    description:
      "Структура, дизайн, розробка та інтеграції працюють як одна система, а не окремі шматки.",
  },
  {
    number: "03",
    title: "Швидкі рішення",
    description:
      "Менше передач між ролями. Питання вирішуються там, де виникають, без зайвих кіл погодження.",
  },
  {
    number: "04",
    title: "Особиста відповідальність",
    description:
      "Я веду проєкт від першої розмови до запуску й не ховаюся за процесами або командою.",
  },
] as const satisfies readonly Benefit[];

const fitColumns = [
  {
    number: "A",
    label: "Підійду",
    title: "Коли потрібен партнер, а не виконавець задач",
    description:
      "Найкраще працюю з власниками бізнесу й командами, які хочуть швидко дійти до працюючого продукту.",
    items: [
      "Потрібен сайт або продукт під ключ",
      "Цінуєте прямий контакт і швидкі рішення",
      "Готові фокусуватися на результаті",
    ],
    tone: "positive",
  },
  {
    number: "B",
    label: "Не підійду",
    title: "Коли процес важливіший за сам результат",
    description:
      "Не беру проєкти, де відповідальність розмита, а більшість часу йде на внутрішні погодження.",
    items: [
      "Потрібна велика команда під корпоративний процес",
      "Немає людини, яка приймає фінальні рішення",
      "Очікується робота без чіткої зони відповідальності",
    ],
    tone: "neutral",
  },
] as const satisfies readonly FitColumn[];

const technologies = [
  { name: "Next.js", detail: "Web platform", icon: SiNextdotjs },
  { name: "React", detail: "Interfaces", icon: SiReact },
  { name: "TypeScript", detail: "Reliable code", icon: SiTypescript },
  { name: "Tailwind CSS", detail: "UI systems", icon: SiTailwindcss },
  { name: "Framer Motion", detail: "Motion", icon: SiFramer },
  { name: "Node.js", detail: "Server logic", icon: SiNodedotjs },
  { name: "PostgreSQL", detail: "Data", icon: SiPostgresql },
  { name: "Vercel", detail: "Delivery", icon: SiVercel },
] as const satisfies readonly Technology[];

const benefitsEn = [
  { number: "01", title: "One contact", description: "You speak directly with the person who designs, codes, and owns the result." },
  { number: "02", title: "One solution", description: "Structure, design, development, and integrations work as one coherent system." },
  { number: "03", title: "Faster decisions", description: "Fewer handoffs. Questions are solved where they appear, without extra approval loops." },
  { number: "04", title: "Personal ownership", description: "I lead the project from the first conversation to launch and stay accountable." },
] as const satisfies readonly Benefit[];

const fitColumnsEn = [
  {
    number: "A",
    label: "Good fit",
    title: "When you need a partner, not a task executor",
    description: "I work best with founders and teams who want to reach a working product quickly.",
    items: ["You need a website or product end to end", "You value direct contact and quick decisions", "You are ready to focus on the result"],
    tone: "positive",
  },
  {
    number: "B",
    label: "Not a fit",
    title: "When process matters more than the result",
    description: "I do not take projects where ownership is unclear and most time goes into internal approvals.",
    items: ["You need a large team for a corporate process", "No one owns the final decision", "The work has no clear responsibility boundary"],
    tone: "neutral",
  },
] as const satisfies readonly FitColumn[];

const aboutCopy = {
  uk: {
    about: "Про мене", title: "Один розробник.", titleAccent: "Від ідеї до запуску.",
    lead: "Мене звати Дмитро. PIXORA — моя незалежна студія цифрових продуктів. Я особисто проходжу весь шлях: від структури й дизайну до коду, інтеграцій та запуску.",
    note: "Один фокус. Одна відповідальність. Один цілісний результат.",
    role: "Роль", founder: "Засновник PIXORA", location: "Локація", locationValue: "Україна · UTC+3", status: "Статус", open: "Відкритий до проєктів",
    approach: "Підхід", soloTitle: "Чому я працюю один",
    soloOne: "Цифровий продукт втрачає цілісність, коли стратегія, дизайн і код живуть у різних командах. Я поєдную ці ролі, щоб рішення не губилися між етапами.",
    soloTwo: "Це не означає роботу без системи. Навпаки: менше зайвих передач, коротший шлях до рішення й прозора відповідальність за кожен результат.",
    quote: "Не продаю години команди. Збираю працюючий продукт і доводжу його до запуску.",
    result: "Результат", benefitsTitle: "Що ви отримуєте", compatibility: "Сумісність", fitTitle: "Кому я підійду / не підійду",
    stack: "Стек", stackTitle: "Інструменти, які допомагають запускати", next: "Наступний крок", task: "Є задача?",
    taskLead: "Опишіть контекст. Запропоную реалістичний шлях до запуску.", write: "Написати", projects: "Переглянути проєкти", privacy: "Політика конфіденційності",
  },
  en: {
    about: "About", title: "One developer.", titleAccent: "From idea to launch.",
    lead: "I’m Dmytro. PIXORA is my independent digital product studio. I personally handle the full path: structure, design, code, integrations, and launch.",
    note: "One focus. One responsibility. One coherent result.",
    role: "Role", founder: "PIXORA founder", location: "Location", locationValue: "Ukraine · UTC+3", status: "Status", open: "Open to projects",
    approach: "Approach", soloTitle: "Why I work solo",
    soloOne: "A digital product loses coherence when strategy, design, and code live in separate teams. I combine these roles so decisions do not disappear between stages.",
    soloTwo: "This does not mean working without a system. It means fewer handoffs, a shorter path to decisions, and clear ownership of every result.",
    quote: "I do not sell team hours. I build a working product and take it to launch.",
    result: "Result", benefitsTitle: "What you get", compatibility: "Compatibility", fitTitle: "Who I’m a fit for / not a fit for",
    stack: "Stack", stackTitle: "Tools that help me launch", next: "Next step", task: "Have a task?",
    taskLead: "Share the context. I’ll suggest a realistic path to launch.", write: "Contact me", projects: "View projects", privacy: "Privacy policy",
  },
} as const;

function SectionLabel({ number, children }: { number: string; children: string }) {
  return (
    <p className="section-eyebrow">
      <span>{number}</span> {children}
    </p>
  );
}

function AboutSculpture({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <motion.div
      className="about-sculpture"
      animate={
        reduceMotion
          ? undefined
          : {
              y: [0, -6, 0],
              rotate: [0, 0.2, 0],
            }
      }
      transition={{
        duration: 8,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    >
      <svg
        viewBox="0 0 760 620"
        role="img"
        aria-label="Мінімалістична чорно-біла 3D-композиція PIXORA"
      >
        <path
          className="sculpture-ground"
          d="M111 485 367 348 650 470 392 604Z"
        />
        <path className="sculpture-line" d="M111 485 392 604 650 470" />
        <path className="sculpture-line" d="M202 436 483 555" />
        <path className="sculpture-line" d="M290 389 571 509" />
        <path className="sculpture-line" d="M392 604 392 350" />

        <ellipse
          className="sculpture-orbit sculpture-orbit-back"
          cx="390"
          cy="300"
          rx="252"
          ry="94"
          transform="rotate(-11 390 300)"
        />

        <g className="sculpture-cube">
          <path className="cube-top" d="M272 219 405 146 534 204 401 279Z" />
          <path className="cube-side" d="M401 279 534 204 534 370 401 448Z" />
          <path className="cube-front" d="M272 219 401 279 401 448 272 388Z" />
          <path className="cube-cut" d="M308 265 369 293 369 367 308 340Z" />
        </g>

        <g className="sculpture-sphere">
          <circle cx="516" cy="153" r="74" />
          <path d="M444 156c39 20 99 18 144-7" />
          <path d="M481 88c-4 43 5 96 37 137" />
          <ellipse cx="516" cy="153" rx="37" ry="73" />
        </g>

        <ellipse
          className="sculpture-orbit sculpture-orbit-front"
          cx="390"
          cy="300"
          rx="252"
          ry="94"
          transform="rotate(-11 390 300)"
        />

        <g className="sculpture-tile" transform="rotate(-14 180 278)">
          <rect x="112" y="224" width="136" height="108" rx="8" />
          <path d="M134 251h63M134 273h88M134 295h48" />
          <circle cx="220" cy="297" r="9" />
        </g>

        <circle className="sculpture-dot" cx="621" cy="391" r="18" />
        <circle className="sculpture-dot-outline" cx="621" cy="391" r="31" />
      </svg>
      <span className="sculpture-code">PIXORA / OBJECT 01</span>
    </motion.div>
  );
}

export function AboutPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = Boolean(useReducedMotion());
  const { language } = usePreferences();
  const copy = aboutCopy[language];
  const localizedBenefits = language === "uk" ? benefits : benefitsEn;
  const localizedFitColumns = language === "uk" ? fitColumns : fitColumnsEn;
  const duration = reduceMotion ? 0 : 0.58;
  const revealY = reduceMotion ? 0 : 12;

  return (
    <main className="about-page" id="about-top">
      <header className="about-topbar">
        <Brand />
        <MenuButton open={menuOpen} onOpen={() => setMenuOpen(true)} />
        <PreferenceControls />
      </header>

      <div className="about-content">
        <motion.section
          className="about-hero"
          initial={{ opacity: 0, y: revealY }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="about-hero-copy">
            <SectionLabel number="01">{copy.about}</SectionLabel>
            <h1>
              <span className="about-title-primary">{copy.title}</span>
              <br />
              <span>{copy.titleAccent}</span>
            </h1>
            <p className="about-lead">{copy.lead}</p>
            <p className="about-note">{copy.note}</p>
          </div>

          <div className="about-hero-visual">
            <AboutSculpture reduceMotion={reduceMotion} />
            <div className="founder-card">
              <div>
                <span>{copy.role}</span>
                <strong>{copy.founder}</strong>
              </div>
              <div>
                <span>{copy.location}</span>
                <strong>{copy.locationValue}</strong>
              </div>
              <div>
                <span>{copy.status}</span>
                <strong className="founder-status">
                  <i aria-hidden="true" /> {copy.open}
                </strong>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="solo-section"
          initial={{ opacity: 0, y: revealY }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.22 }}
          transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
          aria-labelledby="solo-title"
        >
          <div>
            <SectionLabel number="02">{copy.approach}</SectionLabel>
            <h2 id="solo-title">{copy.soloTitle}</h2>
          </div>
          <div className="solo-copy">
            <p>{copy.soloOne}</p>
            <p>{copy.soloTwo}</p>
            <blockquote>{copy.quote}</blockquote>
          </div>
        </motion.section>

        <section className="benefits-section" aria-labelledby="benefits-title">
          <motion.div
            className="about-section-heading"
            initial={{ opacity: 0, y: revealY }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
          >
            <SectionLabel number="03">{copy.result}</SectionLabel>
            <h2 id="benefits-title">{copy.benefitsTitle}</h2>
          </motion.div>

          <div className="benefits-grid">
            {localizedBenefits.map((benefit, index) => (
              <motion.article
                className="benefit-card"
                key={benefit.title}
                initial={{ opacity: 0, y: revealY }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.28 }}
                transition={{
                  duration,
                  delay: reduceMotion ? 0 : index * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -3,
                        transition: { duration: 0.2 },
                      }
                }
              >
                <span>{benefit.number}</span>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <motion.section
          className="fit-section"
          initial={{ opacity: 0, y: revealY }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
          aria-labelledby="fit-title"
        >
          <div className="about-section-heading fit-heading">
            <SectionLabel number="04">{copy.compatibility}</SectionLabel>
            <h2 id="fit-title">{copy.fitTitle}</h2>
          </div>

          <div className="fit-grid">
            {localizedFitColumns.map((column) => (
              <article
                className={`fit-card fit-card-${column.tone}`}
                key={column.label}
              >
                <div className="fit-card-head">
                  <span>{column.number}</span>
                  <p>{column.label}</p>
                </div>
                <h3>{column.title}</h3>
                <p className="fit-description">{column.description}</p>
                <ul>
                  {column.items.map((item, index) => (
                    <li key={item}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="about-stack-section"
          initial={{ opacity: 0, y: revealY }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
          aria-labelledby="about-stack-title"
        >
          <div className="about-section-heading stack-heading">
            <SectionLabel number="05">{copy.stack}</SectionLabel>
            <h2 id="about-stack-title">{copy.stackTitle}</h2>
          </div>
          <div className="about-stack-grid">
            {technologies.map((technology) => {
              const TechnologyIcon = technology.icon;
              return (
                <div className="about-stack-item" key={technology.name}>
                  <TechnologyIcon aria-hidden="true" />
                  <div>
                    <strong>{technology.name}</strong>
                    <span>{technology.detail}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>

        <motion.section
          className="about-cta"
          initial={{ opacity: 0, y: revealY }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <SectionLabel number="06">{copy.next}</SectionLabel>
            <h2>{copy.task}</h2>
            <p>{copy.taskLead}</p>
          </div>
          <div className="about-cta-actions">
            <a
              className="action-button action-button-primary"
              href="mailto:dudnikovone@gmail.com"
            >
              {copy.write} <span aria-hidden="true">↗</span>
            </a>
            <Link
              className="action-button action-button-secondary"
              href="/projects"
            >
              {copy.projects} <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </motion.section>
      </div>

      <footer className="site-footer about-footer">
        <span>© 2026 PIXORA</span>
        <span className="footer-link">{copy.privacy}</span>
        <span className="footer-link">Cookie</span>
      </footer>

      <ModalMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </main>
  );
}
