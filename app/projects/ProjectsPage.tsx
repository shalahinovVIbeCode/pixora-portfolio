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
type ProjectVariant = "rivnia" | "nova" | "volvo" | "kava" | "tracker" | "medtech" | "travel" | "tasks";

type ProjectCase = {
  number: string;
  variant: ProjectVariant;
  title: string;
  category?: LocalizedText;
  description: LocalizedText;
  previewImage?: string;
  previewAlt?: LocalizedText;
  liveUrl?: string;
  hideActions?: boolean;
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

const projects: readonly ProjectCase[] = [
  {
    number: "01",
    variant: "rivnia",
    title: "RIVNIA BARBERS",
    category: { uk: "Сайт для барбершопу", en: "Barbershop website" },
    description: {
      uk: "Сучасний преміальний сайт барбершопу у Львові з великими заголовками, атмосферними фото, блоками послуг, майстрів і швидким записом.",
      en: "A modern premium website for a Lviv barbershop with bold headlines, atmospheric photography, service and barber sections, and quick booking.",
    },
    previewImage: "/rivnia-barbers-preview.png",
    previewAlt: {
      uk: "Головний екран сайту RIVNIA BARBERS із великим заголовком та фото барбера",
      en: "RIVNIA BARBERS website hero with a bold headline and barber photograph",
    },
    liveUrl: "https://rivnia-barbers.vercel.app/",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    task: {
      uk: "Створити стильний сайт, який передає характер бренду та мотивує записатися.",
      en: "Create a stylish website that communicates the brand character and motivates visitors to book.",
    },
    approach: {
      uk: "Сильна типографіка, темні фото, тепла палітра, просте меню й акцентна CTA-кнопка.",
      en: "Bold typography, dark photography, a warm palette, simple navigation, and a focused CTA button.",
    },
    result: {
      uk: "Адаптивний сайт із плавними анімаціями та зрозумілою навігацією.",
      en: "A responsive website with smooth animations and clear navigation.",
    },
    stats: [
      { value: "Львів", label: { uk: "локація", en: "location" } },
      { value: "4", label: { uk: "ключові блоки", en: "core sections" } },
      { value: "4", label: { uk: "технології", en: "technologies" } },
      { value: "Live", label: { uk: "статус", en: "status" } },
    ],
  },
  {
    number: "02",
    variant: "nova",
    title: "Nova Tracker",
    category: { uk: "Десктопна програма", en: "Desktop application" },
    description: {
      uk: "Десктопна програма для контролю фокусу та продуктивності: відстежує активність у застосунках, показує час за категоріями, задачі й персональні інсайти.",
      en: "A desktop application for focus and productivity that tracks app activity, visualizes time by category, and brings tasks and personal insights together.",
    },
    previewImage: "/nova-tracker-preview.png",
    previewAlt: {
      uk: "Темний dashboard програми Nova Tracker зі статистикою активності та фокус-сесіями",
      en: "Nova Tracker dark dashboard with activity statistics and focus sessions",
    },
    hideActions: true,
    stack: ["Electron", "React", "TypeScript", "Vite"],
    task: {
      uk: "Створити приватний робочий центр, який допомагає бачити, куди йде час, тримати фокус і не перевантажує зайвими метриками.",
      en: "Create a private command center that shows where time goes, supports focus, and avoids overwhelming users with unnecessary metrics.",
    },
    approach: {
      uk: "Темний інтерфейс, яскраві акценти, два основні режими Dashboard і Tasks, наочні графіки та автоматичне відстеження активних програм.",
      en: "A dark interface, vivid accents, focused Dashboard and Tasks modes, clear charts, and automatic active-app tracking.",
    },
    result: {
      uk: "Швидка десктопна програма з єдиним cockpit для активності, фокус-сесій, задач і щоденної статистики.",
      en: "A fast desktop app with one cockpit for activity, focus sessions, tasks, and daily statistics.",
    },
    stats: [
      { value: "Electron", label: { uk: "платформа", en: "platform" } },
      { value: "2", label: { uk: "робочі режими", en: "work modes" } },
      { value: "4", label: { uk: "категорії часу", en: "time categories" } },
      { value: "Focus", label: { uk: "головний сценарій", en: "core flow" } },
    ],
  },
  {
    number: "03",
    variant: "volvo",
    title: "Volvo XC90",
    category: { uk: "Автомобільний промосайт", en: "Automotive showcase" },
    description: {
      uk: "Промосайт Volvo XC90 першого покоління з кінематографічною подачею, великими фото та секціями екстер’єру, інтер’єру, характеристик і безпеки.",
      en: "A cinematic showcase for the first-generation Volvo XC90 with large-scale imagery and focused sections for exterior, interior, specifications, and safety.",
    },
    previewImage: "/volvo-xc90-preview.png",
    previewAlt: {
      uk: "Головний екран промосайту Volvo XC90 з автомобілем на тлі гір",
      en: "Volvo XC90 showcase hero with the car against a mountain landscape",
    },
    liveUrl: "https://volvo-xc90.vercel.app/#home",
    stack: ["Next.js", "TypeScript", "GSAP", "Three.js"],
    task: {
      uk: "Створити емоційну цифрову презентацію XC90, яка передає скандинавський характер моделі та послідовно розкриває її ключові переваги.",
      en: "Create an emotional digital presentation of the XC90 that conveys its Scandinavian character and reveals the model’s key strengths in a clear sequence.",
    },
    approach: {
      uk: "Мінімалістична навігація, повноекранні композиції, стримана типографіка, плавний скролінг, GSAP-переходи та делікатні 3D-акценти.",
      en: "Minimal navigation, full-screen compositions, restrained typography, smooth scrolling, GSAP transitions, and subtle 3D accents.",
    },
    result: {
      uk: "Адаптивний іммерсивний сайт із цілісним storytelling, плавними анімаціями та швидким доступом до ключових розділів автомобіля.",
      en: "A responsive immersive website with cohesive storytelling, smooth motion, and quick access to the vehicle’s key sections.",
    },
    stats: [
      { value: "5", label: { uk: "ключових секцій", en: "core sections" } },
      { value: "4", label: { uk: "технології", en: "technologies" } },
      { value: "3D", label: { uk: "візуальний акцент", en: "visual accent" } },
      { value: "Live", label: { uk: "статус", en: "status" } },
    ],
  },
  {
    number: "04",
    variant: "kava",
    title: "Місто Кава",
    category: { uk: "Сайт specialty-кав’ярні", en: "Specialty coffee website" },
    description: {
      uk: "Атмосферний сайт київської specialty-кав’ярні з великим hero-блоком, меню, історією простору та швидким бронюванням столика.",
      en: "An atmospheric website for a Kyiv specialty coffee shop with a large hero, menu, venue story, and quick table booking.",
    },
    previewImage: "/misto-kava-preview.png",
    previewAlt: {
      uk: "Головний екран сайту Місто Кава з атмосферним фото кав’ярні та великим типографічним заголовком",
      en: "Misto Kava website hero with an atmospheric coffee shop photograph and large editorial headline",
    },
    liveUrl: "https://misto-kava.vercel.app/",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    task: {
      uk: "Створити теплий цифровий образ кав’ярні, який передає атмосферу місця та швидко веде гостя до меню або бронювання.",
      en: "Create a warm digital identity that conveys the venue’s atmosphere and quickly guides guests to the menu or table booking.",
    },
    approach: {
      uk: "Виразна serif-типографіка, тепла палітра, атмосферні фото, м’які анімації, прості CTA та адаптивна навігація.",
      en: "Expressive serif typography, a warm palette, atmospheric photography, soft motion, simple CTAs, and responsive navigation.",
    },
    result: {
      uk: "Адаптивний промосайт із цілісною візуальною мовою, зрозумілим меню та коротким шляхом до бронювання.",
      en: "A responsive promotional website with a cohesive visual language, clear menu, and a short path to booking.",
    },
    stats: [
      { value: "Київ", label: { uk: "локація", en: "location" } },
      { value: "2", label: { uk: "основні CTA", en: "primary CTAs" } },
      { value: "4", label: { uk: "технології", en: "technologies" } },
      { value: "Live", label: { uk: "статус", en: "status" } },
    ],
  },
];

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
  previewImage,
  previewAlt,
}: {
  variant: ProjectVariant;
  title: string;
  language: Language;
  previewImage?: string;
  previewAlt?: LocalizedText;
}) {
  const fallbackAlt = language === "uk"
    ? `Плейсхолдер прев’ю проєкту ${title}`
    : `Project preview placeholder for ${title}`;

  return (
    <div
      className={`project-preview preview-${variant}`}
      role={previewImage ? undefined : "img"}
      aria-label={previewImage ? undefined : fallbackAlt}
    >
      {previewImage ? (
        <Image
          className="project-preview-image"
          src={previewImage}
          alt={previewAlt?.[language] ?? title}
          fill
          priority={variant === "rivnia"}
          sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 640px"
        />
      ) : (
        <div className="preview-chrome">
          <span />
          <span />
          <span />
        </div>
      )}

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
            initial={{ opacity: 0, x: reduceMotion ? 0 : 56 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: reduceMotion ? 0 : 42 }}
            transition={{ duration: reduceMotion ? 0 : 0.46, ease: [0.16, 1, 0.3, 1] }}
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

            <motion.header
              className="case-study-header"
              initial={{ opacity: 0, x: reduceMotion ? 0 : 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : 0.08 }}
            >
              <p className="section-eyebrow">
                <span>{project.number}</span> {copy.case}
                {project.category ? ` · ${project.category[language]}` : ""}
              </p>
              <h2 id={`case-title-${project.number}`}>{project.title}</h2>
              <p>{project.description[language]}</p>
            </motion.header>

            <motion.div
              className="case-study-preview"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.46, delay: reduceMotion ? 0 : 0.13 }}
            >
              <ProjectPreview
                variant={project.variant}
                title={project.title}
                language={language}
                previewImage={project.previewImage}
                previewAlt={project.previewAlt}
              />
            </motion.div>

            <div className="case-study-details">
              {detailRows.map((row, index) => {
                const DetailIcon = row.icon;
                return (
                  <motion.section
                    className="case-study-detail"
                    key={row.label}
                    initial={{ opacity: 0, x: reduceMotion ? 0 : 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.38, delay: reduceMotion ? 0 : 0.18 + index * 0.045 }}
                  >
                    <span className="case-study-detail-icon" aria-hidden="true"><DetailIcon /></span>
                    <div>
                      <h3>{row.label}</h3>
                      <p>{row.body}</p>
                    </div>
                  </motion.section>
                );
              })}
            </div>

            <motion.dl
              className="case-study-stats"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : 0.36 }}
            >
              {project.stats.map((stat) => (
                <div key={stat.label.uk}>
                  <dt>{stat.value}</dt>
                  <dd>{stat.label[language]}</dd>
                </div>
              ))}
            </motion.dl>

            <motion.ul
              className="case-study-tags"
              aria-label={`${copy.caseStack} ${project.title}`}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.36, delay: reduceMotion ? 0 : 0.4 }}
            >
              {project.stack.map((technology) => <li key={technology}>{technology}</li>)}
            </motion.ul>

            {!project.hideActions && (
              <motion.div
                className="case-study-actions"
                initial={{ opacity: 0, y: reduceMotion ? 0 : 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.36, delay: reduceMotion ? 0 : 0.44 }}
              >
                {project.liveUrl ? (
                  <a
                    className="action-button action-button-primary"
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {copy.liveVersion} <PiArrowUpRight aria-hidden="true" />
                  </a>
                ) : (
                  <>
                    <button className="action-button action-button-primary" type="button" disabled aria-describedby="case-placeholder-note">
                      {copy.liveVersion} <PiArrowUpRight aria-hidden="true" />
                    </button>
                    <button className="action-button action-button-secondary" type="button" disabled aria-describedby="case-placeholder-note">
                      {copy.viewProject} <PiArrowUpRight aria-hidden="true" />
                    </button>
                    <small id="case-placeholder-note">{copy.placeholderNote}</small>
                  </>
                )}
              </motion.div>
            )}

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
                previewImage={project.previewImage}
                previewAlt={project.previewAlt}
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
