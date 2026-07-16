"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  PiArrowUpRight,
  PiChartBar,
  PiCube,
  PiLightning,
  PiTarget,
  PiX,
} from "react-icons/pi";
import {
  SiFramer,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import LogoLoop, { type LogoItem } from "../components/LogoLoop";
import { Brand, MenuButton, ModalMenu } from "../components/SiteChrome";
import { PreferenceControls, usePreferences, type Language } from "../components/Preferences";

type LocalizedText = Record<Language, string>;
type ProjectVariant = "tracker" | "medtech" | "travel" | "tasks";

type ProjectCase = {
  number: string;
  variant: ProjectVariant;
  title: string;
  description: LocalizedText;
  stack: readonly string[];
  task: LocalizedText;
  approach: LocalizedText;
  result: LocalizedText;
  stats: readonly {
    value: string;
    label: LocalizedText;
  }[];
};

const technologyLogos = [
  {
    node: (
      <span className="stack-logo">
        <SiNextdotjs aria-hidden="true" />
        <span>Next.js</span>
      </span>
    ),
    title: "Next.js",
  },
  {
    node: (
      <span className="stack-logo">
        <SiReact aria-hidden="true" />
        <span>React</span>
      </span>
    ),
    title: "React",
  },
  {
    node: (
      <span className="stack-logo">
        <SiTypescript aria-hidden="true" />
        <span>TypeScript</span>
      </span>
    ),
    title: "TypeScript",
  },
  {
    node: (
      <span className="stack-logo">
        <SiTailwindcss aria-hidden="true" />
        <span>Tailwind CSS</span>
      </span>
    ),
    title: "Tailwind CSS",
  },
  {
    node: (
      <span className="stack-logo">
        <SiFramer aria-hidden="true" />
        <span>Framer Motion</span>
      </span>
    ),
    title: "Framer Motion",
  },
  {
    node: (
      <span className="stack-logo">
        <SiVercel aria-hidden="true" />
        <span>Vercel</span>
      </span>
    ),
    title: "Vercel",
  },
] as const satisfies readonly LogoItem[];

const projects = [
  {
    number: "01",
    variant: "tracker",
    title: "Nova Tracker",
    description: { uk: "Вебплатформа для моніторингу та аналітики логістики.", en: "A web platform for logistics monitoring and analytics." },
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    task: {
      uk: "Створити зрозумілу вебплатформу для моніторингу відправлень і ключових логістичних показників у реальному часі.",
      en: "Build a clear web platform for monitoring shipments and key logistics metrics in real time.",
    },
    approach: {
      uk: "Побудували модульну структуру, спростили навігацію та зібрали ключові показники в одному спокійному dashboard.",
      en: "Built a modular structure, simplified navigation, and brought key metrics into one focused dashboard.",
    },
    result: {
      uk: "Команда швидше бачить затримки, контролює статуси й витрачає менше часу на ручне зведення даних.",
      en: "The team spots delays faster, controls statuses, and spends less time compiling data manually.",
    },
    stats: [
      { value: "3+", label: { uk: "місяці", en: "months" } },
      { value: "4", label: { uk: "етапи", en: "stages" } },
      { value: "<1s", label: { uk: "FCP", en: "FCP" } },
      { value: "95", label: { uk: "Lighthouse", en: "Lighthouse" } },
    ],
  },
  {
    number: "02",
    variant: "medtech",
    title: "MedTech",
    description: { uk: "Сайт для постачальника медичного обладнання та рішень.", en: "A website for a medical equipment and solutions supplier." },
    stack: ["React", "Vite", "TypeScript", "Framer Motion"],
    task: {
      uk: "Оновити цифрову присутність постачальника та зробити складний каталог медичного обладнання простим для клінік.",
      en: "Refresh the supplier’s digital presence and make a complex medical equipment catalog easy for clinics.",
    },
    approach: {
      uk: "Систематизували категорії, скоротили шлях до консультації та побудували стриману візуальну мову навколо продукту.",
      en: "Organized categories, shortened the path to consultation, and built a restrained visual language around the product.",
    },
    result: {
      uk: "Каталог читається швидше, ключові характеристики видно одразу, а запит на обладнання займає кілька кроків.",
      en: "The catalog scans faster, key specifications are immediate, and an equipment request takes only a few steps.",
    },
    stats: [
      { value: "28", label: { uk: "категорій", en: "categories" } },
      { value: "2.1s", label: { uk: "завантаження", en: "load time" } },
      { value: "92", label: { uk: "Performance", en: "Performance" } },
      { value: "AA", label: { uk: "доступність", en: "accessibility" } },
    ],
  },
  {
    number: "03",
    variant: "travel",
    title: "Travel Time",
    description: { uk: "Мобільний застосунок для планування подорожей.", en: "A mobile app for planning trips and routes." },
    stack: ["React Native", "Expo", "TypeScript", "Mapbox"],
    task: {
      uk: "Об’єднати маршрут, місця, бронювання та нотатки в одному мобільному сценарії без перевантажених екранів.",
      en: "Combine routes, places, bookings, and notes in one mobile flow without overloaded screens.",
    },
    approach: {
      uk: "Побудували планування навколо часової лінії, додали швидкі дії та залишили на кожному екрані лише потрібний контекст.",
      en: "Built planning around a timeline, added quick actions, and kept only essential context on each screen.",
    },
    result: {
      uk: "Подорож можна зібрати й змінити на ходу; основні деталі маршруту залишаються доступними офлайн.",
      en: "A trip can be assembled and changed on the go, while essential route details stay available offline.",
    },
    stats: [
      { value: "12", label: { uk: "екранів", en: "screens" } },
      { value: "2", label: { uk: "платформи", en: "platforms" } },
      { value: "<80ms", label: { uk: "відгук UI", en: "UI response" } },
      { value: "4.8", label: { uk: "UX оцінка", en: "UX score" } },
    ],
  },
  {
    number: "04",
    variant: "tasks",
    title: "Task Manager",
    description: { uk: "Вебзастосунок для керування задачами та командною роботою.", en: "A web app for task management and team collaboration." },
    stack: ["Next.js", "Tailwind CSS", "PostgreSQL", "Zustand"],
    task: {
      uk: "Дати невеликій команді спільний простір для задач, статусів і пріоритетів без складного корпоративного інтерфейсу.",
      en: "Give a small team one place for tasks, statuses, and priorities without a complex enterprise interface.",
    },
    approach: {
      uk: "Зібрали швидку таблицю задач, чіткі фільтри та мінімальну систему ролей із фокусом на щоденній роботі.",
      en: "Built a fast task table, clear filters, and a minimal role system focused on everyday work.",
    },
    result: {
      uk: "Менше втрат контексту між повідомленнями, прозорий прогрес і швидший розподіл задач усередині команди.",
      en: "Less context lost in messages, clearer progress, and faster task allocation across the team.",
    },
    stats: [
      { value: "6", label: { uk: "ролей", en: "roles" } },
      { value: "9", label: { uk: "станів", en: "states" } },
      { value: "0.4s", label: { uk: "пошук", en: "search" } },
      { value: "94", label: { uk: "Lighthouse", en: "Lighthouse" } },
    ],
  },
] as const satisfies readonly ProjectCase[];

const skills = [
  {
    code: "UI",
    title: { uk: "UI/UX сайти", en: "UI/UX websites" },
    detail: { uk: "Landing pages · Корпоративні сайти · Портфоліо", en: "Landing pages · Corporate sites · Portfolios" },
    level: 0.95,
    percent: "95%",
  },
  {
    code: "</>",
    title: { uk: "Вебзастосунки", en: "Web applications" },
    detail: { uk: "Next.js · React · TypeScript · Tailwind CSS", en: "Next.js · React · TypeScript · Tailwind CSS" },
    level: 0.9,
    percent: "90%",
  },
  {
    code: "A",
    title: { uk: "Автоматизація", en: "Automation" },
    detail: { uk: "Скрипти · Внутрішні інструменти · Робочі процеси", en: "Scripts · Internal tools · Workflows" },
    level: 0.8,
    percent: "80%",
  },
  {
    code: "API",
    title: { uk: "Інтеграції", en: "Integrations" },
    detail: { uk: "API · Платіжні системи · CRM · Сторонні сервіси", en: "API · Payments · CRM · Third-party services" },
    level: 0.85,
    percent: "85%",
  },
  {
    code: "APP",
    title: { uk: "Мобільні застосунки", en: "Mobile applications" },
    detail: { uk: "React Native · Expo · Кросплатформні рішення", en: "React Native · Expo · Cross-platform solutions" },
    level: 0.75,
    percent: "75%",
  },
];

const projectsCopy = {
  uk: {
    section: "Проєкти",
    title: "Що я зробив.",
    titleAccent: "Реальні кейси.",
    lead: "Сайти, застосунки та цифрові продукти, створені від ідеї до запуску.",
    cases: "Кейси PIXORA",
    stack: "Стек",
    skills: "Навички",
    skillsTitleOne: "Де можу",
    skillsTitleTwo: "закрити задачу",
    skillsLead: "Підбираю інструменти під задачу. Працюю там, де беру відповідальність за результат.",
    task: "Є задача?",
    taskLead: "Опишіть вашу ідею — запропоную рішення та план дій.",
    write: "Написати мені",
    discuss: "Обговорити проєкт",
    techTitle: "Технології, з якими працюю",
    techLabel: "Основний стек PIXORA",
    privacy: "Політика конфіденційності",
    case: "Кейс",
    closeCase: "Закрити кейс",
    openCase: "Відкрити кейс",
    caseTask: "Задача",
    caseApproach: "Підхід",
    caseStack: "Стек",
    caseResult: "Результат",
    liveVersion: "Відкрити живу версію",
    viewProject: "Переглянути проєкт",
    placeholderNote: "Посилання з’явиться після публікації кейсу.",
  },
  en: {
    section: "Projects",
    title: "What I built.",
    titleAccent: "Real cases.",
    lead: "Websites, applications, and digital products built from idea to launch.",
    cases: "PIXORA case studies",
    stack: "Stack",
    skills: "Skills",
    skillsTitleOne: "Where I can",
    skillsTitleTwo: "solve the task",
    skillsLead: "I select tools for the task and work where I can own the result.",
    task: "Have a task?",
    taskLead: "Describe your idea — I’ll suggest a solution and an action plan.",
    write: "Contact me",
    discuss: "Discuss project",
    techTitle: "Technologies I work with",
    techLabel: "PIXORA core stack",
    privacy: "Privacy policy",
    case: "Case",
    closeCase: "Close case",
    openCase: "Open case",
    caseTask: "Task",
    caseApproach: "Approach",
    caseStack: "Stack",
    caseResult: "Result",
    liveVersion: "Open live version",
    viewProject: "View project",
    placeholderNote: "Links will appear when the case is published.",
  },
} as const;

function ProjectPreview({
  variant,
  title,
  language,
}: {
  variant: ProjectVariant;
  title: string;
  language: Language;
}) {
  return (
    <div
      className={`project-preview preview-${variant}`}
      role="img"
      aria-label={language === "uk" ? `Плейсхолдер прев’ю проєкту ${title}` : `Project preview placeholder for ${title}`}
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
            <strong>{language === "uk" ? "Обладнання для сучасних клінік" : "Equipment for modern clinics"}</strong>
            <i />
            <i />
            <button tabIndex={-1}>{language === "uk" ? "Детальніше" : "Explore"}</button>
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
            <b>{language === "uk" ? "Маршрут" : "Route"}</b>
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
            <strong>{language === "uk" ? "Мої завдання" : "My tasks"}</strong>
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

function CaseStudyModal({
  project,
  language,
  reduceMotion,
  onClose,
}: {
  project: ProjectCase | null;
  language: Language;
  reduceMotion: boolean;
  onClose: () => void;
}) {
  const copy = projectsCopy[language];

  useEffect(() => {
    if (!project) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, project]);

  const detailRows = project
    ? [
        { label: copy.caseTask, body: project.task[language], icon: PiTarget },
        { label: copy.caseApproach, body: project.approach[language], icon: PiLightning },
        { label: copy.caseStack, body: project.stack.join(", "), icon: PiCube },
        { label: copy.caseResult, body: project.result[language], icon: PiChartBar },
      ]
    : [];

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="case-study-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.24 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.article
            className="case-study-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`case-title-${project.number}`}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 24, scale: reduceMotion ? 1 : 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : 16, scale: reduceMotion ? 1 : 0.99 }}
            transition={{ duration: reduceMotion ? 0 : 0.42, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              className="case-study-close"
              type="button"
              aria-label={copy.closeCase}
              onClick={onClose}
              autoFocus
            >
              <PiX aria-hidden="true" />
            </button>

            <header className="case-study-header">
              <p className="section-eyebrow"><span>{project.number}</span> {copy.case}</p>
              <h2 id={`case-title-${project.number}`}>{project.title}</h2>
              <p>{project.description[language]}</p>
            </header>

            <div className="case-study-preview">
              <ProjectPreview variant={project.variant} title={project.title} language={language} />
            </div>

            <div className="case-study-details">
              {detailRows.map((row) => {
                const DetailIcon = row.icon;
                return (
                  <section className="case-study-detail" key={row.label}>
                    <span className="case-study-detail-icon" aria-hidden="true"><DetailIcon /></span>
                    <div>
                      <h3>{row.label}</h3>
                      <p>{row.body}</p>
                    </div>
                  </section>
                );
              })}
            </div>

            <dl className="case-study-stats">
              {project.stats.map((stat) => (
                <div key={stat.label.uk}>
                  <dt>{stat.value}</dt>
                  <dd>{stat.label[language]}</dd>
                </div>
              ))}
            </dl>

            <ul className="case-study-tags" aria-label={`${copy.caseStack} ${project.title}`}>
              {project.stack.map((technology) => <li key={technology}>{technology}</li>)}
            </ul>

            <div className="case-study-actions">
              <button className="action-button action-button-primary" type="button" disabled aria-describedby="case-placeholder-note">
                {copy.liveVersion} <PiArrowUpRight aria-hidden="true" />
              </button>
              <button className="action-button action-button-secondary" type="button" disabled aria-describedby="case-placeholder-note">
                {copy.viewProject} <PiArrowUpRight aria-hidden="true" />
              </button>
              <small id="case-placeholder-note">{copy.placeholderNote}</small>
            </div>

            <div className="case-study-flower" aria-hidden="true">
              <Image src="/pixora-peony.png" alt="" fill sizes="210px" />
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ProjectsPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectCase | null>(null);
  const reduceMotion = useReducedMotion();
  const { language, theme } = usePreferences();
  const copy = projectsCopy[language];
  const duration = reduceMotion ? 0 : 0.55;

  return (
    <main className="projects-page" id="projects-top">
      <header className="projects-topbar">
        <Brand />
        <MenuButton open={menuOpen} onOpen={() => setMenuOpen(true)} />
        <PreferenceControls />
      </header>

      <div className="projects-content">
        <motion.section
          className="projects-intro"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="section-eyebrow">
            <span>01</span> {copy.section}
          </p>
          <h1>
            {copy.title}
            <br />
            <span>{copy.titleAccent}</span>
          </h1>
          <p className="projects-lead">
            {copy.lead}
          </p>
        </motion.section>

        <section className="projects-grid" aria-label={copy.cases}>
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
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -5,
                      transition: {
                        duration: 0.2,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    }
              }
            >
              <button
                className="project-card-open"
                type="button"
                aria-label={`${copy.openCase}: ${project.title}`}
                onClick={() => setSelectedProject(project)}
              />
              <span className="project-number">{project.number}</span>
              <ProjectPreview
                variant={project.variant}
                title={project.title}
                language={language}
              />
              <div className="project-card-copy">
                <h2>{project.title}</h2>
                <p>{project.description[language]}</p>
                <ul aria-label={`${copy.stack} ${project.title}`}>
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
              <span>02</span> {copy.skills}
            </p>
            <h2 id="skills-title">
              {copy.skillsTitleOne}
              <br />
              {copy.skillsTitleTwo}
            </h2>
            <p>
              {copy.skillsLead}
            </p>
          </div>

          <div className="skills-list">
            {skills.map((skill, index) => (
              <div className="skill-row" key={skill.code}>
                <span className="skill-icon" aria-hidden="true">
                  {skill.code}
                </span>
                <div className="skill-copy">
                  <h3>{skill.title[language]}</h3>
                  <p>{skill.detail[language]}</p>
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
            <h2>{copy.task}</h2>
            <p>{copy.taskLead}</p>
          </div>
          <div className="projects-cta-actions">
            <a
              className="action-button action-button-primary"
              href="mailto:shalahinov.ads@gmail.com"
            >
              {copy.write} <span aria-hidden="true">↗</span>
            </a>
            <a
              className="action-button action-button-secondary"
              href="https://t.me/MalbaroWFP"
              target="_blank"
              rel="noreferrer"
            >
              {copy.discuss} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </motion.section>

        <motion.section
          className="stack-loop-section"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
          aria-labelledby="stack-loop-title"
        >
          <div className="stack-loop-heading">
            <p className="section-eyebrow">
              <span>03</span> {copy.stack}
            </p>
            <h2 id="stack-loop-title">{copy.techTitle}</h2>
          </div>
          <LogoLoop
            logos={technologyLogos}
            speed={reduceMotion ? 0 : 42}
            direction="left"
            logoHeight={22}
            gap={14}
            hoverSpeed={reduceMotion ? 0 : 10}
            scaleOnHover={!reduceMotion}
            fadeOut
            fadeOutColor={theme === "dark" ? "#151514" : "#ffffff"}
            ariaLabel={copy.techLabel}
          />
        </motion.section>
      </div>

      <footer className="site-footer projects-footer">
        <span>© 2026 PIXORA</span>
        <span className="footer-link">{copy.privacy}</span>
        <span className="footer-link">Cookie</span>
      </footer>

      <ModalMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <CaseStudyModal
        project={selectedProject}
        language={language}
        reduceMotion={Boolean(reduceMotion)}
        onClose={() => setSelectedProject(null)}
      />
    </main>
  );
}
