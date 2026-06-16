import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
} from 'framer-motion'
import { Box, LayoutGrid, Play, Sparkles } from 'lucide-react'

const navItems = [
  ['作品', 'work'],
  ['服务', 'services'],
  ['关于', 'about'],
  ['流程', 'process'],
  ['联系', 'contact'],
]

const services = [
  {
    id: '01',
    title: '电商详情页设计',
    label: 'E-COMMERCE DESIGN',
    text: '根据产品卖点规划详情页结构，强化视觉层级、卖点表达和购买转化。',
    icon: LayoutGrid,
  },
  {
    id: '02',
    title: 'AI 产品场景图',
    label: 'AIGC VISUAL',
    text: '使用 AIGC 生成高级产品场景图，提升产品主图、详情页和广告图质感。',
    icon: Sparkles,
  },
  {
    id: '03',
    title: '3D 建模与渲染',
    label: '3D RENDER',
    text: '结合 3D 建模、材质灯光和产品渲染，完成产品从建模到视觉落地。',
    icon: Box,
  },
  {
    id: '04',
    title: 'AI 视频分镜',
    label: 'AI VIDEO',
    text: '为电商短视频制作九宫格分镜、镜头脚本、Seedance 视频提示词和动态视觉方案。',
    icon: Play,
  },
]

const projects = [
  {
    id: 1,
    slug: 'lighting-details',
    title: '灯具电商详情页设计',
    category: '电商详情页',
    type: 'E-COMMERCE',
    description: '完整展示灯具产品详情页，通过场景化画面、结构拆解和卖点表达建立购买信任。',
    tools: 'Photoshop / Illustrator / AIGC',
    result: '完成 6 套灯具产品长详情页视觉。',
    cover: 'cover-home',
    layout: 'long-detail',
    images: Array.from({ length: 6 }, (_, index) => `/projects/lighting-details/${String(index + 1).padStart(2, '0')}.jpg`),
  },
  {
    id: 2,
    slug: 'aigc-visuals',
    title: 'AIGC 产品视觉海报',
    category: 'AIGC 场景图',
    type: 'AI PRODUCT PHOTO',
    description: '使用 AIGC 完成竖版产品视觉与场景海报，适配社交媒体、电商与广告投放。',
    tools: 'Midjourney / ComfyUI / Photoshop',
    result: '输出 6 张高完成度竖版 AIGC 视觉。',
    cover: 'cover-ai',
    layout: 'portrait',
    images: Array.from({ length: 6 }, (_, index) => `/projects/aigc-visuals/${String(index + 1).padStart(2, '0')}.png`),
  },
  {
    id: 3,
    slug: '3d-renders',
    title: '产品 3D 建模渲染',
    category: '3D 渲染',
    type: '3D RENDER',
    description: '完成产品建模、材质、灯光、渲染和后期视觉合成。',
    tools: 'Cinema 4D / Blender / Photoshop',
    result: '输出 9 张多角度产品渲染与白底视觉。',
    cover: 'cover-light',
    layout: 'mixed',
    images: Array.from({ length: 9 }, (_, index) => `/projects/3d-renders/${String(index + 1).padStart(2, '0')}.png`),
  },
  {
    id: 4,
    slug: 'video-storyboards',
    title: 'AI 视频分镜设计',
    category: '视频分镜',
    type: 'AI VIDEO STORYBOARD',
    description: '根据产品卖点输出九宫格分镜、镜头运动和 Seedance 视频提示词。',
    tools: 'AIGC / Premiere / Seedance',
    result: '形成 3 组完整竖版分镜与动态视觉方案。',
    cover: 'cover-video',
    layout: 'portrait',
    images: [
      '/projects/video-storyboards/01.png',
      '/projects/video-storyboards/02.jpg',
      '/projects/video-storyboards/03.jpg',
    ],
  },
  {
    id: 5,
    slug: 'glass-film-details',
    title: '玻璃贴电商详情页',
    category: 'AIGC 场景图',
    type: 'AIGC VISUAL',
    description: '围绕家居使用场景完成玻璃贴产品视觉图集与完整电商详情页。',
    tools: 'ComfyUI / Photoshop / Illustrator',
    result: '完成 2 套超长玻璃贴详情页设计。',
    cover: 'cover-glass',
    layout: 'long-detail',
    images: [
      '/projects/glass-film-details/01.png',
      '/projects/glass-film-details/02.png',
    ],
  },
  {
    id: 6,
    slug: 'brand-posters',
    title: '品牌视觉合成海报',
    category: '电商详情页',
    type: 'VISUAL DESIGN',
    description: '结合 Photoshop 合成、AI 出图和高级光影完成电商海报设计。',
    tools: 'Photoshop / AIGC / After Effects',
    result: '输出 5 张横版品牌营销视觉。',
    cover: 'cover-brand',
    layout: 'landscape',
    images: Array.from({ length: 5 }, (_, index) => `/projects/brand-posters/${String(index + 1).padStart(2, '0')}.png`),
  },
]

const filters = ['全部', '电商详情页', 'AIGC 场景图', '3D 渲染', '视频分镜']

const processSteps = [
  ['01', '需求分析', '理解产品、用户与转化目标'],
  ['02', '视觉方向', '建立风格、构图与内容策略'],
  ['03', 'AI 生成', '快速探索场景与创意可能'],
  ['04', '精修与渲染', '统一材质、光影与画面细节'],
  ['05', '最终交付', '输出适配各渠道的视觉资产'],
]

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

function Arrow({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 19 19 5M8 5h11v11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function Reveal({ children, className = '', delay = 0, whileHover }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      whileHover={whileHover}
      viewport={{ once: true, amount: 0.18 }}
      variants={{
        hidden: { opacity: 0, y: 22 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  return (
    <Reveal className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <p className="section-label">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </Reveal>
  )
}

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65 }}
      className={`fixed left-1/2 top-5 z-50 flex w-[calc(100%-32px)] max-w-[1480px] -translate-x-1/2 items-center justify-between rounded-full border px-5 py-3 transition-colors duration-300 md:px-7 ${
        scrolled
          ? 'border-cyber-400/35 bg-black/90 shadow-neon'
          : 'border-white/10 bg-black/75'
      }`}
    >
      <button onClick={() => goTo('top')} className="flex items-center gap-3 text-left">
        <span className="grid h-9 w-9 place-items-center rounded-full border border-cyber-400/40 bg-cyber-400/10 text-xs font-semibold text-cyber-300">
          ZH
        </span>
        <span>
          <strong className="block text-sm font-semibold tracking-tight text-white">ZH Design Studio</strong>
          <small className="hidden text-[9px] tracking-[0.18em] text-white/35 sm:block">VISUAL · AIGC · 3D</small>
        </span>
      </button>

      <nav className="hidden items-center gap-7 lg:flex">
        {navItems.map(([label, id]) => (
          <button key={id} onClick={() => goTo(id)} className="nav-link">
            {label}
          </button>
        ))}
      </nav>

      <button
        onClick={() => setOpen((value) => !value)}
        className="rounded-full border border-white/15 bg-white/[0.04] px-5 py-2 text-xs text-white transition hover:border-cyber-400/50 hover:text-cyber-300"
      >
        菜单
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="absolute right-0 top-[calc(100%+10px)] w-56 rounded-3xl border border-cyber-400/20 bg-[#05080e]/98 p-3 shadow-neon"
          >
            {navItems.map(([label, id]) => (
              <button
                key={id}
                onClick={() => goTo(id)}
                className="block w-full rounded-2xl px-4 py-3 text-left text-sm text-white/70 transition hover:bg-cyber-400/10 hover:text-cyber-300"
              >
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

function StatCard({ value, label, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 26 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.48, delay }}
      whileHover={{ y: -4 }}
      className="glass-card group p-5"
    >
      <motion.strong className="block text-3xl font-medium text-white transition group-hover:scale-105 group-hover:text-cyber-300">
        {value}
      </motion.strong>
      <span className="mt-2 block text-sm text-white/48">{label}</span>
    </motion.div>
  )
}

function Hero() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden px-5 pb-16 pt-28 md:px-10"
    >
      <motion.img
        src="/images/hero-liquid-metal-hands-optimized.jpg"
        alt=""
        aria-hidden="true"
        initial={{ opacity: 0, scale: 1.045 }}
        animate={{ opacity: 0.9, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute -inset-5 h-[calc(100%+40px)] w-[calc(100%+40px)] object-cover object-center will-change-transform"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.12 }}
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(1,7,15,.96)_0%,rgba(1,7,15,.78)_31%,rgba(1,7,15,.18)_58%,rgba(1,7,15,.72)_100%)]"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.18 }}
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(1,7,15,.32)_0%,transparent_45%,rgba(1,7,15,.74)_100%)]"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 0.45, delay: 0.35 }}
        className="cyber-grid absolute inset-0"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_56%_45%,rgba(28,151,255,.14),transparent_30%)]" />

      <div className="relative z-10 mx-auto grid w-full max-w-[1700px] items-center gap-10 xl:grid-cols-[1fr_.34fr]">
        <div className="max-w-[850px]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyber-400/25 bg-cyber-400/[0.06] px-4 py-2 text-[10px] tracking-[0.16em] text-cyber-300"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyber-300 shadow-[0_0_10px_#36b7ff]" />
            AIGC VISUAL DESIGNER
          </motion.div>

          <h1 className="max-w-[860px] text-[clamp(2.7rem,6vw,8.5rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-white">
            {['AI视觉设计', '电商创意作品集'].map((line, index) => (
              <motion.span
                key={line}
                initial={{ opacity: 0, y: 55 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.56, delay: 0.08 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={
                  index === 2
                    ? 'block text-gradient-blue'
                    : index === 1
                      ? 'block whitespace-nowrap'
                      : 'block'
                }
              >
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.58 }}
            className="mt-8 max-w-2xl text-sm leading-7 text-white/48 md:text-base"
          >
            专注电商详情页设计、AI 产品场景图、3D 建模渲染、AI 视频分镜与高效视觉工作流，
            为产品打造更高级、更有转化力的视觉表达。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.72 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <button onClick={() => scrollTo('work')} className="button-primary">
              查看作品 <Arrow className="h-4 w-4" />
            </button>
            <button onClick={() => scrollTo('services')} className="button-secondary">
              了解服务
            </button>
          </motion.div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-1">
          <StatCard value="95%" label="设计效率提升" delay={0.56} />
          <StatCard value="100+" label="视觉项目经验" delay={0.62} />
          <StatCard value="250+" label="AI 图片生成案例" delay={0.74} />
          <StatCard value="3年+" label="3D 建模渲染基础" delay={0.86} />
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="about-editorial relative overflow-hidden">
      <div className="about-editorial-glow pointer-events-none absolute inset-0" />
      <div className="relative mx-auto w-full max-w-[1700px] px-5 py-24 md:px-10 md:py-32">
        <div className="flex items-start justify-between">
          <Reveal className="relative top-[18px]">
            <p className="about-editorial-label"><span /> 为什么选择我</p>
            <h2 className="about-editorial-title">
              认识作品背后的
              <br />
              设计思考
            </h2>
          </Reveal>

          <Reveal className="hidden items-center gap-5 pt-3 md:flex">
            <a href="#work" className="about-social-link">X</a>
            <a href="#contact" className="about-social-link about-social-link-active">◎</a>
            <a href="#contact" className="about-social-link">in</a>
          </Reveal>
        </div>

        <div className="about-editorial-grid">
          <Reveal className="about-portrait-wrap">
            <motion.img
              src="/images/about-designer-blue.png"
              alt="张恒，视觉设计师"
              whileHover={{ scale: 1.035 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="about-portrait"
            />
          </Reveal>

          <div className="about-editorial-content">
            <Reveal>
              <p className="about-editorial-copy">
                我是一名电商视觉设计师，擅长将 AIGC、3D 建模与电商设计结合，
                为产品打造更具记忆点的视觉场景、详情页画面和短视频内容。
              </p>
            </Reveal>

            <Reveal className="about-editorial-meta" delay={0.08}>
              <div className="about-world-mark">◎</div>
              <p>
                <strong>跨媒介视觉能力</strong>
                <span>电商 · AIGC · 3D · 动态视觉</span>
              </p>
              <div className="about-avatar-stack">
                {['ZH', 'AI', '3D'].map((item) => <span key={item}>{item}</span>)}
                <b>12+</b>
              </div>
            </Reveal>

            <div className="about-editorial-cards">
              <Reveal
                className="about-fact-card about-fact-card-dark"
                delay={0.14}
                whileHover={{ y: -7 }}
              >
                <span className="about-fact-number">100+</span>
                <p>视觉项目经验</p>
                <div className="about-fact-lines">
                  <span>视觉策略</span><span>场景生成</span><span>产品渲染</span>
                </div>
                <a href="#contact">联系合作</a>
              </Reveal>

              <Reveal
                className="about-fact-card about-fact-card-blue"
                delay={0.2}
                whileHover={{ y: -7 }}
              >
                <span className="about-fact-index">ZH / 02</span>
                <strong>250+</strong>
                <p>AI 产品视觉案例</p>
                <small>建立高效率、可复用的视觉生产工作流</small>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section id="services" className="section-shell">
      <SectionHeading
        eyebrow="SERVICES / 02"
        title="服务能力"
        description="从产品视觉到 AI 视频，我为电商品牌提供完整视觉解决方案。"
      />
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        className="mt-14 grid gap-4 md:grid-cols-2"
      >
        {services.map((item) => {
          const ServiceIcon = item.icon
          return (
          <motion.article key={item.id} variants={fadeUp} whileHover={{ y: -4 }} className="service-card group">
            <span className="service-card-flow" aria-hidden="true">
              <i className="service-card-wave service-card-wave-back" />
              <i className="service-card-wave service-card-wave-front" />
            </span>
            <div className="flex items-start justify-between">
              <span className="text-xs text-white/28">{item.id}</span>
              <span className="service-card-icon">
                <ServiceIcon size={20} strokeWidth={1.6} aria-hidden="true" />
              </span>
            </div>
            <div className="mt-20">
              <span className="text-[9px] tracking-[0.18em] text-cyber-300/70">{item.label}</span>
              <h3 className="mt-3 text-2xl font-medium tracking-tight text-white">{item.title}</h3>
              <p className="mt-4 max-w-lg text-sm leading-7 text-white/42">{item.text}</p>
            </div>
          </motion.article>
          )
        })}
      </motion.div>
    </section>
  )
}

function ProjectCard({ project }) {
  return (
    <motion.a
      href={`/projects/${project.slug}`}
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.32, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      className="project-card group block cursor-pointer"
    >
      <div className={`project-cover ${project.cover}`}>
        <div className="project-grid" />
        <span className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/75 px-3 py-1 text-[9px] tracking-[0.15em] text-white/65">
          {project.type}
        </span>
        <div className="absolute inset-x-5 bottom-5 translate-y-5 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="inline-flex items-center gap-2 rounded-full bg-cyber-400 px-4 py-2 text-xs font-medium text-[#03101c] shadow-neon">
            查看案例 <Arrow className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
      <div className="p-5">
        <p className="text-[9px] tracking-[0.15em] text-cyber-300/70">{project.category}</p>
        <h3 className="mt-2 text-xl font-medium text-white">{project.title}</h3>
        <p className="mt-3 text-sm leading-6 text-white/40">{project.description}</p>
      </div>
    </motion.a>
  )
}

function Work() {
  const [filter, setFilter] = useState('全部')
  const filtered = useMemo(
    () => (filter === '全部' ? projects : projects.filter((project) => project.category === filter)),
    [filter],
  )

  return (
    <section id="work" className="section-shell">
      <SectionHeading
        eyebrow="SELECTED WORK / 03"
        title="作品展示"
        description="精选电商视觉、AIGC 场景图、3D 渲染与视频分镜项目。"
      />
      <Reveal className="mt-10 flex flex-wrap gap-2">
        {filters.map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`filter-chip ${filter === item ? 'filter-chip-active' : ''}`}
          >
            {item}
          </button>
        ))}
      </Reveal>
      <motion.div layout className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}

function Process() {
  return (
    <section id="process" className="section-shell">
      <SectionHeading
        eyebrow="PROCESS / 04"
        title="工作流程"
        description="从需求分析到最终交付，建立清晰高效的视觉生产流程。"
        align="center"
      />
      <div className="relative mt-20 grid gap-4 lg:grid-cols-5">
        {processSteps.map(([number, title, text], index) => (
          <Reveal key={number} delay={index * 0.1}>
            <motion.div whileHover={{ y: -3 }} className="process-card group">
              <span className="relative z-10 grid h-16 w-16 place-items-center rounded-full border border-cyber-400/25 bg-[#07101c] text-sm text-white transition group-hover:border-cyber-300 group-hover:text-cyber-300 group-hover:shadow-neon">
                {number}
              </span>
              <h3 className="mt-8 text-lg font-medium text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/38">{text}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="section-shell relative mb-6 overflow-hidden py-28 text-center md:py-40">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(26,142,235,.13),transparent_45%)]" />
      <Reveal className="relative z-10 mx-auto max-w-5xl">
        <p className="section-label">CONTACT / 05</p>
        <h2 className="mt-5 w-full text-center text-[clamp(3rem,7vw,8rem)] font-semibold leading-[1.16] tracking-[-0.035em] text-white">
          <span className="block w-full text-center">一起打造你的</span>
          <span className="block w-full text-center text-gradient-blue">高转化视觉项目</span>
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-sm leading-7 text-white/45 md:text-base">
          可合作方向包括电商详情页、AI 视觉工作流、产品渲染、短视频分镜与品牌视觉创意。
        </p>
        <a href="/contact" className="button-primary mt-10 inline-flex">
          联系我 <Arrow className="h-4 w-4" />
        </a>
      </Reveal>
      <div className="relative z-10 mx-auto mt-28 flex max-w-5xl flex-wrap justify-center gap-x-8 gap-y-3 border-t border-white/10 pt-7 text-[10px] tracking-[0.14em] text-white/30">
        <a href="mailto:hello@example.com">EMAIL</a>
        <a href="#work">BEHANCE</a>
        <a href="#top">PORTFOLIO</a>
        <a href="#contact">SOCIAL LINKS</a>
      </div>
    </section>
  )
}

function ProjectModal({ project, onClose }) {
  if (!project) return null
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] grid place-items-center bg-black/90 p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 12 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        onClick={(event) => event.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-4xl overflow-auto rounded-[30px] border border-cyber-400/25 bg-[#060b13] p-5 shadow-neon md:p-8"
      >
        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-black/45 text-white/60 transition hover:border-cyber-300/50 hover:text-white"
        >
          ×
        </button>
        <div className={`project-cover h-[280px] md:h-[400px] ${project.cover}`}>
          <div className="project-grid" />
        </div>
        <div className="grid gap-8 px-2 pb-4 pt-8 md:grid-cols-[1.3fr_.7fr]">
          <div>
            <p className="section-label">{project.type}</p>
            <h3 className="mt-3 text-3xl font-medium tracking-tight text-white md:text-5xl">{project.title}</h3>
            <p className="mt-6 leading-8 text-white/48">{project.description}</p>
          </div>
          <dl className="space-y-5 border-l border-white/10 pl-6 text-sm">
            <div><dt className="text-white/30">项目类型</dt><dd className="mt-1 text-white/70">{project.category}</dd></div>
            <div><dt className="text-white/30">使用工具</dt><dd className="mt-1 text-white/70">{project.tools}</dd></div>
            <div><dt className="text-white/30">项目成果</dt><dd className="mt-1 leading-6 text-white/70">{project.result}</dd></div>
          </dl>
        </div>
      </motion.div>
    </motion.div>
  )
}

function ProjectDetailPage({ project }) {
  const projectIndex = projects.findIndex((item) => item.slug === project.slug)
  const previousProject = projects[(projectIndex - 1 + projects.length) % projects.length]
  const nextProject = projects[(projectIndex + 1) % projects.length]

  return (
    <div className={`project-detail-page project-detail-${project.layout}`}>
      <header className="project-detail-header">
        <a href="/" className="project-detail-brand">
          <span>ZH</span>
          <b>ZH Design Studio</b>
        </a>
        <a href="/#work" className="project-detail-back">返回作品列表</a>
      </header>

      <main>
        <section className="project-detail-intro">
          <p>{project.type} / {String(project.id).padStart(2, '0')}</p>
          <h1>{project.title}</h1>
          <div className="project-detail-summary">
            <p>{project.description}</p>
            <dl>
              <div><dt>项目类型</dt><dd>{project.category}</dd></div>
              <div><dt>使用工具</dt><dd>{project.tools}</dd></div>
              <div><dt>项目成果</dt><dd>{project.result}</dd></div>
            </dl>
          </div>
        </section>

        {project.layout === 'long-detail' ? (
          <section className="project-long-stage" aria-label={`${project.title}完整页面展示`}>
            <div className="project-display-mark">
              <span>0{project.id}</span>
              <b>页面展示</b>
            </div>
            <div className={`project-long-columns project-long-columns-${Math.min(project.images.length, 3)}`}>
              {Array.from({ length: Math.min(project.images.length, 3) }, (_, columnIndex) => (
                <div key={columnIndex} className={`project-long-column project-long-column-${columnIndex + 1}`}>
                  {project.images
                    .filter((_, imageIndex) => imageIndex % Math.min(project.images.length, 3) === columnIndex)
                    .map((image, imageIndex) => (
                      <figure key={image} className="project-long-frame">
                        <img
                          src={image}
                          alt={`${project.title}完整详情页 ${columnIndex + imageIndex + 1}`}
                          loading={columnIndex === 1 && imageIndex === 0 ? 'eager' : 'lazy'}
                        />
                      </figure>
                    ))}
                </div>
              ))}
            </div>
          </section>
        ) : (
          <section className={`project-gallery project-gallery-${project.layout}`}>
            {project.images.map((image, index) => (
              <motion.figure
                key={image}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.08 }}
                transition={{ duration: 0.55, delay: Math.min(index * 0.04, 0.2) }}
              >
                <img
                  src={image}
                  alt={`${project.title}作品 ${index + 1}`}
                  loading={index < 2 ? 'eager' : 'lazy'}
                />
                <figcaption>{String(index + 1).padStart(2, '0')} / {project.images.length}</figcaption>
              </motion.figure>
            ))}
          </section>
        )}

        <nav className="project-detail-pagination" aria-label="项目切换">
          <a href={`/projects/${previousProject.slug}`}>
            <small>上一个项目</small>
            <span>{previousProject.title}</span>
          </a>
          <a href={`/projects/${nextProject.slug}`}>
            <small>下一个项目</small>
            <span>{nextProject.title}</span>
          </a>
        </nav>
      </main>
      <BackToTop />
    </div>
  )
}

function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 500)
    updateVisibility()
    window.addEventListener('scroll', updateVisibility, { passive: true })
    return () => window.removeEventListener('scroll', updateVisibility)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="返回顶部"
          title="返回顶部"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.92 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          whileHover={{ y: -4, scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-[80] grid h-14 w-14 place-items-center rounded-full border border-cyber-300/35 bg-[#07111e]/95 text-cyber-200 shadow-[0_0_28px_rgba(37,166,255,.18)] transition-colors hover:border-cyber-200/70 hover:bg-[#0a1b2b] md:bottom-8 md:right-8"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 14 6-6 6 6" />
            <path d="M12 8v10" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

const heroTabs = [
  ['视觉项目经验', '100+', '精选商业与练习项目', 'PROJECTS'],
  ['AI 图片案例', '250+', '产品场景与视觉生成', 'AIGC'],
  ['电商视觉设计', '95%', '视觉策略与转化表达', 'DESIGN'],
  ['3D 建模渲染', '3年+', '产品建模、材质与灯光', '3D RENDER'],
  ['高效工作流', '4X', 'AI 驱动的视觉生产效率', 'WORKFLOW'],
]

function HeroTabCarousel() {
  const trackRef = useRef(null)
  const dragState = useRef({ active: false, x: 0, scrollLeft: 0 })
  const loopWidthRef = useRef(0)
  const targetScrollRef = useRef(null)
  const resumeAtRef = useRef(0)
  const resumeTimerRef = useRef(null)
  const hoverTimerRef = useRef(null)
  const hoverLockUntilRef = useRef(0)
  const loopTabs = [...heroTabs, ...heroTabs, ...heroTabs]

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const cards = track.querySelectorAll('[data-tab-card]')
    const firstCard = cards[0]
    const secondSetFirstCard = cards[heroTabs.length]
    const middleActiveCard = cards[heroTabs.length + 2]

    if (firstCard && secondSetFirstCard) {
      loopWidthRef.current = secondSetFirstCard.offsetLeft - firstCard.offsetLeft
    }

    if (middleActiveCard) {
      track.scrollLeft = middleActiveCard.offsetLeft - (track.clientWidth - middleActiveCard.clientWidth) / 2
    }

    let frameId
    let previousTime = performance.now()
    const autoScroll = (time) => {
      const delta = Math.min(time - previousTime, 32)
      previousTime = time

      if (!dragState.current.active) {
        if (targetScrollRef.current !== null) {
          const distance = targetScrollRef.current - track.scrollLeft
          if (Math.abs(distance) < 0.5) {
            track.scrollLeft = targetScrollRef.current
          } else {
            track.scrollLeft += distance * Math.min(1, delta * 0.012)
          }
        } else if (time >= resumeAtRef.current) {
          track.scrollLeft += delta * 0.055
        }
      }

      const loopWidth = loopWidthRef.current
      if (loopWidth) {
        if (track.scrollLeft < loopWidth * 0.45) {
          track.scrollLeft += loopWidth
          if (targetScrollRef.current !== null) targetScrollRef.current += loopWidth
        } else if (track.scrollLeft > loopWidth * 1.55) {
          track.scrollLeft -= loopWidth
          if (targetScrollRef.current !== null) targetScrollRef.current -= loopWidth
        }
      }

      frameId = requestAnimationFrame(autoScroll)
    }
    frameId = requestAnimationFrame(autoScroll)

    return () => {
      cancelAnimationFrame(frameId)
      window.clearTimeout(resumeTimerRef.current)
      window.clearTimeout(hoverTimerRef.current)
    }
  }, [])

  const onWheel = (event) => {
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return
    event.preventDefault()
    targetScrollRef.current = null
    resumeAtRef.current = performance.now() + 900
    event.currentTarget.scrollLeft += event.deltaY * 1.15
  }

  const onPointerDown = (event) => {
    const track = trackRef.current
    if (!track) return
    targetScrollRef.current = null
    resumeAtRef.current = Number.POSITIVE_INFINITY
    window.clearTimeout(resumeTimerRef.current)
    dragState.current = { active: true, x: event.clientX, scrollLeft: track.scrollLeft }
    track.setPointerCapture(event.pointerId)
    track.classList.add('is-dragging')
  }

  const onPointerMove = (event) => {
    const track = trackRef.current
    if (!track || !dragState.current.active) return
    track.scrollLeft = dragState.current.scrollLeft - (event.clientX - dragState.current.x)
  }

  const stopDragging = (event) => {
    const track = trackRef.current
    dragState.current.active = false
    track?.classList.remove('is-dragging')
    if (track?.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId)
    resumeAtRef.current = performance.now() + 700
  }

  const centerCard = (event) => {
    const track = trackRef.current
    const card = event.currentTarget
    if (!track) return
    window.clearTimeout(resumeTimerRef.current)
    window.clearTimeout(hoverTimerRef.current)
    hoverTimerRef.current = window.setTimeout(() => {
      const now = performance.now()
      if (now < hoverLockUntilRef.current) return
      targetScrollRef.current = card.offsetLeft - (track.clientWidth - card.clientWidth) / 2
      resumeAtRef.current = Number.POSITIVE_INFINITY
      hoverLockUntilRef.current = now + 520
    }, 110)
  }

  const resumeAutoScroll = () => {
    window.clearTimeout(hoverTimerRef.current)
    window.clearTimeout(resumeTimerRef.current)
    resumeTimerRef.current = window.setTimeout(() => {
      targetScrollRef.current = null
      hoverLockUntilRef.current = 0
      resumeAtRef.current = performance.now() + 250
    }, 120)
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.72 }}
      className="hero-tab-shell"
    >
      <div
        ref={trackRef}
        className="hero-tab-track"
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        onMouseLeave={resumeAutoScroll}
      >
        {loopTabs.map(([label, value, note, type], index) => {
          const visualIndex = index % heroTabs.length
          return (
          <motion.article
            key={`${label}-${index}`}
            data-tab-card
            data-active={index === heroTabs.length + 2}
            onMouseEnter={centerCard}
            className={`hero-tab-card hero-tab-card-${visualIndex + 1}`}
          >
            <div className="hero-tab-card-head">
              <span>{type}</span>
              <b>↗</b>
            </div>
            <div className="hero-tab-card-body">
              <small>{label}</small>
              <strong>{value}</strong>
              <p>{note}</p>
            </div>
            <div className="hero-tab-card-line"><i /></div>
          </motion.article>
          )
        })}
      </div>
      <p className="hero-tab-hint">横向滚动 · 拖动浏览</p>
    </motion.section>
  )
}

function LuxuryConceptPage() {
  const scrollToSection = (id) => {
    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }
    window.location.href = `/#${id}`
  }

  return (
    <div id="top" className="hero-cosmic-page relative min-h-[100svh] bg-[#01040a] text-white">
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute inset-0 will-change-transform"
      >
        <motion.img
          src="/images/hero-cosmic-horizon.png"
          alt=""
          aria-hidden="true"
          animate={{
            scale: [1.02, 1.045, 1.02],
            opacity: [0.84, 0.98, 0.84],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="h-full w-full object-cover object-center will-change-transform"
        />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,2,7,.82)_0%,rgba(0,2,7,.18)_30%,rgba(0,2,7,.06)_50%,rgba(0,2,7,.2)_70%,rgba(0,2,7,.84)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,2,7,.5)_0%,transparent_35%,rgba(0,2,7,.12)_62%,rgba(0,2,7,.9)_100%)]" />
      <div className="hero-particle-field hero-particle-field-far pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="hero-particle-field hero-particle-field-near pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="hero-cosmic-beam pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2" />
      <div className="hero-side-metrics pointer-events-none absolute inset-0 z-10 hidden xl:block" aria-hidden="true">
        {[
          { side: 'left', className: 'top-[27%] left-[3.2%]', label: '视觉项目', value: '100+', path: 'M2 25 C15 18, 22 29, 34 17 S52 8, 64 17 S82 24, 98 7' },
          { side: 'left', className: 'top-[49%] left-[6.5%]', label: '设计效率', value: '95%', path: 'M2 23 C14 25, 18 11, 31 15 S46 27, 58 13 S75 9, 98 17' },
          { side: 'right', className: 'top-[31%] right-[4.2%]', label: 'AI 视觉案例', value: '250+', path: 'M2 19 C12 9, 22 25, 35 14 S53 21, 66 9 S84 16, 98 6' },
          { side: 'right', className: 'top-[52%] right-[2.4%]', label: '建模与渲染', value: '3年+', path: 'M2 25 C13 23, 19 8, 31 17 S47 26, 61 12 S79 18, 98 8' },
        ].map((metric, index) => (
          <div
            key={metric.label}
            className={`hero-side-metric hero-side-metric-${metric.side} ${metric.className}`}
            style={{ animationDelay: `${index * -1.15}s` }}
          >
            <div>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
            <svg viewBox="0 0 100 32" fill="none">
              <path d={metric.path} pathLength="1" />
              <circle cx={index % 2 ? 58 : 66} cy={index % 2 ? 13 : 9} r="1.8" />
            </svg>
          </div>
        ))}
      </div>

      <header className="relative z-30 mx-auto flex w-full max-w-[1700px] items-center justify-between px-5 py-5 md:px-9">
        <a href="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-[11px] font-bold text-black">ZH</span>
          <span className="text-lg font-medium tracking-[-0.03em]">ZH Design Studio</span>
        </a>

        <div className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-cyan-200/25 bg-black/35 px-5 py-2.5 text-[11px] tracking-[0.08em] text-cyan-50/80 backdrop-blur-md"
          >
            <span className="text-cyan-200">✦</span>
            AIGC Visual Designer · 电商视觉设计师
          </motion.div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden text-[10px] tracking-[0.16em] text-white/35 md:block">ZHANG HENG · 2026</span>
          <a href="/contact" className="rounded-full border border-cyan-200/25 bg-black/45 px-5 py-3 text-[11px] text-white/75 transition hover:border-cyan-200/50 hover:text-white">
            联系合作
          </a>
        </div>
      </header>

      <main className="relative z-20 mx-auto flex h-[calc(100svh-80px)] min-h-[640px] w-full max-w-[1700px] flex-col justify-between px-5 pb-3 md:px-9">
        <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center pb-12 pt-10 text-center md:pb-20">
          <h1 className="hero-main-title text-[clamp(3.3rem,6.8vw,7.7rem)] font-semibold leading-[1.08] tracking-[-0.045em]">
            {['电商创意作品集', '让产品更高级'].map((line, index) => (
              <motion.span
                key={line}
                initial={{ opacity: 0, y: 34 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.62, delay: 0.22 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={index === 1 ? 'hero-main-title-accent block' : 'block'}
              >
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.52 }}
            className="mt-7 max-w-3xl text-sm leading-7 text-white/55 md:text-lg"
          >
            专注电商详情页设计、AI 产品场景图、3D 建模渲染与 AI 视频分镜，
            <span className="hidden md:inline"><br /></span>
            为产品打造更高级、更有转化力的视觉表达。
          </motion.p>

          <div className="relative top-4 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.66 }}
              className="mt-8 flex flex-wrap justify-center gap-3"
            >
              <a href="#work" onClick={(event) => { event.preventDefault(); scrollToSection('work') }} className="hero-glass-button hero-glass-button-primary group">
                <span>查看作品</span>
                <span className="hero-glass-button-arrow">→</span>
              </a>
              <a href="#services" onClick={(event) => { event.preventDefault(); scrollToSection('services') }} className="hero-glass-button hero-glass-button-secondary group">
                <span>了解服务</span>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.55, delay: 0.82 }}
              className="mt-9 flex items-center gap-4"
            >
              <div className="flex -space-x-2">
                {['ZH', 'AI', '3D', 'VI'].map((item) => (
                  <span key={item} className="grid h-9 w-9 place-items-center rounded-full border-2 border-[#07101b] bg-gradient-to-br from-cyan-100 to-blue-500 text-[9px] font-bold text-[#02101b]">
                    {item}
                  </span>
                ))}
              </div>
              <div className="h-9 w-px bg-white/16" />
              <p className="text-left text-[10px] leading-4 text-white/40">
                电商视觉 · AIGC · 3D
                <br />
                多维创意能力
              </p>
            </motion.div>
          </div>
        </section>

        <HeroTabCarousel />
      </main>
    </div>
  )
}

function ContactPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#02050a] px-5 py-6 text-white md:px-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(34,154,240,.1),transparent_38%)]" />
      <div className="cyber-grid pointer-events-none absolute inset-0 opacity-20" />

      <header className="relative z-10 mx-auto flex max-w-[1600px] items-center justify-between rounded-full border border-cyber-400/20 bg-black/90 px-5 py-3 md:px-7">
        <a href="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full border border-cyber-400/35 bg-cyber-400/10 text-xs font-semibold text-cyber-300">ZH</span>
          <span>
            <strong className="block text-sm">ZH Design Studio</strong>
            <small className="block text-[9px] tracking-[0.18em] text-white/35">CONTACT PAGE</small>
          </span>
        </a>
        <a href="/" className="button-secondary !px-5 !py-3">
          返回首页
        </a>
      </header>

      <main className="relative z-10 mx-auto grid min-h-[calc(100vh-110px)] max-w-[1500px] items-center gap-14 py-20 lg:grid-cols-[1.05fr_.95fr]">
        <motion.section
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <p className="section-label">CONTACT / COOPERATION</p>
          <h1 className="mt-6 max-w-4xl text-[clamp(3.5rem,7vw,8rem)] font-semibold leading-[1.02] tracking-[-0.045em]">
            让好创意
            <span className="block text-gradient-blue">真正落地</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-8 text-white/50 md:text-lg">
            欢迎交流电商详情页、AIGC 产品场景、3D 产品渲染、短视频分镜与品牌视觉合作。
            请通过微信或电话联系，并简单说明项目类型、交付时间与预算范围。
          </p>

          <div className="mt-12 grid max-w-2xl gap-4 sm:grid-cols-2">
            <a href="tel:13815050638" className="glass-card group p-6 transition hover:border-cyber-300/55">
              <span className="text-[10px] tracking-[0.18em] text-cyber-300">PHONE</span>
              <strong className="mt-4 block text-2xl font-medium">138 1505 0638</strong>
              <span className="mt-2 block text-sm text-white/35">电话沟通 / 项目咨询</span>
            </a>
            <div className="glass-card p-6">
              <span className="text-[10px] tracking-[0.18em] text-cyber-300">WECHAT</span>
              <strong className="mt-4 block text-2xl font-medium">扫码添加微信</strong>
              <span className="mt-2 block text-sm text-white/35">添加时请备注合作方向</span>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3 text-xs text-white/40">
            {['电商视觉', 'AIGC 场景', '3D 渲染', '视频分镜', '品牌设计'].map((item) => (
              <span key={item} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2">
                {item}
              </span>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: 'easeOut' }}
          className="mx-auto w-full max-w-[560px]"
        >
          <div className="relative overflow-hidden rounded-[36px] border border-cyber-300/25 bg-[#07101b]/95 p-5 shadow-[0_0_60px_rgba(30,164,255,.1)] md:p-8">
            <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 bg-[radial-gradient(circle_at_top_right,rgba(44,167,255,.15),transparent_62%)]" />
            <div className="relative flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <span className="text-[10px] tracking-[0.2em] text-cyber-300">WECHAT QR CODE</span>
                <h2 className="mt-2 text-2xl font-medium">微信联系</h2>
              </div>
              <span className="h-2.5 w-2.5 rounded-full bg-cyber-300 shadow-[0_0_14px_#36b7ff]" />
            </div>
            <div className="relative mx-auto mt-8 aspect-square max-w-[410px] rounded-[28px] bg-white p-3">
              <img
                src="/images/wechat-qr-placeholder.svg"
                alt="微信二维码替换位"
                className="h-full w-full rounded-[20px] object-cover"
              />
            </div>
            <p className="relative mt-6 text-center text-sm leading-6 text-white/40">
              打开微信扫一扫，添加后请备注“作品集合作”
            </p>
          </div>
        </motion.section>
      </main>
    </div>
  )
}

function App() {
  const currentPath = window.location.pathname.replace(/\/+$/, '') || '/'
  const isContactPage = currentPath === '/contact'
  const isLuxuryConceptPage = currentPath === '/concept-luxury'
  const isOriginalHeroPage = currentPath === '/original-hero'
  const projectSlug = currentPath.startsWith('/projects/') ? currentPath.split('/')[2] : null
  const detailProject = projectSlug ? projects.find((project) => project.slug === projectSlug) : null

  if (detailProject) return <ProjectDetailPage project={detailProject} />
  if (isContactPage) return <ContactPage />
  if (isLuxuryConceptPage) return <LuxuryConceptPage />
  if (isOriginalHeroPage) {
    return (
      <div className="min-h-screen overflow-hidden bg-[#02050a] text-white">
        <Hero />
      </div>
    )
  }

  return (
    <div className="min-h-screen overflow-hidden bg-[#02050a] text-white">
      <main>
        <LuxuryConceptPage />
        <About />
        <Services />
        <Work />
        <Process />
        <Contact />
      </main>
      <BackToTop />
    </div>
  )
}

export default App
